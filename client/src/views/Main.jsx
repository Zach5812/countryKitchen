import React from 'react'
import {Card, Paper} from '@mui/material'


const Main = () => {
  return (
    <div className="Body">
    <Paper id ="Mat" elevation={4} >
      <Paper id="Menu" elevation={2} square='true' outlined>
      <div>
      <h1>Welcome to the Wartsbaugh family kitchen!</h1>
      <h3>Recipes from generations of home bakers</h3>
      </div>
      <div id="navbar">
        <Card id="navOption">Cookies</Card>
        <Card id="navOption">Cakes</Card>
        <Card id="navOption">Pies</Card>
        <Card id="navOption">Quick-breads</Card>

      </div>
      </Paper>
    </Paper>
    </div>
)
}

export default Main