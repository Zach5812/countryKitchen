const mongoose = require("mongoose")
const Schema = mongoose.Schema

const IngredientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Ingredient name is required"],
        minlength: [2, "Ingredient name must be at least 3 characters"]
    },
    amount: {
        type: Number,
        required: [true, "Ingredient name is required"],
        min: [0, "Ingredient amount must be positive"]
    },
    measurement: {
        type: String,
        required: [true, "Measurement is required"],
        minlength: [1, "Measurement must be at least 1 character"]
    }
}, {timestamps: true})

const CommentSchema = new mongoose.Schema({
    comm: {
        type: String,
        required: [true, "Must type a comment"],
        minlength: [1, "Comment must have at least one character"],
        maxlength: [500, "Comment must have less than one character"]
    },
    rating: {
        type: Number,
        required: [true, "Ingredient name is required"],
        min: [0, "Ingredient amount must be positive"]
    },
    name: {
        type: String,
        required: [true, "Commenter name is required"],
        minlength: [1, "Name must be at least 1 character"]
    },
    recipe: {
        type:  Schema.Types.ObjectId,
        ref: "Recipe"
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
    image: {
        type: String,
        required: [false, "Image URL is required"]
    },
    description: {
        type: String,
        required: [true, "Please include a description"]
    },
    ingredients: [IngredientSchema],
    comments: [CommentSchema],
    methods: [{
        type: String,
        required: [true, "There must be at least one step in the method"]
    }],
    story: {
        type: String,
        required: [true, "Please include a story"]
    }
}, {timestamps: true})

module.exports.Recipe = mongoose.model('Recipe', RecipeSchema);
module.exports.Comment = mongoose.model('Comment', CommentSchema);