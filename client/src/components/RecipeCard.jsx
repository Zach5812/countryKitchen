import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import cuttingboard from '../images/cuttingboard.png';

const RecipeCard = (props) => {
    return (
        <Box sx={{ width: 200 }} >
            <Card variant="outlined" id="RecipeCard">
            <React.Fragment>
        <CardContent>
            <img src={cuttingboard} style={{height:'200px',width:'140px'}}/>
            <Typography variant="h6" component="div">
                {props.recipe["title"]}
            </Typography>

            <Typography variant="body2">
            {props.recipe["description"]}

            </Typography>
        </CardContent>
        <CardActions>
            <Button size="small"><Link to={`/recipes/${props.id}`} style={{textDecoration:"none"}}>See the recipe</Link></Button>
        </CardActions>
    </React.Fragment>
            </Card>
        </Box>
    );
}

export default RecipeCard