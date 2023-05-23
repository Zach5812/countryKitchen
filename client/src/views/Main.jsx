import React from 'react'
import { Card, Paper } from '@mui/material'
import CatNav from '../components/CatNav'
import ListBoard from '../components/ListBoard'
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../libs/context";
import { useEffect } from 'react';
import axios from 'axios';


const Main = () => {
  const { loggedUser, setLoggedUser } = useAppContext();
  const navigate = useNavigate();

  const handleClick = () => {
    axios.delete("http://localhost:8000/api/auth", { withCredentials: true })
      .then(_ => setLoggedUser(null));
  }

  useEffect(() => {
    if (!loggedUser) {
      axios.get("http://localhost:8000/api/auth", { withCredentials: true })
        .then(res => setLoggedUser(res.data))
        .catch(_ => navigate("/"));
    }
  }, [])

  return (
    <div className="Body">
      <Paper id="Mat" elevation={4} >
        <Paper id="Menu" elevation={2} square='true' outlined>
          {loggedUser?.username ?
            <div>
              <h1>Welcome {loggedUser?.username}</h1>
              <button className="btn btn-danger" onClick={handleClick}>Logout</button>
            </div>
            : null
          }
          <CatNav />
          <ListBoard />
        </Paper>
      </Paper>
    </div>
  )
}

export default Main