module.exports = (app) => {
  const Hotels = require("../controllers/hotels.controller.js");
  var router = require("express").Router();
  const { authenticateRoute } = require("../authentication/authentication.js");

  // Create a new hotel
  router.post("/hotels/", [authenticateRoute], Hotels.create);
  // Retrieve all Hotels
  router.get("/hotels/", Hotels.findAll);

  // Retrieve all hotels for a Trip
  router.get(
    "/trips/:tripsId/hotels/",
    Hotels.findAllForTrips
  );
  // Retrieve all Recipe Ingredient for a Recipe Step and include the ingredients
  router.get(
    "/recipes/:recipeId/recipeSteps/:recipeStepId/recipeIngredientsWithIngredients/",
    RecipeIngredient.findAllForRecipeStepWithIngredients
  );

  // Retrieve a single Recipe Ingredient with id
  router.get(
    "/recipes/:recipeId/recipeIngredients/:id",
    RecipeIngredient.findOne
  );

  // Update a Recipe Ingredient with id
  router.put(
    "/recipes/:recipeId/recipeIngredients/:id",
    [authenticateRoute],
    RecipeIngredient.update
  );

  // Delete a Hotel with id
  router.delete("/hotels/:id", [authenticateRoute], Hotels.delete);
  // Delete all Hotels
  router.delete(
    "/hotels/",
    [authenticateRoute],
    Hotels.deleteAll
  );

  app.use("/travelapi", router);
};
