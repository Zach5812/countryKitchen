import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Card, Paper } from '@mui/material'
import Main from './views/Main';
import AdminLogin from './views/AdminLogin';
import { useState } from 'react';
import AppContext from './libs/context';
import DetailsPage from './views/DetailsPage';

function App() {
  const [loggedUser, setLoggedUser] = useState();
  const [category, setCategory] = useState();

  return (
    <AppContext.Provider value={{ loggedUser, setLoggedUser, category, setCategory }}>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/recipes/:id" element={<DetailsPage />} />
        <Route path="/admin" element={<AdminLogin />} />
      </Routes>
    </AppContext.Provider>
  );
}

export default App;
