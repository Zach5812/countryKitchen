import React from 'react'
import { Card, Paper } from '@mui/material'
import CatNav from '../components/CatNav'
import ListBoard from '../components/ListBoard'
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../libs/context";
import { useEffect, useState } from 'react';
import axios from 'axios';


const Main = () => {
  const { loggedUser, setLoggedUser } = useAppContext();
  const navigate = useNavigate();
  const [category, setCategory] = useState("")
  const [recipeList, setRecipeList] = useState([])
  const [filteredList, setFilteredList] = useState([])

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

  useEffect(() => {
    axios.get('http://localhost:8000/api/recipes')
      .then(response => {
        setRecipeList(response.data)
      })
  }, [])

  const filterCat = (category) => {
    const filteredList = (recipeList.filter((eachRecipe) => eachRecipe["category"] === category))
    setFilteredList(filteredList)
    console.log(category)
    console.log(filteredList)
  }

  const filterAll = (category) => {
    const filteredList = (recipeList.filter((eachRecipe) => eachRecipe["category"] !== category))
    setFilteredList(filteredList)
    console.log(category)
    console.log(filteredList)
  }

  return (
    <div className="Body">
      <Paper id="Mat" elevation={4} >
        <Paper id="Menu" elevation={5} square={true} variation="outlined">
          {loggedUser?.username ?
            <div>
              <h1>Welcome {loggedUser?.username}</h1>
              <button className="btn btn-danger" onClick={handleClick}>Logout</button>
            </div>
            : null
          }
          <CatNav filterCat={filterCat}
                  filterAll={filterAll} />

          <ListBoard recipeList={filteredList} />
        </Paper>
      </Paper>
    </div>
  )
}

export default Main