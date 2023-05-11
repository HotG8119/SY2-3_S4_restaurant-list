const express = require("express");
const router = express.Router();

const Restaurant = require("../../models/restaurant");

router.get("/", (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render("index", { restaurants }))
    .catch(error => console.log(error));
});

router.get("/search", (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase();

  Restaurant.find()
    .lean()
    .then(restaurants => {
      const filterRestaurant = restaurants.filter(restaurant => {
        return (
          restaurant.name.toLowerCase().includes(keyword) ||
          restaurant.category.includes(keyword)
        );
      });
      res.render("index", { restaurants: filterRestaurant, keyword });
    })
    .catch(error => console.log(error));
});

module.exports = router;
