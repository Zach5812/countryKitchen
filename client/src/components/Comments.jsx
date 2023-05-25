import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import StarRating from './StarRating';
import ReadStarRating from './ReadStarRating';

const Comments = (props) => {
    const [newComment, setNewComment] = useState("");
    const [comm, setComm] = useState("")
    const [name, setName] = useState("")
    const [rating, setRating] =useState(0)

    const handleCommentSubmit = (e)=>{
        e.preventDefault();
        axios.patch(`http://localhost:8000/api/recipes/comments/${props.id}`, {comm, name, rating})
        .then(response=>{
                props.addToDom(response.data)
                setComm("")
                setName("")
                setRating(0)
        })
        .catch(error=> console.log(error))
        }
    


    return (
        <div>
            {props.comments?
            <div>
                <h3 style={{marginTop:'30px',marginBottom:'0px'}}>Comments</h3>
                {props.comments.map((eachComment, idx) => (
                    <div key={idx}>
                        <div style={{display: "flex"}}>

                    <p style={{fontWeight: "bold", marginBottom:'5px'}}>{eachComment.name}</p>
                    <p style={{alignSelf: "center",marginBottom:'5px'}}><ReadStarRating value={eachComment.rating}/></p>
                    </div>
                    <p style={{marginTop:'0px',marginBottom:'0px',paddingBottom:'20px'}}>{eachComment.comm}</p>
                    </div>))}
                <form onSubmit={handleCommentSubmit} style={{marginTop:'16px'}}>
                    <div><label>Comment: </label>
                    <input type="text" name="" id="" value={comm}
                        onChange={e=>setComm(e.target.value)}/></div>
                    <div><label>Your Name: </label>
                        <input type="text" name="" id="" value={name}
                        onChange={e=>setName(e.target.value)}/></div><br/>
                        <label><i>Please rate it if you made it!</i> </label>
                        <StarRating value={rating} setValue={setRating} onChange={e=>setRating(e.target.value)}/>
                    <button type='submit' style={{marginTop:'10px'}}>Add a Comment</button>
                </form>
            </div>:
            <div>Add a comment</div>} 

        </div>
    )
}

export default Comments