const User = require('../models/user.model');

const create = async (req, res) => {
    try {
        req.session.user = await User.create(req.body);
        await req.session.save();
        return res.json(req.session.user);
    } catch (error) {
        return res.status(400).json(error);
    }
}

const allUser = (req, res)=>{
    User.find() // array of objects
        .then(exList => res.json(exList))
        .catch(err=>res.json(err))
}

const delUser = (req, res)=>{
    User.deleteOne({_id: req.params.id}) // array of objects
        .then(status => res.json(status))
        .catch(err=>res.json(err))
}


module.exports = { create, allUser, delUser };