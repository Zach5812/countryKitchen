import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Card, Paper } from '@mui/material'
import Main from './views/Main';
import AdminLogin from './views/AdminLogin';
import { useState } from 'react';
import AppContext from './libs/context';
import DetailsPage from './views/DetailsPage';
import CreatePage from './views/CreatePage';
import EditPage from './views/EditPage';

function App() {
  const [loggedUser, setLoggedUser] = useState();
  const [category, setCategory] = useState();

  return (
    <AppContext.Provider value={{ loggedUser, setLoggedUser, category, setCategory }}>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/recipes/:id" element={<DetailsPage />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/recipes/create" element={<CreatePage />} />
        <Route path="/recipes/edit/:id" element={<EditPage />} />
      </Routes>
    </AppContext.Provider>
  );
}

export default App;
