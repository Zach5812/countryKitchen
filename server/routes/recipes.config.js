//Controllers (CRUD):
const {Recipe} = require("../models/Recipe.model")
// all Recipes
module.exports.allRec = (req, res)=>{
    Recipe.find() // array of objects
        .then(exList => res.json(exList))
        .catch(err=>res.json(err))
}

// one Recipe
module.exports.oneRec = (req, res)=>{
    Recipe.findOne({_id: req.params.id}) // return the found object
        .then(foundRec => res.json(foundRec))
        .catch(err=>res.json(err))
}

// create Rec
module.exports.addRec = (req, res)=>{
    Recipe.create(req.body) // will return the created object
        .then(newRec => res.json(newRec))
        .catch(err=>res.json(err))
}


// update Rec -- create & getOne
module.exports.updateRec = (req, res)=>{
    Recipe.findOneAndUpdate(
        {_id: req.params.id},       // criteria
        req.body, // partial formData 
        {new: true, runValidators:true}
        // new: true -- return the updated object
        // runValidator -- to perform validation specified in model
    )
        .then(updatedRec =>res.json(updatedRec))
        .catch(err=>res.json(err))
}


// delete Rec
module.exports.deleteRec = (req, res)=>{
    Recipe.deleteOne({_id: req.params.id})
        .then(status=> res.json(status))
        .catch(err=>res.json(err))
}