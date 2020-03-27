const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async create(request, response) {
        console.log('> Create ONG received');
        const { name, email, whatsapp, city, district } = request.body;
        const id = crypto.randomBytes(4).toString('HEX');

        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            district
        })

        return response.json({ id });
    },

    async index(request, response) {
        console.log('> Get all ongs received');
        const ongs = await connection('ongs').select('*');
        return response.json(ongs)
    }
}