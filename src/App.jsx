import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';

import LoginView from './components/Pages/LoginView';
import HomeView from './components/Pages/HomeView';
import { RequireAuth } from './components/context/RequireAuth';
import HeaderComp from './components/layout/HeaderComp';
import NotFound from './components/Pages/NotFound';
import CarrosselView from './components/Pages/CarrosselView';
import UserView from './components/Pages/UserView';
import RegisterView from './components/Pages/RegisterView';

function App() {
  const [user, setUser] = React.useState(
    JSON.parse(localStorage.getItem('user')),
  );
  const [token, setToken] = React.useState(null);

  function createSession(user, token) {
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
    setToken(token);
    localStorage.setItem('token', JSON.stringify(token));
  }

  function destroySession() {
    setUser(null);
    localStorage.removeItem('user');
    setToken(null);
    localStorage.removeItem('token');
  }

  React.useEffect(() => {
    setToken(JSON.parse(localStorage.getItem('token')));
  }, []);

  return (
    <>
      <Router>
        <HeaderComp destroySession={destroySession} token={token} />
        <Routes>
          <Route
            path="/login"
            element={<LoginView createSession={createSession} />}
          />
          <Route path="/register" element={<RegisterView />} />
          <Route
            exact
            path="/"
            element={
              <RequireAuth createSession={createSession}>
                <HomeView />
              </RequireAuth>
            }
          />
          <Route
            path="/carrossel"
            element={
              <RequireAuth createSession={createSession}>
                <CarrosselView user={user} />
              </RequireAuth>
            }
          />
          <Route
            path="/users"
            element={
              <RequireAuth createSession={createSession}>
                <UserView user={user} />
              </RequireAuth>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
