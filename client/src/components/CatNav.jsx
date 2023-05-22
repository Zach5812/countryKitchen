import React, {useState} from 'react'
import { Card } from '@mui/material'

const CatNav = (props) => {
    const [category,setCategory] = useState("")

    return (
        <div id="navbar">
            <Card id="navOption" value="cookies" onClick={e=>props.filterCat("cookies")}>Cookies and candies</Card>
            <Card id="navOption" value="cakes" onClick={e=>props.filterCat("cakes")}>Cakes and puddings</Card>
            <Card id="navOption" value="pies" onClick={e=>props.filterCat("pies")}>Pies and tarts</Card>
            <Card id="navOption" value="quicks" onClick={e=>props.filterCat("quicks")}>Quick-breads</Card>

        </div>
    )
}

export default CatNav