const express = require("express");
const router = express.Router();
const {
  createCar,
  getCars,
  editCar,
  deleteCar,
} = require("../controllers/cars.controllers.js");

//Read

router.get("/", getCars);

//Create

router.post("/", createCar);

//Update

router.put("/:id", editCar);

//Delete

router.delete("/:id", deleteCar);

//export
module.exports = router;
