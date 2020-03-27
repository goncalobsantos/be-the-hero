const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        console.log('> Get all incidents received');
        const { page = 1 } = request.query;
        const [count] = await connection('incidents').count()
        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select(['incidents.*', 'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.district']);

        response.header('X-Total-Count', count['count(*)']);
        return response.json(incidents);
    },
    async create(request, response) {
        console.log('> Create incident received');
        console.log('> ' + request.body);
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title, description, value, ong_id
        });

        return response.json({ id });
    },
    async delete(request, response) {
        console.log(`> Delete incident ${request.params.id} received`);
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incident_to_delete = await connection('incidents').where('id', id).select('ong_id').first();

        if (incident_to_delete.ong_id !== ong_id) {
            return response.status(401).json({ error: 'Unauthorized operation' });
        }

        await connection('incidents').where('id', id).delete();
        return response.status(204).send();
    }
}