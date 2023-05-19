const mongoose = require("mongoose")

const IngredientSchema = new mongoose.Schema({
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

const RecipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        minlength: [3, "Title must be at least 3 characters"]
    },
    category: {
        type: String,
        required: [true, "Recipe category is required"]
    },
    description: {
        type: String,
        required: [true, "Please include a description"]
    },
    ingredients: [IngredientSchema],
    methods: [{
        type: String,
        required: [true, "There must be at least one step in the method"]
    }],
    story: {
        type: String,
        required: [true, "Please include a story"]
    },
    comments: [{
        type: String,
        required: [false]
    }]
}, {timestamps: true})

module.exports.Recipe = mongoose.model('Recipe', RecipeSchema);