import React, { useState } from 'react';
import imagem from './imagem.png';

function App() {
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setCep(e.target.value);
  };

  const buscarEndereco = () => {
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then(response => response.json())
      .then(data => {
        if (!data.erro) {
          setEndereco(data);
          setError(null);
        } else {
          setEndereco(null);
          setError("CEP não encontrado. Verifique o CEP digitado e tente novamente.");
        }
      })
      .catch(() => {
        setEndereco(null);
        setError("Ocorreu um erro ao buscar o endereço. Por favor, tente novamente mais tarde.");
      });
  };

  return (
    <div className="App">
      <main>
        <img src={imagem} alt="Computador" />
        <section>
          <input
            type="text"
            placeholder="Digite o CEP (apenas números)"
            value={cep}
            onChange={handleInputChange}
          />
          <div className='res'>
            {endereco && (
              <div>
                <h2>Endereço:</h2>
                <p>CEP: {endereco.cep}</p>
                <p>Logradouro: {endereco.logradouro}</p>
                <p>Complemento: {endereco.complemento}</p>
                <p>Bairro: {endereco.bairro}</p>
                <p>Cidade: {endereco.localidade}</p>
                <p>Estado: {endereco.uf}</p>
              </div>
            )}
          </div>
        </section>
        <button onClick={buscarEndereco}>Buscar</button>
        {error && <p>{error}</p>}
      </main>
    </div>
  );
}

export default App;
