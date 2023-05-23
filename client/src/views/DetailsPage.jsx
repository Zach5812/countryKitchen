import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';

const DetailsPage = () => {
    const [recipe, setRecipe] = useState();

    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/recipes/${id}`)
            .then(response => {
                setRecipe(response.data)
            })
            .catch(error => console.log(error))
    }, [id])

    return (
        <div id='Mat'>
        <div id='Menu'>{recipe ?
            <div> <h1>{recipe.title}</h1>
                <h3>{recipe.description}</h3>

                <p>
                    <h3>Ingredients</h3>
                    {recipe.ingredients.map((eachIng, idx) => (
                        <p key={idx}>{eachIng.amount}{eachIng.measurement} {eachIng.name}</p>
                    ))}
                </p>
                <br />

                <p>
                    <h3>Methods</h3>
                    {recipe.methods.map((eachMeth, idx) => (
                        <p key={idx}>{idx + 1}. {eachMeth}</p>
                    ))}
                </p>
                <br />
                <p>
                    <h3>Recipe History</h3>
                    {recipe.story}
                </p>
<br />

            </div> :
            <p>Not available</p>
        }</div>
    </div>)
}

export default DetailsPage