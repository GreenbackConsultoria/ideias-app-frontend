import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import Container from '../components/Container';
import Logo from '../../assets/logo';

import './index.css';

export default function Register() {
  const history = useHistory();
  const [user, setUser] = useState({
    tel_or_email: 'testGabs',
    password: ''
  })

  function handleChange(event) {
    const value = event.target.value;
    setUser({ ...user, [event.target.name]: value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!user.tel_or_email || !user.password) {
      return alert('Por favor preencha todos os campos!')
    }

    try {
      const response = await fetch('http://localhost:5000/api/v1/login', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': JSON.stringify(user.password)
        },
        body: JSON.stringify({tel_or_email: user.tel_or_email})
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('id', user.tel_or_email);
        history.push('/profile');
      }else if(response.status !== 200){
        return alert('Falha na autenticação!');
      }

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container>
      <div className="register">
        <Logo />
        <form className="form" onSubmit={handleSubmit} autoComplete="off">
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
          <input type="submit" value="ENTRAR" className="button dark noborder" />
          <a href="/" className="link dark">Esqueceu a senha?</a>
        </form>
      </div>
    </Container>
  )
}
