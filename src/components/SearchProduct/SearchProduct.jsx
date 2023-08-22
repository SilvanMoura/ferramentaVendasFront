import React, { useState } from 'react';
import './SearchProduct.css';

const ScreenLogin = () => {
    const [code, setCode] = useState('');
    const [msg, setMsg] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Lógica de submissão aqui
    };

    return (
        <div id="main-container">
            <main className="form-signin w-100 m-auto">
                <form onSubmit={handleSubmit}>
                    <h1 className="h3 mb-3 fw-normal">Pesquisar produto</h1>

                    {/* Mostrar a mensagem (msg) aqui */}
                    {/* {msg && <Message msg={msg} />} */}

                    <div className="form-floating">

                        <input
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            type="text"
                            className="form-control"
                            id="floatingInput"
                            placeholder="Insira o ASIN"
                        />
                        <label htmlFor="floatingInput">ASIN</label>

                    </div>

                    <button
                        className="w-100 btn btn-lg btn-send"
                        type="submit"
                    >
                        Pesquisar
                    </button>
                </form>
            </main>
        </div>
    );
};

export default ScreenLogin;
