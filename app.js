const express = require("express");
const path = require("path");
const hbs = require("hbs");

const geocode = require("./src/utils/geocode");
const forecast = require("./src/utils/forecast");

const app = express();

const port = process.env.PORT || 3000;

//Static render config
const publicDirectoryPath = path.join(__dirname, "./public");
const partialsPath = path.join(__dirname, "./templates/partials");
const viewsPath = path.join(__dirname, "./templates/views");

app.use(express.static(publicDirectoryPath));
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.get("/", (req, res) => {
  res.render("index", {
    name: "rawG",
    title: "Home",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    name: "rawG",
    title: "About Me",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    name: "rawG",
    title: "Help is on its way!",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Address must be provided",
    });
  }
  geocode(req.query.address, (error, { latitude, longitude } = {}) => {
    if (error) return res.send({ error });

    forecast(latitude, longitude, (error, data) => {
      if (error) return error;

      res.send({
        location: data.location,
        weather: data.weather_description,
        temperature: data.temperature,
      });
    });
  });
});

app.get("/products", (req, res) => {
  console.log(req.query);
  res.send({
    products: [],
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    name: "rawG",
    title: "Wrong turn! 404",
  });
});

app.listen(port, () => {
  console.log("Server started on port " + port);
});
