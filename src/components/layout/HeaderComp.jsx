/* eslint-disable react/prop-types */
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import LoadingComp from './LoadingComp';

const HeaderComp = ({ destroySession, token }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  function logout() {
    setLoading(true);
    setIsOpen(!isOpen);
    destroySession();
    navigate('/login');
    setLoading(false);
  }

  if (loading) {
    <LoadingComp />;
  }

  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <NavLink
            to="/"
            className="flex items-center"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className="w-6 mr-3 h-6 sm:h-9 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 8v10a1 1 0 0 0 1 1h4v-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5h4a1 1 0 0 0 1-1V8M1 10l9-9 9 9"
              />
            </svg>
          </NavLink>
          <div className="flex items-center ">
            <button
              data-collapse-toggle="mobile-menu-2"
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="mobile-menu-2"
              aria-expanded="false"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="sr-only">Abrir Menu</span>
              <svg
                className={`w-6 h-6 ${isOpen ? 'hidden' : ''}`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <svg
                className={`w-6 h-6 ${!isOpen ? 'hidden' : ''}`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div
            className={`justify-between items-center w-full lg:flex lg:w-auto lg:order-1 ${
              !isOpen ? 'hidden' : ''
            }`}
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <NavLink
                  to="/"
                  className="block transition-all duration-200 py-2 pr-4 pl-3 text-gray-700 border-b border-gray-500 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-slate-100 lg:p-0"
                  aria-current="page"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/carrossel"
                  className="block transition-all duration-200 py-2 pr-4 pl-3 text-gray-700 border-b border-gray-500 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-slate-100 lg:p-0"
                  aria-current="page"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  Carrosel
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/users"
                  className="block transition-all duration-200 py-2 pr-4 pl-3 text-gray-700 border-b border-gray-500 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-slate-100 lg:p-0"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  Usuários
                </NavLink>
              </li>
              <li>
                {token && (
                  <button
                    className="block transition-all duration-200 py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-slate-100 lg:p-0"
                    onClick={logout}
                  >
                    Sair
                  </button>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default HeaderComp;
