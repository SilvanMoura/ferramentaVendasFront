import React, { useState } from 'react';
import './ScreenLogin.css';

const ScreenLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Lógica de submissão aqui
  };

  const loadRegister = () => {
    // Lógica para carregar a tela de registro
  };

  return (
    <div id="main-container">
      <main className="form-signin w-100 m-auto">
        <form onSubmit={handleSubmit}>
          <h1 className="h3 mb-3 fw-normal">Entrar na conta</h1>

          {/* Mostrar a mensagem (msg) aqui */}
          {/* {msg && <Message msg={msg} />} */}

          <div className="form-floating">

            {/* <label htmlFor="floatingInput">E-mail</label> */}
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
            />
            
          </div>

          <div className="form-floating">

            {/* <label htmlFor="floatingPassword">Senha</label> */}
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Senha"
            />
            
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
