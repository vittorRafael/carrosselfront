/* eslint-disable react/prop-types */
import React from 'react';
import api from '../hooks/useApi';
import LoadingComp from '../layout/LoadingComp';
import MessageComp from '../layout/MessageComp';
import { FaTrash } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

const UserView = ({ user }) => {
  const navigate = useNavigate();
  const [msg, setMsg] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  async function removeUser() {
    setLoading(true);
    try {
      const resp = await api.delete(`/user/${user._id}`);
      setMsg({
        text: resp.data.mensagem,
        error: false,
      });
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (err) {
      setMsg({
        text: err.response.data.mensagem,
        error: true,
      });
      console.log(err);
    }
    setLoading(false);
  }

  if (loading) {
    return <LoadingComp />;
  }

  return (
    <main className="max-w-screen-xl mx-auto my-10 flex flex-col items-center gap-10">
      {msg && <MessageComp msg={msg} />}
      <div className="flex justify-between w-full items-center">
        <h1 className="font-bold text-slate-800 text-3xl">Minha Conta</h1>
        <button
          onClick={removeUser}
          className="flex gap-5 items-center font-bold text-white bg-red-500 px-8 py-4 rounded-lg"
        >
          <FaTrash />
          Deletar minha conta
        </button>
      </div>

      <div className="flex flex-col gap-4 w-full">
        <ul className="max-w-md space-y-1 text-slate-500 list-disc list-inside">
          <li>
            <span className="font-bold">Nome:</span> {user.name}
          </li>
          <li>
            <span className="font-bold">Email:</span> {user.email}
          </li>
          <li>
            <span className="font-bold">Admin:</span>
            {user.admin ? ' Sim' : ' Não'}
          </li>
        </ul>
      </div>
    </main>
  );
};

export default UserView;
