import React, {useState} from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
export default function ReadStarRating(props) {
    return (
        <Box
            sx={{
                "& > legend": { mt: 2 },
            }}
        >
            <Rating
                name="read-only"
                value={props.value}
            />
        </Box>
    );
}