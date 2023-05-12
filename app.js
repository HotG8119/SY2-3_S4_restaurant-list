// Include express from node_modules and define server related variables
const express = require("express");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const methodOverride = require("method-override");

const routes = require("./routes");
require("./config/mongoose");

const app = express();
const port = 3000;

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
