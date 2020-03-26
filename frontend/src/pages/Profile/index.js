import React, { useEffect, useState } from 'react'

import logoImg from '../../assets/logo.svg'
import { Link, useHistory } from 'react-router-dom'
import { FiPower, FiTrash2 } from 'react-icons/fi'

import './styles.css'
import api from '../../services/api'

const Profile = () => {
	const [incidents, setIncidents] = useState([])
	const ongName = localStorage.getItem('ongName');
	const ongId = localStorage.getItem('ongId');
	const history = useHistory();

	useEffect(() => {
		api.get('profile', {
			headers: {
				Authorization: ongId,
			}
		}).then(response => {
			setIncidents(response.data);
		})
	}, [ongId]);

	const handleDeleteIncident = async (id) => {
		try {
			await api.delete(`incidents/${id}`, {
				headers: {
					Authorization: ongId,
				}
			})

			setIncidents(incidents.filter(incident => incident.id !== id))
		} catch (error) {
			alert('Erro a apagar o caso, tente de novo')
		}
	}

	const handleLogout = () => {
		localStorage.clear();
		history.push('/');
	}

	return (
		<div className="profile-container">
			<header>
				<img src={logoImg} alt="Logo Be The Hero" />
				<span>Bem vinda, {ongName}</span>

				<Link to="/incidents/new" className="button">Registar novo caso</Link>
				<button type="buttom"><FiPower size={18} color="#e02041" onClick={handleLogout} /></button>
			</header>
			<h1>Casos registados</h1>
			<ul>
				{incidents.map((incident) => (
					<li key={incident.id}>
						<p className="incident-title">CASO:</p>
						<p>{incident.title}</p>
						<p className="incident-title">Descrição:</p>
						<p>{incident.description}</p>
						<p className="incident-title">Valor:</p>
						<p>{Intl.NumberFormat('pt-pt', { style: 'currency', currency: 'EUR' }).format(incident.value)}</p>
						<button type="button" onClick={() => handleDeleteIncident(incident.id)}><FiTrash2 size={20} color="#a8a8b3" /></button>
					</li>
				))}
			</ul>
		</div>
	)
}

export default Profile;