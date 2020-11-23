import React from 'react';

import { Link } from 'react-router-dom';

import Container from '../components/Container';
import Logo from '../../assets/logo';

import './index.css';

export default function Logon() {
  return (
    <Container>
      <div className="logon">
        <Logo />
        <div className="buttons">
          <Link to="/login" className="button light">ENTRAR</Link>
          <Link to="/register" className="button dark">CRIAR UMA CONTA</Link>
          <a href="/" className="link">Esqueceu a senha?</a>
        </div>
      </div>
    </Container>
  )
}
