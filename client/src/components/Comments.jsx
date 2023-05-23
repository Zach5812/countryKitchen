import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Comments = (props) => {

    return (
        <div>
            {props.comments?
            <div>
                <h3>Comments</h3>
                {props.comments.map((eachComment, idx) => (
                    <p key={idx}>{eachComment.name}</p>
                    ))}
                    {props.comments.map((eachComment, idx) => (
                    <p key={idx}>{eachComment.rating}</p>
                    ))} 
                    {props.comments.map((eachComment, idx) => (
                    <p key={idx}>{eachComment.comm}</p>
                    ))} 
            </div>:
            <div>Add a comment</div>} 

        </div>
    )
}

export default Comments