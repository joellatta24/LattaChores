const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("./config/mongoose.config");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

require("./routes/chore.routes")(app);
require("./routes/user.routes")(app);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
