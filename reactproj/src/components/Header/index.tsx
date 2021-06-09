import React from 'react'

import { Link } from 'react-router-dom'

import { Container } from './styles'

const Header: React.FC = () => (
  <Container>
    <Link to="/new">
      <button type="button">Novo Cadastro</button>
    </Link>
  </Container>
)

export default Header;