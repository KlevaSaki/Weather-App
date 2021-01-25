const request = require("request");

require("dotenv").config();
const GEOCODE_API_KEY = process.env.GEOCODE_API_KEY;
console.log(GEOCODE_API_KEY);

const geocode = (location, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    location +
    ".json?limit=1&access_token=" +
    GEOCODE_API_KEY;

  request({ url, json: true }, (error, res) => {
    if (error) {
      callback(
        "Unable to reach geocode api, check internet connection",
        undefined
      );
    } else if (res.body.features.length === 0) {
      callback("Couldnt match a location", undefined);
    } else {
      callback(undefined, {
        location: res.body.features[0].place_name,
        latitude: res.body.features[0].geometry.coordinates[1],
        longitude: res.body.features[0].geometry.coordinates[0],
      });
    }
  });
};

module.exports = geocode;
