import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Message from '../Message/Message';
import axios from 'axios';
import './ScreenRegister.css';

const ScreenRegister = () => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if(userName == '' || email == '' || password == '' || confirmPassword == ''){
                    
      setMsg("Informações incompletas, revise os campos.");

      setTimeout( () => {
          setUserName('');
          setEmail('');
          setPassword('');
          setConfirmPassword('');
      }, 3000);

      setMsg("");

      return false;
    }

    if(password != confirmPassword){
        setTimeout( () => {
            setMsg("As senhas são diferentes, revise os campos.");
            setConfirmPassword('');
        }, 3000);
        setMsg("");
    }

    const payload = {
        name: userName,
        email: email,
        password: password
    };

    axios.post('http://localhost:8000/api/register', payload )
      .then(response =>{
        const data = response.data;

        if( data == "success" ){
            setMsg("Usuário cadastrado com sucesso");

            setTimeout( () => {
                setMsg("");
                navigate('/login');

            }, 3000);
        }else{
            setMsg("Cadastro não realizado, por favor, verifique as informações informadas");
            setTimeout( () => {
                setMsg("");

                setUserName("");
                setEmail("");
                setPassword("");
                setConfirmPassword("");

            }, 3000);
        }
      })
      .catch(error => console.log(error));
  };

  const loadLogin = () => {
    navigate('/login');
  };

  return (
    <div id="main-container">
      <main className="form-signin w-100 m-auto">
        <form onSubmit={handleSubmit}>
          <h1 className="h3 mb-3 fw-normal">Registre-se</h1>

          {msg !== "" && 
            <Message msg={msg} />
          }

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
