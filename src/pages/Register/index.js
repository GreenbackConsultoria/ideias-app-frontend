import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import Container from '../components/Container';
import Logo from '../../assets/logo';

import { textToTimestamp } from '../../helpers';

import './index.css';

export default function Register() {
  const history = useHistory();
  const [user, setUser] = useState({
    username: '',
    tel_or_email: '',
    password: '',
    cpf: '',
    birthdate: '2000-01-01'
  })

  function handleChange(event) {
    const value = event.target.value;
    setUser({ ...user, [event.target.name]: value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!user.username || !user.tel_or_email || !user.password || !user.cpf || !user.birthdate) {
      return alert('Por favor preencha todos os campos!')
    }

    try {
      const response = await fetch('http://localhost:5000/api/v1/users', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...user,
          birthdate: textToTimestamp(user.birthdate)
        })
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        localStorage.setItem('id', user.tel_or_email);
        
        return history.push('/profile')
      }
    } catch (error) {
      console.log(error);
      alert(error)
    }
  }

  return (
    <Container>
      <div className="register">
        <Logo />
        <form className="form" onSubmit={handleSubmit} autoComplete="off">
          <input
            type="text"
            placeholder="Nome de Usuário"
            name="username"
            autoComplete=""
            defaultValue=""
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Telefone ou e-mail"
            name="tel_or_email"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Senha"
            name="password"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="CPF"
            name="cpf"
            onChange={handleChange}
          />
          <p style={{ marginBottom: '-10px' }}>Data de nascimento</p>
          <input
            type="date"
            defaultValue="2000-01-01"
            placeholder="Data"
            name="birthdate"
            onChange={handleChange}
          />
          <input type="submit" value="ENTRAR" className="button dark noborder" />
          <a href="/" className="link dark">Esqueceu a senha?</a>
        </form>
      </div>
    </Container>
  )
}
