import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Card, Paper } from '@mui/material'
import Main from './views/Main';
import AdminLogin from './views/AdminLogin';
import { useState } from 'react';
import AppContext from './libs/context';

function App() {
  const [loggedUser, setLoggedUser] = useState();

  return (
    <AppContext.Provider value={{ loggedUser, setLoggedUser }}>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/admin" element={<AdminLogin />} />
      </Routes>
    </AppContext.Provider>
  );
}

export default App;
