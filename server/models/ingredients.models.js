const mongoose = require("mongoose")

const RecipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Ingredient name is required"],
        minlength: [2, "Ingredient namea must be at least 3 characters"]
    },
    amount: {
        type: Number,
        required: [true, "Ingredient name is required"],
        minlength: [2, "Ingredient namea must be at least 3 characters"]
    },
    measurement: {
        type: String,
        required: [true, "Measurement is required"],
        minlength: [2, "Measurement must be at least 3 characters"]
    }
}, {timestamps: true})

module.exports.Ingredient = mongoose.model('Ingredient', RecipeSchema);