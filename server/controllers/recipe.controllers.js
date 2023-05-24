
//Controllers (CRUD):
const {Recipe, Comment} = require("../models/recipes.models")
// all Recipes
module.exports.allRecipe = (req, res)=>{
    Recipe.find() // array of objects
        .then(exList => res.json(exList))
        .catch(err=>res.json(err))
}

// one Recipe
module.exports.oneRecipe = (req, res)=>{
    Recipe.findOne({_id: req.params.id}) // return the found object
        .then(foundRecipe => res.json(foundRecipe))
        .catch(err=>res.json(err))
}

// create Rec
module.exports.addRecipe = (req, res)=>{
    Recipe.create(req.body) // will return the created object
        .then(newRecipe => res.json(newRecipe))
        .catch(err=>res.json(err))
}


// update Rec -- create & getOne
module.exports.updateRecipe = (req, res)=>{
    Recipe.findOneAndUpdate(
        {_id: req.params.id},       // criteria
        req.body, // partial formData 
        {new: true, runValidators:true}
        // new: true -- return the updated object
        // runValidator -- to perform validation specified in model
    )
        .then(updatedRecipe =>res.json(updatedRecipe))
        .catch(err=>res.json(err))
}

module.exports.addComment = async(req, res) => {
    try{
        console.log("Tried it")
        // add comment into Comment
        const newComment = new Comment(req.body)
        newComment.recipe = req.params.id
        console.log("Tried it2")
        await newComment.save()
        // pushing the newly added comment into Recipe
        const foundRecipe = await Recipe.findOne({_id:req.params.id})
        foundRecipe.comments.push(newComment)
        await foundRecipe.save()
        console.log("Tried it3")
        res.json(newComment)
    }catch(err){
        console.log("Error message")
        res.status(400).json(err)
    }

}


// delete Rec
module.exports.deleteRecipe = (req, res)=>{
    Recipe.deleteOne({_id: req.params.id})
        .then(status=> res.json(status))
        .catch(err=>res.json(err))
}