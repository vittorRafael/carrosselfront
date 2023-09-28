import React from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../hooks/useApi';

const RegisterView = () => {
  const [msg, setMsg] = React.useState(null);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [admin, setAdmin] = React.useState(false);
  const navigate = useNavigate();

  async function registerUser(e) {
    e.preventDefault();
    try {
      const resp = await api.post('/user', {
        name,
        email,
        password,
        confirmPassword,
        admin,
      });
      setMsg({
        text: resp.data.mensagem,
        error: false,
      });
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (err) {
      setMsg({
        text: err.response.data.mensagem,
        error: true,
      });
      console.log(err.response.data.mensagem);
    }
  }

  return (
    <section className="h-screen font-sans login bg-cover">
      <div className="max-w-screen-xl h-full mx-auto flex flex-col gap-5 justify-center items-center">
        {msg && (
          <div
            className={`msg-width w-fit mx-auto text-center p-4 mt-4 text-sm rounded-lg ${
              msg.error
                ? 'text-red-800 bg-red-50'
                : 'text-green-800 bg-green-50'
            }`}
            role="alert"
          >
            <span className="font-medium">{msg.text}</span>
          </div>
        )}
        <form
          className="p-10 sm:p-20 bg-white bg-opacity-25 rounded shadow-xl"
          onSubmit={registerUser}
        >
          <p className="text-white text-center text-lg font-bold">
            REGISTRE-SE
          </p>
          <div className="">
            <label className="block text-sm text-white" htmlFor="name">
              Nome
            </label>
            <input
              className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
              type="name"
              id="name"
              placeholder="Digite o seu nome"
              aria-label="name"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mt-2">
            <label className="block text-sm text-white" htmlFor="email">
              E-mail
            </label>
            <input
              className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
              type="email"
              id="email"
              placeholder="Digite o e-mail"
              aria-label="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mt-2">
            <label className="block  text-sm text-white" htmlFor="password">
              Senha
            </label>
            <input
              className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
              type="password"
              id="password"
              placeholder="Digite a sua senha"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mt-2">
            <label
              className="block  text-sm text-white"
              htmlFor="confirmPassword"
            >
              Confirmar Senha
            </label>
            <input
              className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
              type="password"
              id="confirmPassword"
              placeholder="Confirme a sua senha"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="mt-2 flex gap-4 items-center">
            <input
              className=""
              type="checkbox"
              id="admin"
              placeholder="Confirme a sua senha"
              onClick={() => setAdmin(!admin)}
            />
            <label htmlFor="admin" className="text-white">
              Admin?
            </label>
          </div>
          <div className="mt-4 items-center flex justify-between">
            <button
              className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 hover:bg-gray-800 rounded"
              type="submit"
            >
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default RegisterView;
