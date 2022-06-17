const ChoreController = require("../controllers/chore.controller");

module.exports = (app) => {
  app.get("/api/chores", ChoreController.getChores);
  app.post("/api/chores", ChoreController.createChore);
  app.get("/api/chores/:id", ChoreController.getChoreById);
  app.put("/api/chores/:id", ChoreController.updateChore);
  app.delete("/api/chores/:id", ChoreController.deleteChore);
};
