import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';

const DetailsPage = () => {
    const [recipe, setRecipe] = useState();

    const {id} = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/recipes/${id}`)
        .then(response => {
            setRecipe(response.data)
        })
        .catch(error => console.log(error))
    }, [id])

  return (
    <div>{recipe? 
    <div> <h1>{recipe.title}</h1>
    <h3>{recipe.description}</h3>
    </div>:
    <p>Not available</p>
    }</div>
  )
}

export default DetailsPage