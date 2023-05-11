// Include express from node_modules and define server related variables
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;

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

app.use(routes);

//add new restaurant
app.get("/restaurants/add", (req, res) => {
  return res.render("addRestaurant");
});

app.post("/restaurants/add", (req, res) => {
  const restaurant = req.body;
  return Restaurant.create(restaurant)
    .then(() => res.redirect("/"))
    .catch(error => console.log(error));
});

//update restaurant
app.get("/restaurants/:restaurantId/edit", (req, res) => {
  const restaurantId = req.params.restaurantId;
  return Restaurant.findById(restaurantId)
    .lean()
    .then(restaurant => res.render("edit", { restaurant }))
    .catch(error => console.log(error));
});

app.post("/restaurants/:restaurantId/edit", (req, res) => {
  const restaurantId = req.params.restaurantId;
  const restaurantNew = req.body;
  return Restaurant.findByIdAndUpdate(restaurantId, restaurantNew)
    .then(() => res.redirect(`/restaurants/${restaurantId}`))
    .catch(error => console.log(error));
});

//show restaurant
app.get("/restaurants/:restaurantId", (req, res) => {
  const restaurantId = req.params.restaurantId;
  Restaurant.find()
    .lean()
    .then(restaurants => {
      const restaurant = restaurants.find(
        restaurant => restaurant._id.toString() === restaurantId
      );

      res.render("show", { restaurant });
    })
    .catch(error => console.log(error));
});

//delete restaurant
app.post("/restaurants/:id/delete", (req, res) => {
  const id = req.params.id;
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect("/"))
    .catch(error => console.log(error));
});

// Listen the server when it started
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`);
});
