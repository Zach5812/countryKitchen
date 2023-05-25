import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const RecipeCard = (props) => {
    return (
        // <Box sx={{ width: 200 }} >
        <Link to={`/recipes/${props.recipe._id}`} style={{ textDecoration: "none" }}>
            <Card id="RecipeCard" sx={{ width: 200 }} elevation={8}>
                <React.Fragment>
                    <CardContent>
                        <img src={props.recipe["image"]} />
                        <Typography variant="h6" component="div">
                            {props.recipe["title"]}
                        </Typography>

                        <Typography variant="body2">
                            {props.recipe["description"].length<40?
                            <div>
                            {props.recipe["description"]}</div>:
                            <div>{props.recipe["description"].slice(0, 40) +"..."}</div>
}
                        </Typography>
                    </CardContent>
                </React.Fragment>
            </Card>
        </Link>
        // </Box>
    );
}

export default RecipeCard