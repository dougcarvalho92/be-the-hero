import React, { useState } from 'react';
import { FiLogIn } from 'react-icons/fi';

import { Link, useNavigate } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';


export default function Logon() {

    const [id, setId] = useState('');
    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();
        console.log(id);
        try {
            const response = await api.post('sessions', { id });
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);
            navigate('/profile');


            
        } catch (error) {
            console.log(error);
            alert("Falha no login, tente novamente!");
        }
    }

    return (
        <div>
            <div className="logon-container">
                <section className="form">
                    <img src={logoImg} alt="Be the Hero" />
                    <form onSubmit={handleLogin}>
                        <h1>Faça seu logon</h1>
                        <input type="text" placeholder="Sua ID" value={id} onChange={e => setId(e.target.value)} />
                        <button className="button" type="submit">Entrar</button>

                        <Link className="back-link" to="/register">
                            <FiLogIn size={16} color="#e02041" />
                            Não tenho cadastro</Link>
                    </form>
                </section>
                <img src={heroesImg} alt="Heroes" srcset={heroesImg} />
            </div>
        </div>
    );
}
