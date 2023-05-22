import React, {useState,useEffect} from 'react'
import axios from 'axios'
import RecipeCard from './RecipeCard'

const ListBoard = (props) => {


    return (

        <div id='recipeCat'>
            {/* <RecipeCard/>
            <RecipeCard/>
            <RecipeCard/>
            <RecipeCard/>
            <RecipeCard/>
            <RecipeCard/> */}

            {props.recipeList.length>0?
            props.recipeList.map((eachRecipe,idx) => (
                <RecipeCard key={idx} recipe={eachRecipe}/>
            )):
        <div style={{textAlign:"center"}}>
            <h1>Welcome to the Wartsbaugh family kitchen!</h1>
            <h3>Recipes from generations of home bakers</h3>
        </div>
        }


        </div>
    )
}

export default ListBoard