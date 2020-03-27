import React, { useState } from 'react';
import { Link , useHistory} from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'
import logoImg from '../../assets/logo.svg';
import './styles.css';
import api from "../../services/api";



export default function NewIncident() {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const ongId = localStorage.getItem('ongId');
    const history = useHistory();
    async function handleNewIncident(e) {
        e.preventDefault();
        const data = { title, description, value }

        try {
            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId
                }
            });
            history.push('/profile');
        } catch (error) {
            alert('Não foi possivel cadastrar um novo caso');
        }
    }



    return (
        <div className="new-incidents-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Logo" />
                    <h1>Cadastrar Novo caso</h1>
                    <p>
                        Descreva o caso detalhadamente para encontrar um herói para resolver isso
                     </p>
                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#e02041" />
                        Voltar para home</Link>
                </section>
                <form onSubmit={handleNewIncident}>
                    <input type="text" value={title} onChange={e => setTitle(e.target.value)}
                        placeholder="Titulo do caso" />
                    <textarea value={description} onChange={e => setDescription(e.target.value)}
                        placeholder="Descrição" />
                    <input type="text" value={value} onChange={e => setValue(e.target.value)}
                        placeholder="Valor em Reais" />
                    <button className="button">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}
