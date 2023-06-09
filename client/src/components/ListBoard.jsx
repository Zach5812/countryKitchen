import React, {useState,useEffect} from 'react'
import axios from 'axios'
import RecipeCard from './RecipeCard'

const ListBoard = (props) => {


    return (
        props.recipeList.length===0?
        <div id='welcome'>
            <h1>Welcome to the Wartsbaugh family kitchen!</h1>
            <h3><i>Recipes from generations of home bakers</i></h3>
        </div>:
        <div id='recipeCat'>
            {props.recipeList.map((eachRecipe,idx) => (
                <RecipeCard key={idx} recipe={eachRecipe}/>
            ))}
            
        </div>
    )
}

export default ListBoard