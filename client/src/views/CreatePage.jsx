import React from 'react'
import RecipeForm from '../components/RecipeForm'

const CreatePage = () => {
  return (
    <div>
      <h2 style={{textAlign:  "center"}}>Add a new recipe</h2>
      <RecipeForm submit={"Add a new Recipe"} recipeID={""} post={"post"}/>
    </div>
  )
}

export default CreatePage