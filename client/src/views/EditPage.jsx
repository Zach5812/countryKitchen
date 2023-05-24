import React from 'react'
import { useParams } from 'react-router-dom'
import RecipeForm from '../components/RecipeForm'

const EditPage = () => {
    const { id } = useParams()
    return (
        <div>
            <h2>Edit this recipe!</h2>
            <RecipeForm submit={"Edit Recipe"} recipeID={id} post={"patch"} />
        </div>
    )
}

export default EditPage