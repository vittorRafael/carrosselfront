/* eslint-disable react/prop-types */
import React from 'react';
import { motion } from 'framer-motion';
import { FaTrash, FaPlus, FaPencil } from 'react-icons/fa6';
import api from '../hooks/useApi';
import { useNavigate } from 'react-router-dom';
import ModalComp from './ModalComp';
import LoadingButton from './LoadingButton';

const CarroselComp = ({ carrosselData, handleMsg, user }) => {
  const navigate = useNavigate();
  const carrosselRef = React.useRef();
  const [width, setWidth] = React.useState(0);
  const [offsetWidth, setOffsetWidth] = React.useState(
    carrosselRef.current?.offsetWidth,
  );
  const [file, setFile] = React.useState(null);
  const [desc, setDesc] = React.useState('');
  const [showModalAddImg, setShowModalAddImg] = React.useState(false);
  const [title, setTitle] = React.useState(carrosselData.title);
  const [showModalCarrossel, setShowModalCarrossel] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  async function removeImage(index) {
    try {
      const resp = await api.delete(`/carrossel/${carrosselData._id}/${index}`);
      handleMsg({
        text: resp.data.mensagem,
        error: false,
      });
      setTimeout(() => {
        navigate(0);
      }, 1500);
    } catch (err) {
      handleMsg({
        text: err.response.data.mensagem,
        error: true,
      });
      console.log(err.response.data.mensagem);
    }
  }

  async function addImage(idCarrossel) {
    setLoading(true);
    try {
      const resp = await api.post(
        `/carrossel/${idCarrossel}/addImage`,
        {
          desc,
          file: file,
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      setShowModalAddImg(false);
      handleMsg({
        text: resp.data.mensagem,
        error: false,
      });
      setTimeout(() => {
        navigate(0);
      }, 1500);
    } catch (err) {
      handleMsg({
        text: err.response.data.mensagem,
        error: true,
      });
      console.log(err);
    }
    setLoading(false);
  }

  async function editCarrossel(idCarrossel) {
    setLoading(true);
    try {
      const resp = await api.patch(`/carrossel/${idCarrossel}`, {
        title,
      });
      setShowModalCarrossel(false);
      console.log(resp);
      handleMsg({
        text: resp.data.mensagem,
        error: false,
      });
      setTimeout(() => {
        navigate(0);
      }, 1500);
    } catch (err) {
      handleMsg({
        text: err.response.data.mensagem,
        error: true,
      });
      console.log(err);
    }
    setLoading(false);
  }

  async function removeCarrossel(idCarrossel) {
    setLoading(true);
    try {
      const resp = await api.delete(`/carrossel/${idCarrossel}`);
      handleMsg({
        text: resp.data.mensagem,
        error: false,
      });
      setTimeout(() => {
        navigate(0);
      }, 1500);
    } catch (err) {
      handleMsg({
        text: err.response.data.mensagem,
        error: true,
      });
      console.log(err);
    }
    setLoading(false);
  }

  React.useEffect(() => {
    setOffsetWidth(carrosselRef.current?.offsetWidth);
    setWidth(
      carrosselRef.current?.scrollWidth - carrosselRef.current?.offsetWidth,
    );
  }, [offsetWidth]);

  return (
    <section className="lg:max-w-screen-lg max-w-full w-full mx-auto flex flex-col gap-8 p-5 border-b-2">
      <div className="flex justify-between items-center gap-4">
        <h2 className="font-bold text-2xl text-slate-800">
          {carrosselData.title}
        </h2>
        {user.admin && (
          <div className="flex gap-2">
            <button
              className="flex items-center gap-5 bg-red-500 p-4 rounded-lg"
              onClick={() => removeCarrossel(carrosselData._id)}
            >
              <LoadingButton
                text={<FaTrash className="text-slate-100" />}
                loading={loading && !file}
              />
            </button>
            <button
              className="flex items-center gap-5 bg-yellow-500 p-4 rounded-lg"
              onClick={() => setShowModalCarrossel(true)}
            >
              <FaPencil className="text-slate-100" />
            </button>
            <button
              className="flex items-center gap-5 bg-green-500 p-4 rounded-lg"
              onClick={() => setShowModalAddImg(true)}
            >
              <FaPlus className="text-slate-100" />
            </button>
          </div>
        )}
      </div>
      {carrosselData.imgs.length > 0 && (
        <motion.div
          ref={carrosselRef}
          className="cursor-grab overflow-hidden"
          whileTap={{ cursor: 'grabbing' }}
        >
          <motion.div
            className="inner"
            drag="x"
            dragConstraints={{ right: 0, left: -width }}
          >
            {carrosselData.imgs.map((item, index) => (
              <motion.div
                className="item-image flex flex-col gap-5"
                key={index}
              >
                <img
                  className="object-cover"
                  src={item.src}
                  alt={'Imagem ' + index}
                />
                <p className="font-medium text-slate-700">{item.desc}</p>
                {user.admin && (
                  <button
                    onClick={() => removeImage(index)}
                    className="flex items-center p-3 bg-red-500 text-white rounded-lg gap-4 w-fit"
                  >
                    <FaTrash /> Deletar imagem
                  </button>
                )}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      )}
      {showModalAddImg ? (
        <>
          <div className="p-4 justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Adicionar Imagem</h3>
                </div>
                <div className="relative p-6 flex flex-col gap-10">
                  <div className="flex flex-col gap-3">
                    <label htmlFor="descricao" className="font-medium text-lg">
                      Descrição da imagem
                    </label>
                    <input
                      className="p-2 border-2"
                      type="text"
                      name="descricao"
                      id="descricao"
                      onChange={(e) => setDesc(e.target.value)}
                    />
                  </div>
                  <label className="mx-auto text-center bg-sky-800 px-8 py-3 rounded-lg text-white">
                    <input
                      className="hidden"
                      type="file"
                      accept="image/png, image/jpeg, image/jpg"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                    {file ? file.name : 'Escolher imagem'}
                  </label>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModalAddImg(false)}
                  >
                    Fechar
                  </button>
                  <button
                    className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => addImage(carrosselData._id)}
                    disabled={loading ? true : false}
                  >
                    <LoadingButton text="Adicionar" loading={loading} />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      {showModalCarrossel ? (
        <ModalComp
          titleModal="Editar Carrossel"
          label="Título do Carrossel"
          inputName="title"
          value={title}
          handleChange={setTitle}
          handleModal={setShowModalCarrossel}
          handleSubmit={editCarrossel}
          idCarrossel={carrosselData._id}
          labelButton="Editar"
          corButton="yellow"
          loading={loading}
        />
      ) : null}
    </section>
  );
};

export default CarroselComp;
