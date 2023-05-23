import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, Paper } from '@mui/material';

const DetailsPage = () => {
    const [recipe, setRecipe] = useState();
    const [comments, setComments] = useState([]);

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

    // const handleCommentSubmit = (e)=>{
    //     e.preventDefault();
    //     axios.patch(`http://localhost:8000/api/${id}`, {comments})
    //     .then(reponse=>{
    //         addComment(reponse.data)
    //         .catch(error=> console.log(error))
    //     })
    // }

    // const addComment = 

    return (
        <div className="Body">
            <div className='Mat'>
                <div className='Menu'>
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
                                <br />
                                <p>
                                    <h3>Recipe History</h3>
                                    {recipe.story}
                                </p>
                                <br />

                            </div>
                            <img src={recipe["image"]} alt={recipe.title} style={{ height: '300px', width: '300px', backgroundColor: "aliceblue", padding: '5px' }} />
                        </div> :
                        <p>Not available</p>
                    }

                    </Paper></div>
            </div>
        </div>)
}

export default DetailsPage