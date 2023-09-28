/* eslint-disable react/prop-types */
import LoginView from '../Pages/LoginView';

export const RequireAuth = ({ createSession, children }) => {
  const token = JSON.parse(localStorage.getItem('token'));
  if (!token) {
    console.log('entrou aqui');
    return <LoginView createSession={createSession} />;
  }

  return children;
};
