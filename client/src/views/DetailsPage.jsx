import React, { useEffect, useState } from 'react'

import { Link, useParams, useNavigate } from 'react-router-dom';

import axios from 'axios';
import { Card, Paper } from '@mui/material';
import Comments from '../components/Comments';
import CatNav from '../components/CatNav';

const DetailsPage = () => {
    const [recipe, setRecipe] = useState();
    const [comments, setComments] = useState([]);
    const navigate = useNavigate
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/recipes/${id}`)
            .then(response => {
                setRecipe(response.data)
                // setComments(response.data.comments)
            })
            .catch(error => console.log(error))
    }, [id])

    useEffect(() => {
        axios.get(`http://localhost:8000/api/recipes/${id}`)
            .then(response => {
                setComments(response.data.comments)
            })
            .catch(error => console.log(error))
    }, [])

    const edit = () => {
        navigate(`/recipes/edit/${id}`)
      }

    const addComment =  (newComment) =>{
        setComments([...comments, newComment])
    }


    // const filterCat = (category) => {
    //     const filteredList = (recipeList.filter((eachRecipe) => eachRecipe["category"] === category))
    //     setFilteredList(filteredList)
    //     console.log(category)
    //     console.log(filteredList)
    //   }

    return (
        <div className="Body">
            <Paper id='Mat'>
                <Paper id='Menu'>
                    {/* <CatNav filterCat={filterCat}/> */}
                    <Paper id="recipeDetails">{recipe ?
                        <div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <div>
                                    <Card id="specs" elevation={8}>
                                        <h1>{recipe.title}</h1>
                                        <h3>{recipe.description}</h3>
                                    </Card>

                                    <Card id="specs" className="specs" elevation={8}>
                                        <h3>Ingredients</h3>
                                        <ul>
                                            {recipe.ingredients.map((eachIng, idx) => (
                                                <li key={idx}>{eachIng.name}: {eachIng.amount} {eachIng.measurement}</li>
                                            ))}
                                        </ul>

                                        <br />

                                        <h3>Methods</h3>
                                        <ol>
                                            {recipe.methods.map((eachMeth, idx) => (
                                                <li key={idx}>{eachMeth}</li>
                                            ))}
                                        </ol>
                                    </Card>
                                </div>
                                <div>
                                    <Card id="recImage" elevation={8}>
                                        <img src={recipe["image"]} alt={recipe.title} />
                                        <button onClick={edit}>Edit Recipe Details</button>
                                    </Card>
                                </div>

                            </div>
                            <br />
                            <Card id="specs" elevation={8}>
                                <h3>Recipe History</h3>
                                {recipe.story}

                                <Comments addToDom={addComment} comments={comments} id ={id} />
                            </Card>
                        </div>
                        :
                        <p>Not available</p>
                    }

                    </Paper>
                </Paper>
            </Paper>
        </div>)
}

export default DetailsPage