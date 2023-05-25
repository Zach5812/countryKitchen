import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const RecipeForm = (props) => {
    const [title, setRecipeTitle] = useState("")
    const [category, setCategory] = useState("")
    const [description, setDescription] = useState("")
    const [ingredients, setIngredients] = useState([])
    const [ingreName, setIngreName] = useState("")
    const [ingreAmt, setIngreAmt] = useState("")
    const [ingreMeasurement, setIngreMeasurement] = useState("")
    const [methods, setMethods] = useState([])
    const [story, setStory] = useState("")
    const [image, setImage] = useState("")
    const [errors, setErrors] = useState([])

    const { id } = useParams()

    const navigate = useNavigate()



    const handleSubmit = (e) => {
        e.preventDefault();
        //send formdata to api
        axios[props.post](`http://localhost:8000/api/recipes/${props?.recipeID}`, { title, category, description, ingredients, methods, story })
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
                // setIngreName(recipe.ingredients.name)
                // setIngreAmt(recipe.ingredients.amount)
                // setIngreMeasurement(recipe.ingredients.measurement)
                setMethods(recipe.methods)
                setStory(recipe.story)
                setImage(recipe.image)
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
                <select name="category" value={category} onChange={e => setCategory(e.target.value)}>
                    <option hidden> Please select a category</option>
                    <option value="cookies"> Cookies</option>
                    <option value="cakes"> Cakes</option>
                    <option value="pies"> Pies</option>
                    <option value="quicks"> Quick Breads</option>
                </select>
            </div>
            <div>
                <label>Description </label>
                <input type="text" name="description" value={description} onChange={e => setDescription(e.target.value)} />
            </div>
            <div>
                <label>Ingredients </label>
                {ingredients ? ingredients.map((eachIng, idx) => (
                    // <li key={idx}>{eachIng.name}: {eachIng.amount} {eachIng.measurement}</li>
                    // <h1>{eachIng.name}</h1>
                    <div>
                        <input type="text" value={eachIng.name} onChange={e => setIngreName(e.target.value)} />
                        <input type="text" value={eachIng.amount} onChange={e => setIngreAmt(e.target.value)} />
                        <input type="text" value={eachIng.measurement} onChange={e => setIngreMeasurement(e.target.value)} />
                    </div>
                )) :
                    <div>
                        <input type="text" value={ingreName} onChange={e => setIngreName(e.target.value)} />
                        <input type="text" value={ingreAmt} onChange={e => setIngreAmt(e.target.value)} />
                        <input type="text" value={ingreMeasurement} onChange={e => setIngreMeasurement(e.target.value)} />
                    </div>}
            </div>
            <div>
                <label>Methods </label>
                {methods ? methods.map((eachMeth, idx) => (
                    <div>
                        {idx+1} <input type="text" value={eachMeth} onChange={e => setMethods(e.target.value)} />
                        <br />
                    </div>
                )) :
                    <input type="text" value={methods} onChange={e => setMethods(e.target.value)} />}
                {/* <textarea name="methods" id="methods" value={methods} cols="30" rows="10" /> */}
            </div>
            <div>
                <label>Story </label>
                <textarea name="story" id="story" value={story} cols="30" rows="10" onChange={e => setStory(e.target.value)} />
            </div>
            <div>
                <label>Image URL </label>
                <input type="text" name="image" value={image} onChange={e => setImage(e.target.value)} />
            </div>
            <button type="submit">{props.submit}</button>
        </form>
    )
}

export default RecipeForm