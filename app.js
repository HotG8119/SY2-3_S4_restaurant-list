// Include express from node_modules and define server related variables
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;

const methodOverride = require("method-override");
const routes = require("./routes");
// setting mongoose
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", () => {
  console.log("mongodb error!");
});
db.once("open", () => {
  console.log("mongodb connected!");
});

// require express-handlebars here
const exphbs = require("express-handlebars");
const Restaurant = require("./models/restaurant");

// setting template engine
app.engine("hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");

// setting static files
app.use(express.static("public"), express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(routes);

// Listen the server when it started
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`);
});
