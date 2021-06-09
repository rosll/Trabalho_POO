import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import Header from '../../components/Header'
import { Container } from './styles'
import api from '../../services/api'

interface NewInFormData {
  id: string;
  disciplina: string;
  professor: string;
  diasemana: string;
  periodo: string;
  horario: string
}

const Dashboard: React.FC = () => {
  const [professores, setProfessores] = useState<NewInFormData[]>([])
    
    useEffect(() => {
      api.get('teachers').then(response => {
        setProfessores(response.data)
      })
    }, [])

  return (
    <>
      <Header />
      <Container>
        <ul>
          {professores.map((dados, index) => (
            <li key={index.toString()}>
              <Link to={`/details/${dados.id}`}>{dados.professor}</Link>
            </li>
          ))}
        </ul>
      </Container>
    </>
  )
}

export default Dashboard;
