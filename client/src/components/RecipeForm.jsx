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

    const handleIngredients = (e, idx) => {
        const copyIngre = [...ingredients]
        copyIngre[idx][e.target.name] = e.target.value
        setIngredients(copyIngre)
    }

    const handleMethods = (e, idx) => {
        const copyMethods = [...methods]
        copyMethods[idx] = e.target.value
        setMethods(copyMethods)
    }

    // // This variable will be used to reference the button to add html rows to our html
    // const addMethodsRowButton = document.getElementById("add_methods_row");

    // // this variable references the div with ingredients_container in it
    // const methodsContainer = document.getElementById("methods_container");

    // addMethodsRowButton.addEventListener("click", () => {

    //     // We are defining our actual row we want to input in
    //     const methodsRowHtml = `
    //     <div class="ingredients_row">
    //   <input type="text" name="ingredients" class="ingredients_input">
    //   <button type="button" class="remove_ingredients_row">X</button>
    // </div>`;
    //     // This searches our document for the ingredients container and inserts a row on click we use insertAdjacentHTML, giving it a position.
    //     // The string we gave it is our html variable we defined.  Before end places the the html as the last row
    //     methodsContainer.insertAdjacentHTML('beforeend', methodsRowHtml);
    // });

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
            <div id="methods_container">
                <label>Ingredients </label>
                {ingredients ? ingredients.map((eachIng, idx) => (
                    <div>
                        <input type="text" name="name" value={eachIng.name} onChange={e => handleIngredients(e, idx)} />
                        <input type="text" name="amount" value={eachIng.amount} onChange={e => handleIngredients(e, idx)} />
                        <input type="text" name="measurement" value={eachIng.measurement} onChange={e => handleIngredients(e, idx)} />
                    </div>
                )) :
                    <div>
                        <input type="text" name="name" value={ingreName} onChange={e => handleIngredients(e)} />
                        <input type="text" name="amount" value={ingreAmt} onChange={e => handleIngredients(e)} />
                        <input type="text" name="measurement" value={ingreMeasurement} onChange={e => handleIngredients(e)} />
                    </div>}
            </div>
            <div>
                <label>Methods </label>
                {methods ? methods.map((eachMeth, idx) => (
                    <div>
                        {idx + 1} <input type="text" value={eachMeth} onChange={e => handleMethods(e, idx)} />
                        <br />
                    </div>
                )) :
                    <input type="text" value={methods} onChange={e => setMethods(e.target.value)} />}
                {/* <button type="button" id="add_methods_row">+</button> */}
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