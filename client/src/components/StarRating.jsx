import React, {useState} from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
export default function StarRating(props) {
    return (
        <Box
            sx={{
                "& > legend": { mt: 2 },
            }}
        >
            <Rating
                name="simple-controlled"
                value={props.value}
                onChange={(event, newValue) => {
                    props.setValue(newValue);
                }}
            />
        </Box>
    );
}