const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();

// Routes
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use("/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
