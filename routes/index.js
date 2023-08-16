const { sendResponse, AppError } = require("../helpers/utils.js");
var express = require("express");
var router = express.Router();

router.get("/template/:test", async (req, res, next) => {
  const { test } = req.params;
  try {
    //turn on to test error handling
    if (test === "error") {
      throw new AppError(401, "Access denied", "Authentication Error");
    } else {
      sendResponse(
        res,
        200,
        true,
        { data: "template" },
        null,
        "template success"
      );
    }
  } catch (err) {
    next(err);
  }
});

// Add car api to index routes
const carAPI = require("./car.api.js");
router.use("/car", carAPI);

module.exports = router;
