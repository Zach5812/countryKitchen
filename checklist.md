Exam Code: lJjyUqKA

create project folder: mkdir [project name]
cd [project name]
npx create-react-app client
in client folder: npm install axios react-router-dom

in project folder:
mkdir server
cd server
mkdir configs controllers models routes
type nul > server.js

npm init -y
npm install express dotenv mongoose cors

to run: nodemon server.js


****** .gitignore ******
    node_modules
    .env

********** server.js **********
const express = require("express");
const app = express();
require('dotenv').config();
require('./configs/mongoose.config');
const cors = require('cors')

app.use(cors())
app.use( express.json() );
app.use( express.urlencoded({ extended: true }) );

//update this with correct route
const Router = require("./routes/jokes.routes");
Router(app);

const server = app.listen(8000, () =>
  console.log(`Server is locked and loaded on port ${server.address().port}!`)
);


********** .env **********
ATLAS_USERNAME=dwartsbaugh
ATLAS_PASSWORD=U3BcFNtOSGDozkHV
DB= [database name]


********** mongoose.config.js **********
const mongoose = require('mongoose');
const dbName = process.env.DB;
const username = process.env.ATLAS_USERNAME;
const pw = process.env.ATLAS_PASSWORD;

//update this with the correct uri from mongo atlas if necessary
const uri=`mongodb+srv://${username}:${pw}@cluster0.sfkmqmp.mongodb.net/${dbName}?retryWrites=true&w=majority`

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Established a connection to the database"))
    .catch(err => console.log("Something went wrong when connecting to the database", err));


********** modelname.model.js **********
const mongoose = require('mongoose');

const AuthorSchema = new mongoose.Schema({
    //specific key:{specifics for the key}
    name:{
        type: String,
        required: [true,"Your author must have a name"],
        minlength: [3,"The name must be at least three characters"]
    }

},{timestamps:true})

module.exports = mongoose.model("Author",AuthorSchema)


********** modelnames.routes.js **********
const JokesController = require('../controllers/jokes.controller');

module.exports = app => {
    app.get('/api/jokes', JokesController.findAllJokes);
    app.get('/api/jokes/:id', JokesController.findOneJoke);
    app.post('/api/jokes', JokesController.newJoke);
    app.patch('/api/jokes/:id', JokesController.updateJoke);
    app.delete('/api/jokes/:id', JokesController.deleteJoke)
}



********** modelnames.controller.js **********
const Author = require('../models/author.model');

//The logic for all of the routes goes here
//get all
module.exports.findAllAuthors = (req,res) => {
    Author.find()
    .then((allAuthors) => {
        res.json(allAuthors)
    })
    .catch((err) => {
        res.status(400).json(err)
    })
}

//get one
module.exports.findOneAuthor = (req,res) => {
    Author.findOne({_id: req.params.id})
    .then(oneAuthor => {
        res.json(oneAuthor)
    })
    .catch((err) => {
        res.status(400).json(err)
    })
}

//create new
module.exports.newAuthor = (req,res) => {
    Author.create(req.body)
        .then(newlyAddedAuthor => {
            res.json(newlyAddedAuthor)
        })
        .catch((err) => {
            res.status(400).json(err)
        })
}

//update
module.exports.updateAuthor = (req,res) => {
    Author.findOneAndUpdate(
        {_id: req.params.id},
        req.body,
        {new:true, runValidators:true}
    )
    .then(updatedAuthor => {
        res.json(updatedAuthor)
    })
    .catch((err) => {
        res.status(400).json(err)
    })
}

//delete
module.exports.deleteAuthor = (req,res) => {
    Author.deleteOne({_id:req.params.id})
        .then(result => {
            res.json({result: result})
        })
        .catch((err) => {
            res.status(400).json(err)
        })
}



************* FRONT END *************
create views

set routes in App.js
import {Routes, Route} from 'react-router-dom'
import components
<Routes>
    <Route path="/dashboard" element={<DashboardPage />} />
    <Route path="/destinations/new" element={<CreatePage />} />
    <Route path="/destinations/:id" element={<DetailsPage />} />
    <Route path="/destinations/:id/edit" element={<UpdatePage />} />
</Routes>

INDEX.JS
import {BrowserRouter} from 'react-router-dom'
wrap the app in BrowserRouter 

DASHBOARD
axios
useEffect
useState

const [destList, setDestList] = useState([])

useEffect(()=>{
    axios.get('http://localhost:8000/api/destinations')
        .then(response=>{
            setDestList(response.data);
        })
        .catch(err=>console.log(err))
}, [])


**for links that refer to (e.g.) id:
<Link to={`/destinations/${eachDest._id}`}>

FOR FORMS
//This uses logic to redirect on successful submission
import {useNavigate} from 'react-router-dom'

const navigate = useNavigate()

const handleSubmit=(e)=>{
    e.preventDefault();
    axios.post(`http://localhost:8000/api/destinations`, {location, rating, imageUrl, season})
    .then(response=>{
        console.log(response.data)
        navigate('/dashboard')  //logic after successful create
    })
}


---When refreshing the DOM based on form input---

-Main-
const addToDom = (newDest) =>{
    setDestList([...destList, newDest])
}

<CreateForm onCreate = {addToDom}/>

on CreateForm change the logic of the navigate to props.onCreate(response.data)



FOR SHOW PAGE
import {useEffect, useState} from 'react'
import useParams from 'react-router-dom'
import axios from 'axios'

const {id} = useParams();
const[dest, setDest] = useState()

useEffect(()=>{
    axios.get(`http://localhost:8000/api/destinations/${id}`)
        .then(response=>{
            setDest(response.data)
        })
        .catch(err=>console.log(err))
},[id])
return (
    <div>
    {
        dest?
            <div>
                <h1>{dest.location}</h1>
                <h3>Rating: {dest.rating}</h3>
                <img src={dest.imageUrl} alt={dest.location}>
            </div>:
            <h1> Loading...</h1>
        }
    <Link to="/dashboard"> Home </Link>
</div>)

*****UPDATE PAGE*****
Update (create + details)
1. Get id from params
2. Use the ID to get data from api
3. Display info on load
4. Form input
5. Send input to API
6. Logic after submit: redirect: useNavigate

import {useEffect, useState} from React
import axios from "axios"
import {useParams, useNavigate } from 'react-router-dom'

const UpdatePage = () => {
    const {id} = useParams()

    useEffect(() => {
        axios.get(`http://localhost:8000/api/destinations/${id}`)
            .then(response => {
                const tempVariable = response.data
                setLocation(tempVariable.location);
                setRating(tempVariable.rating);
                setImageUrl(tempVariable.imageUrl);
            })
            .catch(err => console.log(err))
    },[id])

    const handleSubmit=(e)=>{
        e.preventDefault();
        axios.patch(`http://localhost:8000/api/destinations/${id}`, {location,rating,imageUrl})
            .then(response=>{
                console.log(response.data)  //checking that the data got in
                navigate(`/destinations/${id}`)  //redirect to the details page
            })
            .catch(err=>console.log(err))
    }

    return(
        <div>
        Copy in create form.

        
        </div>
    )
}



***DELETE
1. Get id from params
2. Send to API to delete
3. Logic after delete

---On Edit Page (redirect to dashboard after delete)---
const handleDelete = ()=>{
    axios.delete(`http://localhost:8000/api/destinations/${id}`)
        .then(response=>{
            //logic after delete
            navigate(`/dashboard`)
        })
        .catch(err=>console.log(err))
        
}

---On dashboard page (where you don't get the id from params)---
const handleDelete = (deleteId) => {
    axios.delete(`http://localhost:8000/api/destinations/${deleteId}`)
        .then(response => {
            removeFromDom(deleteId)
        })
}

const removeFromDom = (deleteId) =>{
    const filteredList = destList.filter((eachDest)=>eachDest._id !== deleteId)
    setDestList(filteredList)
}

//this isn't necessarily code for the Delete button. If you're passing in an argument, then it needs to be an arrow function. If you aren't passing in an argument, you can just call the function (onClick={handleDelete})
<button onClick={() => handleDelete(deleteId)}>Delete</button>


***** DELETE BUTTON *****
import React from 'react'
import axios from "axios"


const DeleteButton = (props) => {

    const handleDelete = () => {
        axios.delete(`http://localhost:8000/api/authors/${props.deleteId}`)
            .then(response => {
                props.onDelete(props.deleteId)
            })
            .catch(err => console.log(err))
    }

    return(
        <button onClick={handleDelete}>Delete</button>
    )
}

export default DeleteButton



---Authors Main Page---

import React, {useEffect, useState} from 'react'
import axios from 'axios'
import CreateForm from '../components/CreateForm'
import AuthorsList from '../components/AuthorsList'

const MainPage = () => {
  const [authList, setAuthList] = useState([])


  useEffect(()=>{
    axios.get('http://localhost:8000/api/authors')
        .then(response=>{
            setAuthList(response.data);
        })
        .catch(err=>console.log(err))
}, [])

  const addToDom = (newAuth) => {
    setAuthList([...authList, newAuth])
  }



const removeFromDom = (deleteId) =>{
  const filteredList = authList.filter((eachAuth)=>eachAuth._id !== deleteId)
  setAuthList(filteredList)
}

  return (
    <div>
      <h1>Favorite Authors</h1>
      <AuthorsList
        authList={authList} 
        onDelete={removeFromDom}/>
    </div>
  )
}

export default MainPage





---ToDo List---

-Container-
import React, {useState} from 'react'
import Form from '../components/Form'
import Display from '../components/Display'

const Container = () => {

    const [taskList, setTaskList]= useState([])

    const addTask = (newTask) => {
        setTaskList([...taskList,newTask])
        // console.log(boxList)
    }

    const handleIsDone = (idx, updateBool)=>{
        const updatedList = [...taskList];
        updatedList[idx].isDone = updateBool;
        setTaskList(updatedList);
    }

    const handleDelete = (deleteIdx) =>{
        const filteredList = taskList.filter((eachTask, idx) => idx !== deleteIdx);
        setTaskList(filteredList);
    }

  return (
    <div>
        <Form onCreate={addTask}/>
        <Display
        taskList={taskList}
        onToggle={handleIsDone}
        onDelete={handleDelete}/>
    </div>
  )
}

export default Container


-Form-
import React, { useState } from 'react'

const Form = (props) => {

const [task,setTask]=useState("")
const [isDone,setIsDone]=useState(false)

const handleSubmit= (e) => {
    e.preventDefault();
    const newTask = {task}
    props.onCreate(newTask)
}


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>New task: </label>
                    <input type="text" onChange={(e) => setTask(e.target.value)} />
                </div>
                <button type="submit" style={{backgroundColor:"blue",color:"white"}}>Add task</button>

            </form>
        </div>
    )
}

export default Form


-Display-
import React from 'react'

const Display = (props) => {
  return (
    <ul>{props.taskList.map((eachTask, idx) => (
        <li key={idx} style={eachTask.isDone?{textDecoration:"line-through",listStyle:"none"}:{textDecoration:"none",listStyle:"none"} }> 
        {eachTask.task}
        <input type="checkbox" checked={eachTask.isDone}
        onChange={(e)=>props.onToggle(idx,e.target.checked)} />
        <button style={{backgroundColor:"black", color:"white"}}onClick={()=>props.onDelete(idx)}>Delete task</button></li>
        )
  )}
</ul>)
}

export default Display