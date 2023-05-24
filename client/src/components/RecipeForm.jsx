import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const RecipeForm = (props) => {
    const { id } = useParams()

    const navigate = useNavigate()

    const [title, setRecipeTitle] = useState("")
    const [category, setCategory] = useState("")
    const [description, setDescription] = useState("")
    const [ingredients, setIngredients] = useState([])
    const [methods, setMethods] = useState([])
    const [story, setStory] = useState("")
    const [errors, setErrors] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault();
        //send formdata to api
        axios[props.post](`http://localhost:8000/api/recipes/${props?.recipeID}`, { title, category, description })
            .then(response => {
                navigate(`/recipes/${response.data._id}`)
            })
            .catch(err => {
                const errResponse = err.response.data.errors
                const errorArr = []
                for (const key of Object.keys(errResponse)) { // Loop through all errors and get the messages
                    errorArr.push(errResponse[key].message)
                }
                // Set Errors
                setErrors(errorArr)
            })
    }

    useEffect(() => {
        axios.get(`http://localhost:8000/api/recipes/${id}`)
            .then(response => {
                const recipe = response.data
                setRecipeTitle(recipe.title)
                setCategory(recipe.category)
                setDescription(recipe.description)
                setIngredients(recipe.ingredients)
                setMethods(recipe.methods)
                setStory(recipe.story)
            })
            .catch(err => console.log(err))
    }, [id])

    return (
        <form onSubmit={handleSubmit}>
            {errors.map((err, index) => <p key={index}>{err}</p>)}
            <div>
                <label>Recipe Title </label>
                <input type="text" name="title" value={title} onChange={e => setRecipeTitle(e.target.value)} />
            </div>
            <div>
                <label>Category </label>
                <input type="text" name="category" value={category} onChange={e => setCategory(e.target.value)} />
            </div>
            <div>
                <label>Description </label>
                <input type="text" name="description" value={description} onChange={e => setDescription(e.target.value)} />
            </div>
            <div>
                <label>Ingredients </label>
                <input type="text" name="ingredients" value={ingredients} onChange={e => setIngredients(e.target.value)} />
            </div>
            <div>
                <label>Methods </label>
                {/* <input type="text" name="methods" value={methods} onChange={e => setMethods(e.target.value)} /> */}
                <textarea name="methods" id="methods" value={methods} cols="30" rows="10"/>
            </div>
            <div>
                <label>Story </label>
                {/* <input type="text" name="story" value={story} onChange={e => setStory(e.target.value)} /> */}
                <textarea name="story" id="story" value={story} cols="30" rows="10"/>
            </div>
            <button type="submit">{props.submit}</button>
        </form>
    )
}

export default RecipeForm