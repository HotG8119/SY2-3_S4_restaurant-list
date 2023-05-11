const express = require("express");
const router = express.Router();

const Restaurant = require("../../models/restaurant");

//add new restaurant
router.get("/add", (req, res) => {
  return res.render("addRestaurant");
});

router.post("/add", (req, res) => {
  const restaurant = req.body;
  return Restaurant.create(restaurant)
    .then(() => res.redirect("/"))
    .catch(error => console.log(error));
});

//update restaurant
router.get("/:restaurantId/edit", (req, res) => {
  const restaurantId = req.params.restaurantId;
  return Restaurant.findById(restaurantId)
    .lean()
    .then(restaurant => res.render("edit", { restaurant }))
    .catch(error => console.log(error));
});

router.post("/:restaurantId/edit", (req, res) => {
  const restaurantId = req.params.restaurantId;
  const restaurantNew = req.body;
  return Restaurant.findByIdAndUpdate(restaurantId, restaurantNew)
    .then(() => res.redirect(`/restaurants/${restaurantId}`))
    .catch(error => console.log(error));
});

//show restaurant
router.get("/:restaurantId", (req, res) => {
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
router.post("/:id/delete", (req, res) => {
  const id = req.params.id;
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect("/"))
    .catch(error => console.log(error));
});

module.exports = router;
