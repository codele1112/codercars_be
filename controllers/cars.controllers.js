const { query } = require("express");
const { sendResponse, AppError } = require("../helpers/utils.js");

const Car = require("../models/Car.js");

const carController = {};
//Create a car
carController.createCar = async (req, res, next) => {
  //in real project you will getting info from req
  const info = req.body;
  try {
    //always remember to control your inputs
    if (!info) throw new AppError(402, "Bad Request", "Create Car Error");
    //mongoose query
    const created = await Car.create(info);
    sendResponse(res, 200, true, { car: created }, null, "Create Car Success");
  } catch (err) {
    next(err);
  }
};

//Get all cars
carController.getCars = async (req, res, next) => {
  let { page, limit } = req.query;
  limit = parseInt(limit) || 10;
  page = parseInt(page) || 1;
  //Number of items skip for selection
  let offset = limit * (page - 1);

  const totalPage = Math.ceil(11915 / limit);

  const filter = req.query;
  try {
    //mongoose query
    const listOfFound = await Car.find(filter).skip(offset).limit(limit);

    sendResponse(
      res,
      200,
      true,
      { cars: listOfFound, page: page, total: totalPage },
      null,
      "Found list of cars success"
    );
  } catch (err) {
    next(err);
  }
};

//Edit a car
carController.editCar = async (req, res, next) => {
  //options allow you to modify query. e.g new true return lastest update of data
  const options = { new: true };
  const targetId = req.params.id;

  const updateInfo = req.body;
  try {
    //mongoose query
    const updated = await Car.findByIdAndUpdate(targetId, updateInfo, options);

    console.log("updated:", updated);
    if (!updated) {
      sendResponse(
        res,
        500,
        false,
        { car: updated },
        null,
        `Cannot update car with id ${targetId}. Maybe car not found!`
      );
    } else {
      sendResponse(
        res,
        200,
        true,
        { car: updated },
        null,
        "Update car success"
      );
    }
  } catch (err) {
    next(err);
  }
};

//Delete car
carController.deleteCar = async (req, res, next) => {
  //options allow you to modify query. e.g new true return lastest update of data
  const options = { new: true };
  const targetId = req.params.id;

  try {
    //mongoose query

    const updated = await Car.findOneAndUpdate(
      targetId,
      { isDeleted: true },
      options
    );
    if (!updated) {
      sendResponse(
        res,
        500,
        false,
        { car: updated },
        null,
        `Cannot delete car with id ${targetId}. Maybe id is wrong!`
      );
    } else {
      sendResponse(
        res,
        200,
        true,
        { car: updated },
        null,
        "Delete car success"
      );
    }
  } catch (err) {
    next(err);
  }
};
//export
module.exports = carController;
