import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, Paper } from '@mui/material';
// import Comments from '../components/Comments';
import CatNav from '../components/CatNav';

const DetailsPage = () => {
    const [recipe, setRecipe] = useState();
    // const [comments, setComments] = useState([]);
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

    // useEffect(() => {
    //     axios.get(`http://localhost:8000/api/recipes/${id}`)
    //         .then(response => {
    //             setComments(response.data.comments)
    //         })
    //         .catch(error => console.log(error))
    // }, [comments])



// setComments([...Comments, response.data])

    return (
        <div className="Body">
            <Paper id='Mat'>
                <Paper id='Menu'>
                    <button className="button" onClick={()=>navigate(-1)} style={{width:"fit-content",margin:"5px 0px 0px 10px"}}>Home</button>
                    <Paper id="recipeDetails">{recipe ?
                        <div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div>
                                    <Card id="specs" elevation={8}>
                                <h1>{recipe.title}</h1>
                                <h4><i>{recipe.description}</i></h4>
                                    </Card>

                                    <Card id="specs" className="specs" elevation={8}>
                                    <h3>Ingredients</h3>
                                    <ul>
                                        {recipe.ingredients.map((eachIng, idx) => (
                                                <li key={idx}>{eachIng.name}: {eachIng.amount} {eachIng.measurement}</li>
                                        ))}
                                    </ul>

                                    <br />

                                    <h3>Method</h3>
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
                                    </Card>
                                </div>
                                
                            </div>
                            <br />
                            <Card id="specs" elevation={8}>
                                    <h3>Recipe History</h3>
                                    {recipe.story}
                                
                                {/* <Comments comments = {comments} handleCommentSubmit = {handleCommentSubmit}/> */}
                                

                                {/* <Comments comments={comments} /> */}
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