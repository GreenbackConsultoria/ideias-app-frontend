import React, { useEffect, useState } from 'react';

import { useHistory} from 'react-router-dom';

import Logo from '../../assets/logo';
import Container from '../components/Container';

import {calculateAge} from '../../helpers';

import './index.css';

export default function Profile() {
  const history = useHistory();
  const tel_or_email = localStorage.getItem('id');
  const [user, setUser] = useState([]);
  const birthdate = new Date(user.birthdate);
  const age = calculateAge(user.birthdate);
  
  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch('http://localhost:5000/api/v1/session', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': tel_or_email
          }
        })
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        }
      } catch (error) {
        console.log(`Error /Profile => session request: ${error}`)
      }
    };
    loadData();
  }, [tel_or_email])


  function handleLogout(event){
    localStorage.clear();
    history.push('/logon');
  }

  return (
    <Container>
      <div className="profile">
        <Logo />
        <div className="container_profile">
          <div className="item">
            <p>{user.username}</p>
            <p>{user.tel_or_email}</p>
          </div>
          <div className="item">
            <p>{`${age} anos`}</p>
            <p>{`${birthdate.getDay()}/${birthdate.getMonth() + 1}/${birthdate.getFullYear()}`}</p>
          </div>
        </div>
        <a href="/" className="button dark" onClick={handleLogout}>SAIR</a>
      </div>
    </Container>
  )
}
