import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';
import './styles.css';
import api from "../../services/api";


export default function Profile() {
  const navigate = useNavigate();

  const ongId = localStorage.getItem('ongId');
  const ongName = localStorage.getItem('ongName');
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {//DISPARAR FUNCAO EM DETERMINADO MOMMENTO DO COMPONENT
    api.get('profile', {
      headers: {
        Authorization: ongId
      }
    }).then(response => {
      setIncidents(response.data);
    })
  }, [ongId])

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId
        }
      });
      setIncidents(incidents.filter(incident => incident.id !== id));
    } catch (error) {
      alert('Error ao deletar');
    }
  }
  function handleLogout() {
    localStorage.clear();
    navigate('/')

  }
  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero" />
        <span>Bem vinda, {ongName}</span>

        <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
        <button type="button" onClick={handleLogout}><FiPower size={18} color="#e0241" /></button>
      </header>
      <h1>Casos Cadastrados</h1>
      <ul>
        {incidents.map(incident => (
          <li key={incidents.id}>
            <strong>CASO:</strong>
            <p>{incident.title}</p>
            <strong>DESCRIÇÃO:</strong>
            <p>{incident.description}</p>
            <strong>VALOR:</strong>
            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)} </p>
            <button type="button" onClick={() => handleDeleteIncident(incident.id)}>
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
