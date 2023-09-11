import React, { useState, useEffect } from 'react';
import cookie from 'js-cookie';
import Message from '../Message/Message';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ScreenLogin.css';

const ScreenLogin = () => {
  const navigate = useNavigate();

  useEffect(()=>{
    if(cookie.get('_myapp_token')){
      navigate('/');
    } 
  }, [])

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (email === '' || password === '') {
      setMsg("Informações incompletas, revise os campos.");
      setTimeout(() => setMsg(""), 3000);
      return;
    }

    try {
      const response = await axios.post('http://vps49161.publiccloud.com.br/api/login', {
        email,
        password
      });

      const data = response.data;

      if (data.access_token) {
        cookie.set('_myapp_token', data.access_token);
        setMsg("Login realizado com sucesso");

        setTimeout(() => {
          window.location.href = "/";
          setMsg("");
        }, 3000);

      } else {
        setMsg("Login não realizado, por favor, verifique o e-mail e/ou senha");

        setTimeout(() => {
          setMsg("");
          setEmail("");
          setPassword("");
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loadRegister = () => {
    navigate('/register');
  };

  return (
    <div id="main-container">
      <main className="form-signin w-100 m-auto">
        <form onSubmit={handleSubmit}>
          <h1 className="h3 mb-3 fw-normal">Entrar na conta</h1>

          {msg !== "" && 
            <Message msg={msg} />
          }

          <div className="form-floating">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
            />
            <label htmlFor="floatingInput">E-mail</label>
          </div>

          <div className="form-floating">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Senha"
            />
            <label htmlFor="floatingPassword">Senha</label>
          </div>

          <div id="btn-register">
            <span>Não tem conta? </span>
            <button type="button" onClick={loadRegister}>
              Cadastre-se.
            </button>
          </div>

          <button className="w-100 btn btn-lg btn-send" type="submit">
            Entrar
          </button>
        </form>
      </main>
    </div>
  );
};

export default ScreenLogin;