import React, { useEffect, useState } from 'react'

import { Link, useParams, useNavigate } from 'react-router-dom';

import axios from 'axios';
import { Card, Grid, Paper } from '@mui/material';
import Comments from '../components/Comments';

import { useAppContext } from '../libs/context';


const DetailsPage = () => {
    const { loggedUser, setLoggedUser } = useAppContext();
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
    }, [])

    useEffect(() => {
        if (!loggedUser) {
          axios.get("http://localhost:8000/api/auth", { withCredentials: true })
            .then(res => setLoggedUser(res.data))
            .catch(_ => navigate("/"));
        }
      }, [])

    const edit = () => {
        navigate(`/recipes/edit/${id}`)
    }

    const addComment = (newComment) => {
        setComments([...comments, newComment])
    }

    const handleClickScroll = () => {
        const comment = document.getElementById('comments');
        if (comment) {
            // 👇 Will scroll smoothly to the top of the next section
            comment.scrollIntoView({ behavior: 'smooth' });
        }
    };
    const jumpRecipe = () => {
        const top = document.getElementById('title');
        if (top) {
            // 👇 Will scroll smoothly to the top of the next section
            top.scrollIntoView({ behavior: 'smooth' });
        }
    };
    const jumpStory = () => {
        const story = document.getElementById('story');
        if (story) {
            // 👇 Will scroll smoothly to the top of the next section
            story.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="Body">
            <Paper id='Mat'>
                <div className='adminOptions' style={{ alignSelf: 'flex-start', marginLeft: '20px' }}>
                    <button onClick={edit}>Edit Recipe Details</button>
                </div>
                <div id='jump'>
                    <button className="button" onClick={() => navigate(-1)}>Back</button>

                    <button className="btn-scroll" onClick={handleClickScroll}>
                        Comments
                    </button>
                    <br />
                    <button className="btn-scroll" onClick={jumpRecipe}>
                        Recipe
                    </button>
                    <br />
                    <button className="btn-scroll" onClick={jumpStory}>
                        Story
                    </button>
                </div>
                <Paper id='Menu'>
                    <Paper id="recipeDetails">{recipe ?
                        <div>
                            <div id="recipeTop" style={{ display: "flex", justifyContent: "space-between" }}>
                                <div>
                                    <Card id="specs" elevation={8}>
                                        <h1 id='title'>{recipe.title}</h1>
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

                                        <h3 id='method'>Method</h3>
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
                                        {loggedUser?.username ?
                                            <div className="adminOptions" >
                                                <button onClick={edit}>Edit Recipe Details</button>
                                            </div>
                                            : null
                                        }

                                    </Card>
                                </div>
                            </div>
                            <br />
                            <Card id="specs" elevation={8}>
                                <h3 id='story'>Recipe History</h3>
                                {recipe.story}
                                <div id='comments'>
                                    <Comments addToDom={addComment} comments={comments} id={id} />
                                </div>
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