/* eslint-disable react/prop-types */
import React from 'react';
import api from '../hooks/useApi';
import CarroselComp from '../layout/CarroselComp';
import MessageComp from '../layout/MessageComp';
import { FaPlus } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import ModalComp from '../layout/ModalComp';
import LoadingComp from '../layout/LoadingComp';

const CarrosselView = ({ user }) => {
  const navigate = useNavigate();
  const [carrossel, setCarrossel] = React.useState([]);
  const [msg, setMsg] = React.useState(null);
  const [showModalCarrossel, setShowModalCarrossel] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  async function addCarrossel() {
    setLoading(true);
    try {
      const resp = await api.post(`/carrossel/`, {
        title,
      });
      setShowModalCarrossel(false);
      console.log(resp);
      setMsg({
        text: resp.data.mensagem,
        error: false,
      });
      setTimeout(() => {
        navigate(0);
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

  React.useEffect(() => {
    async function getCarrossel() {
      setLoading(true);
      try {
        const resp = await api.get('/carrossel');
        setCarrossel(resp.data);
      } catch (err) {
        setMsg({
          text: err.response.data.mensagem,
          error: true,
        });
        console.log(err.response.data.mensagem);
      }
      setLoading(false);
    }
    getCarrossel();
  }, []);

  if (loading) {
    return <LoadingComp />;
  }

  return (
    <main className="max-w-screen-xl mx-auto my-10 flex flex-col items-center gap-10">
      {msg && <MessageComp msg={msg} />}
      {carrossel.length > 0 &&
        carrossel.map((item) => (
          <CarroselComp
            key={item._id}
            carrosselData={item}
            handleMsg={setMsg}
            user={user}
          />
        ))}
      {carrossel.length == 0 && (
        <h2 className="font-bold text-2xl text-slate-700">
          Não há carrosséis cadastrados no momento. Clique no botão para
          adicionar!
        </h2>
      )}

      {user.admin && (
        <button
          className="bg-green-500 font-bold text-white flex gap-3 items-center px-5 py-3 rounded-md text-xl"
          type="button"
          onClick={() => setShowModalCarrossel(true)}
        >
          <FaPlus /> Adicionar Carrossel
        </button>
      )}
      {showModalCarrossel ? (
        <ModalComp
          titleModal="Criar Carrossel"
          label="Título do Carrossel"
          inputName="title"
          handleChange={setTitle}
          handleModal={setShowModalCarrossel}
          handleSubmit={addCarrossel}
          labelButton="Criar"
          corButton="green"
          value={title}
        />
      ) : null}
    </main>
  );
};

export default CarrosselView;
