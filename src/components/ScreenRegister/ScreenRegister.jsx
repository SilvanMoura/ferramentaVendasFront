import React, { useState } from 'react';
import './ScreenRegister.css';

const ScreenRegister = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Lógica de registro aqui
  };

  const loadLogin = () => {
    // Lógica para carregar a tela de login
  };

  return (
    <div id="main-container">
      <main className="form-signin w-100 m-auto">
        <form onSubmit={handleSubmit}>
          <h1 className="h3 mb-3 fw-normal">Registre-se</h1>

          {/* Mostrar a mensagem (msg) aqui */}
          {/* {msg && <Message msg={msg} />} */}

          <div className="form-floating">
            <input
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              type="string"
              className="form-control"
              id="floatingUserName"
              placeholder="Marcos Lahen"
            />
            <label htmlFor="floatingUserName">Nome de Usuário</label>
          </div>

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

          <div className="form-floating">
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              className="form-control"
              id="floatingConfirmPassword"
              placeholder="Confirme a senha"
            />
            <label htmlFor="confirmPassword">Confirme a senha</label>
          </div>

          <div id="btn-login">
            <span>Já tem conta? </span>
            <button type="button" onClick={loadLogin}>
              Entrar
            </button>
          </div>

          <button className="w-100 btn btn-lg btn-send" type="submit">
            Cadastrar
          </button>
        </form>
      </main>
    </div>
  );
};

export default ScreenRegister;
