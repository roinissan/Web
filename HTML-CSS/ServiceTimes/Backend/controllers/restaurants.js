const fs = require("fs");
const dataFilePath = `${__dirname}/../assets/restaurants.json`;

exports.getAll = function () {
  try {
    console.log(dataFilePath);
    const rawJson = fs.readFileSync(dataFilePath);
    const restaurantJson = JSON.parse(rawJson);
    return restaurantJson;
  } catch (error) {
    throw error;
  }
};

exports.getSpecificRest = function (restaurantID) {
  try {
    console.log(dataFilePath);
    const rawJson = fs.readFileSync(dataFilePath);
    const restaurantJson = JSON.parse(rawJson);
    return restaurantJson[restaurantID];
  } catch (error) {
    throw error;
  }
};

exports.getAdditionalInfo = function () {
  try {
    const rawJson = fs.readFileSync(dataFilePath);
    const restaurantJson = JSON.parse(rawJson);
    return restaurantJson["additinalInfo"];
  } catch (error) {
    throw error;
  }
};

exports.updateRestaurant = function (restaurantID, restaurantObject) {
  try {
    const rawJson = fs.readFileSync(dataFilePath);
    let restaurantJson = JSON.parse(rawJson);
    restaurantJson[restaurantID] = restaurantObject;
    fs.writeFileSync(dataFilePath, JSON.stringify(restaurantJson));
  } catch (error) {
    throw error;
  }
};

exports.updateRemarks = function (newRemarks) {
  try {
    const rawJson = fs.readFileSync(dataFilePath);
    let restaurantJson = JSON.parse(rawJson);
    restaurantJson.remarks = newRemarks;
    fs.writeFileSync(dataFilePath, JSON.stringify(restaurantJson));
  } catch (error) {
    throw error;
  }
};
