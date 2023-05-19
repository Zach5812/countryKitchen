const RecipeController = require("../controllers/recipe.controller")

module.exports = (app)=>{
    app.get("/api/testing", RecipeController.apiTest);
    app.get("/api/recipes", RecipeController.allRecipe);
    app.get("/api/recipes/:id" , RecipeController.oneRecipe);
    app.post("/api/recipes", RecipeController.addRecipe);
    app.patch("/api/recipes/:id", RecipeController.updateRecipe);
    app.delete("/api/recipes/:id", RecipeController.deleteRecipe);
}