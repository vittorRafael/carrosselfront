import React from 'react';
import api from '../hooks/useApi';
import { NavLink, useNavigate } from 'react-router-dom';
import LoadingComp from '../layout/LoadingComp';

// eslint-disable-next-line react/prop-types
const LoginView = ({ createSession }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [msg, setMsg] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();

  async function logInto(e) {
    setLoading(true);
    e.preventDefault();
    try {
      const resp = await api.post('/login', {
        email,
        password,
      });
      setMsg({
        text: resp.data.mensagem,
        error: false,
      });
      createSession(resp.data.dataUser, resp.data.token);
      navigate('/');
    } catch (err) {
      setMsg({
        text: err.response.data.mensagem,
        error: true,
      });
      console.log(err.response.data.mensagem);
    }
    setLoading(false);
  }

  if (loading) {
    return <LoadingComp />;
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
          onSubmit={logInto}
        >
          <p className="text-white text-center text-lg font-bold">LOGIN</p>
          <div className="">
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
            <label className="block  text-sm text-white">Senha</label>
            <input
              className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
              type="password"
              id="password"
              placeholder="Digite a sua senha"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mt-4 items-center flex justify-between">
            <NavLink
              className="font-bold text-slate-300 hover:text-white"
              to="/register"
            >
              Registre-se
            </NavLink>
            <button
              className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 hover:bg-gray-800 rounded"
              type="submit"
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default LoginView;
