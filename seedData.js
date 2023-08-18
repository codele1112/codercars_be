require("dotenv").config();
const fs = require("fs");
const csv = require("csvtojson");

const createCar = async () => {
  let newData = await csv().fromFile("cars.csv");
  let db = JSON.parse(fs.readFileSync("cars.json"));

  newData = newData.map((e) => {
    const newCar = {
      make: e.Make,
      model: e.Model,
      release_date: parseInt(e.Year),
      transmission_type: e["Transmission Type"],
      size: e["Vehicle Size"],
      price: parseInt(e["MSRP"]),
      style: e["Vehicle Style"],
      isDeleted: false,
    };
    return newCar;
  });
  let data = JSON.parse(fs.readFileSync("cars.json", "utf-8"));
  data = newData;

  fs.writeFileSync("cars.json", JSON.stringify(data));
  console.log(data);
};
createCar();
