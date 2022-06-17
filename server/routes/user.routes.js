const UserController = require("../controllers/user.controller");

module.exports = (app) => {
  app.post("/register", UserController.register);
  app.post("/login", UserController.login);
  app.post("/logout", UserController.logout);
  app.get("/api/users", UserController.getLoggedInUser);
  app.put("/api/users/claim/chores", UserController.updateUsersWithChores);
  app.get("/api/users/chores", UserController.getUserClaimedChores);
};
