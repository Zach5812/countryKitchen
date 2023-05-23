import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, Paper } from '@mui/material';
import Comments from '../components/Comments';
import CatNav from '../components/CatNav';

const DetailsPage = () => {
    const [recipe, setRecipe] = useState();
    const [comments, setComments] = useState([]);
    const navigate = useNavigate()
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
    }, [comments])



setComments([...Comments, response.data])

    // const filterCat = (category) => {
    //     const filteredList = (recipeList.filter((eachRecipe) => eachRecipe["category"] === category))
    //     setFilteredList(filteredList)
    //     console.log(category)
    //     console.log(filteredList)

        //navigate to home
    // }

    return (
        <div className="Body">
<<<<<<< HEAD
            <Paper id='Mat'>
                <Paper id='Menu'>
                    {/* <CatNav filterCat={filterCat} /> */}
=======
            <div className='Mat'>
                <div className='Menu'>
>>>>>>> a8e4236350aaee404e69d3f2bfb23c7df5a3a0a3
                    <Paper id="recipeDetails">{recipe ?
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div>
                                <h1>{recipe.title}</h1>
                                <h3>{recipe.description}</h3>

                                <Card id="specs">
                                    <h3>Ingredients</h3>
                                    <ul>
                                        {recipe.ingredients.map((eachIng, idx) => (
                                            <li key={idx}>{eachIng.amount}{eachIng.measurement} {eachIng.name}</li>
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
                                
                                <p>
                                    <h3>Recipe History</h3>
                                    {recipe.story}
                                </p>
                                <Comments comments = {comments} handleCommentSubmit = {handleCommentSubmit}/>
                                

                            </div>
                            <img src={recipe["image"]} alt={recipe.title} style={{ height: '300px', width: '300px', backgroundColor: "aliceblue", padding: '5px' }} />
                        </div> :
                        <p>Not available</p>
                    }

                    </Paper>
                    </div>
            </div>
        </div>)
}

export default DetailsPage