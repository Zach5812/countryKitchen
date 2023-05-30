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
            <Card id="navOption" elevation={8} value="cookies" onClick={e=>props.filterCat("cookies")}><span>Cookies and candies</span><img src={cookies}/></Card>
            <Card id="navOption" elevation={8}  value="cakes" onClick={e=>props.filterCat("cakes")}><span>Cakes and puddings</span><img src={cakes}/></Card>
            <Card id="navOption" elevation={8}  value="pies" onClick={e=>props.filterCat("pies")}><span>Pies and tarts</span><img src={pies}/></Card>
            <Card id="navOption" elevation={8}  value="quicks" onClick={e=>props.filterCat("quicks")}><span>Quick-breads</span><img src={quicks}/></Card>
            <Card id="navOption" elevation={8}  value="*" onClick={e=>props.filterCat("*")}><span>Everything</span><img src={all}/></Card>
            </div>

    )
}

export default CatNav