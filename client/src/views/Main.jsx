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
  const {category, setCategory} = useAppContext();
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
        const filteredList = (response.data.filter((eachRecipe) =>category==='*'? eachRecipe["category"] !== category:eachRecipe["category"] === category))
        setFilteredList(filteredList)
        }
      )
  }, [category])

  const filterCat = (category) => {
    setCategory(category)
    const filteredList = (recipeList.filter((eachRecipe) =>category==='*'? eachRecipe["category"] !== category:eachRecipe["category"] === category))
    setFilteredList(filteredList)
  }



  return (
    <div className="Body">
      <Paper id="Mat" elevation={10}>
          {loggedUser?.username ?
            <div className="adminOptions" >
              <button  onClick={handleClick}>Logout</button>
            </div>
            : null
          }
        <Paper id="Menu" elevation={10} square={true} variation="outlined">
          <CatNav filterCat={filterCat}/>

          <ListBoard recipeList={filteredList} />
        </Paper>
      </Paper>
    </div>
  )
}

export default Main