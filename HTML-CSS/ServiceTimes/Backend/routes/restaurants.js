const express = require("express");
const router = express.Router();
const restaurantController = require("../controllers/restaurants");

//get specific restaurant data
router.get("/single/:restaurantID", (req, res, next) => {
  let resID = req.params.restaurantID;
  try {
    console.log(resID);
    parseInt(resID);
    const result = restaurantController.getSpecificRest(resID);
    res.status(200).send(result);
  } catch (error) {
    throw error;
  }
});

//get additional info
router.get("/info", async (req, res, next) => {
  try {
    const result = restaurantController.getAdditionalInfo();
    res.status(200).send(result);
  } catch (error) {
    throw error;
  }
});

//get all restaurants data
router.get("/all", async (req, res, next) => {
  try {
    console.log("fdsfds");
    const result = restaurantController.getAll();
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    throw error;
  }
});

// add-update new Restaurant
router.put("/updateRestaurant", async (req, res, next) => {
  try {
    if (!req.body || !req.body.restID || !req.body.restData) {
      throw new Error("missing parameters");
    }

    restaurantController.updateRestaurant(req.body.restID, req.body.restData);
    res.status(201).send();
  } catch (error) {
    throw error;
  }
});

router.put("/updateRemarks", async (req, res, next) => {
  try {
    if (!req.body || req.body.remarks === undefined) {
      throw new Error("missing parameters");
    }

    restaurantController.updateRemarks(req.body.remarks);
    res.status(201).send();
  } catch (error) {
    throw error;
  }
});

module.exports = router;
