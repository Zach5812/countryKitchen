import React from 'react'
import {Card, Paper} from '@mui/material'
import CatNav from '../components/CatNav'
import ListBoard from '../components/ListBoard'


const Main = () => {
  return (
    <div className="Body">
    <Paper id ="Mat" elevation={4} >
      <Paper id="Menu" elevation={2} square='true' outlined>
        <CatNav/>
        <ListBoard/>


      </Paper>
    </Paper>
    </div>
)
}

export default Main