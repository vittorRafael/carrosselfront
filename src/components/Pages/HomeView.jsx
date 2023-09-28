import { NavLink } from 'react-router-dom';

const HomeView = () => {
  return (
    <main className="h-screen max-w-screen-xl mx-auto flex flex-col justify-center items-center gap-10">
      <h1 className="text-5xl font-bold text-slate-700">Seja Bem Vindo</h1>
      <p>
        <NavLink to="/carrossel" className="text-sky-800 hover:text-sky-600">
          Clique aqui
        </NavLink>{' '}
        para ver os carrosséis de imagens.
      </p>
    </main>
  );
};

export default HomeView;
