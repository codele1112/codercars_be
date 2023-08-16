const { sendResponse, AppError } = require("../helpers/utils.js");

const Car = require("../models/Car.js");

const carController = {};
//Create a car
carController.createCar = async (req, res, next) => {
  //in real project you will getting info from req
  const info = {
    name: "car",
    flag: false,
  };
  try {
    //always remember to control your inputs
    if (!info) throw new AppError(402, "Bad Request", "Create Foo Error");
    //mongoose query
    const created = await Foo.create(info);
    sendResponse(res, 200, true, { data: created }, null, "Create Foo Success");
  } catch (err) {
    next(err);
  }
};

//Get all cars
carController.getCars = async (req, res, next) => {
  let { page, limit } = req.query;
  limit = parseInt(limit) || 10;
  page = parseInt(page) || 1;
  let start = page === 1 ? page - 1 : page * limit - limit;
  let end = page * limit;
  const filter = {};
  try {
    //mongoose query
    const listOfFound = await Car.find(filter)
      .skip(limit * (page - 1))
      .limit(limit);
    sendResponse(
      res,
      200,
      true,
      { cars: listOfFound },
      null,
      "Found list of cars success"
    );
  } catch (err) {
    next(err);
  }
};

//Edit a car
carController.editCar = async (req, res, next) => {
  const { make, model, release_date, transmission_type, price, size, style } =
    req.body;
  const updateInfo = {
    make,
    model,
    release_date,
    transmission_type,
    price,
    size,
    style,
  };

  //options allow you to modify query. e.g new true return lastest update of data
  const options = { new: true };
  try {
    //mongoose query
    const updated = await Car.findByIdAndUpdate(targetId, updateInfo, options);

    sendResponse(res, 200, true, { data: updated }, null, "Update Car success");
  } catch (err) {
    next(err);
  }
};

//Delete car
carController.deleteCar = async (req, res, next) => {
  const targetId = req.params.id;
  //options allow you to modify query. e.g new true return lastest update of data
  const options = { new: true };
  try {
    //mongoose query
    const updated = await Car.findByIdAndDelete(
      targetId,
      { isDeleted: true },
      options
    );

    sendResponse(res, 200, true, { car: updated }, null, "Delete car success");
  } catch (err) {
    next(err);
  }
};
//export
module.exports = carController;
