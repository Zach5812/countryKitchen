import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Comments = (props) => {
    const [newComment, setNewComment] = useState("");

    if (newComment === ""){
        return;
    }

    const handleCommentSubmit = (e)=>{
        e.preventDefault();
        axios.patch(`http://localhost:8000/api/recipes/comments/${id}`, {comm})
        .then(response=>{
            .then()
            .catch(error=> console.log(error))
        })
    }

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