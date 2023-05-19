const RecipeController = require("../controllers/store.controller")

module.exports = (app)=>{
    app.get("/api/testing", RecipeController.apiTest);
    app.get("/api/stores", RecipeController.allRecipe);
    app.get("/api/stores/:id" , RecipeController.oneRecipe);
    app.post("/api/stores", RecipeController.addRecipe);
    app.patch("/api/stores/:id", RecipeController.updateRecipe);
    app.delete("/api/stores/:id", RecipeController.deleteRecipe);
}