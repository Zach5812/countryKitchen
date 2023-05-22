import React, {useState} from 'react'
import { Card } from '@mui/material'
import cakes from '../images/cakes.png'
import cookies from '../images/cookies.png'
import pies from '../images/pies.png'
import quicks from '../images/quickbreads.png'
import all from '../images/everything.jpg'

const CatNav = (props) => {

    return (
            <div id="navbar">            
            <Card id="navOption" value="cookies" onClick={e=>props.filterCat("cookies")}>Cookies and candies<img src={cookies}/></Card>
            <Card id="navOption" value="cakes" onClick={e=>props.filterCat("cakes")}>Cakes and puddings<img src={cakes}/></Card>
            <Card id="navOption" value="pies" onClick={e=>props.filterCat("pies")}>Pies and tarts<img src={pies}/></Card>
            <Card id="navOption" value="quicks" onClick={e=>props.filterCat("quicks")}>Quick-breads<img src={quicks}/></Card>
            <Card id="navOption" value="*" onClick={e=>props.filterAll("*")}>Everything<img src={all}/></Card>
            </div>

    )
}

export default CatNav