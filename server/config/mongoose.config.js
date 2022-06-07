const mongoose = require("mongoose");
const choresDB = "choresDB";

mongoose
  .connect(`mongodb://localhost/${choresDB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Connected to MongoDB ${choresDB}`);
  })
  .catch((err) => {
    console.log("DB Connection error", err);
  });
