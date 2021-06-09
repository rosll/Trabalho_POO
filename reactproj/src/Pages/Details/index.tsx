import React, { useState, useEffect } from 'react';
import { Container, Disciplinas } from './styles'
import { useRouteMatch, useHistory, Link } from 'react-router-dom'
import api from '../../services/api'

interface ProfessoresParametros {
  id: string;
  professor: string;
}

interface Cadastro {
  disciplina: string;
  professor: string;
  diasemana: string;
  periodo: string;
  horario: string;
}

const Details: React.FC = () => {
  const { params } = useRouteMatch<ProfessoresParametros>();
  const [professores, setProfessores] = useState<Cadastro>()
  const history = useHistory();


  useEffect(() => {
    api.get(`teachers/${params.professor}`).then(response => {
      setProfessores(response.data)
    })
  })

  return (
    <Container>
      <Disciplinas>
        <ul>
            <li>
              <span>Professor: {professores?.professor}</span>
              <span>Disciplina: {professores?.disciplina}</span>
              <span>Dia Semana: {professores?.diasemana}</span>
              <span>Periodo: {professores?.periodo}</span>
              <span>Horario: {professores?.horario}</span>
            </li>
        </ul>
        <button type="button" onClick={async () => {
              await api.delete(`teachers/${params.professor}`)
              history.push('/')
            }}>Excluir
        </button>
        {/* <Link to={`/att/${params.professor}`}>Alterar</Link> */}
        <button type="button" onClick={async () => {
              history.push(`/att/${params.professor}`)
            }}>Alterar
        </button>
      
      </Disciplinas>
    </Container>
  )
}

export default Details;
