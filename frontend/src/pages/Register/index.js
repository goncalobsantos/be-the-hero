import React, { useState } from 'react'

import './styles.css'
import api from '../../services/api'

import logoImg from '../../assets/logo.svg'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');

    const history = useHistory();

    const handleRegister = async (event) => {
        event.preventDefault();
        const data = { name, email, whatsapp, city, district };
        try {
            const response = await api.post('ongs', data);
            alert(`Seu ID: ${response.data.id}`);
            history.push('/')
        } catch (error) {
            alert(`Erro a registar tente novamente`);
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Logo Be The Hero" />
                    <h1>Registar</h1>
                    <p>Faz o teu registo, entra na plataforma e ajuda pessoas a encontrarem os casos da tua organização.</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#e02041" />
                        Já tenho conta
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input
                        placeholder="Nome da organização"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input
                        placeholder="WhatsApp"
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}
                    />
                    <div className="input-group">
                        <input
                            placeholder="Cidade"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                        />
                        <input
                            placeholder="Distrito"
                            value={district}
                            onChange={e => setDistrict(e.target.value)}
                        />
                    </div>
                    <button className="button" type="Submit">Registar</button>
                </form>
            </div>
        </div>
    )
}

export default Register;