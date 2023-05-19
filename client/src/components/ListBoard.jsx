import React from 'react'
import RecipeCard from './RecipeCard'

const ListBoard = () => {
    return (
        // <div>
        //     <h1>Welcome to the Wartsbaugh family kitchen!</h1>
        //     <h3>Recipes from generations of home bakers</h3>
        // </div>
        <div id='recipeCat'>
            <RecipeCard/>
            <RecipeCard/>
            <RecipeCard/>
            <RecipeCard/>
            <RecipeCard/>
            <RecipeCard/>


        </div>
    )
}

export default ListBoard