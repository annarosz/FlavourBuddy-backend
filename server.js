const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const app = new express();
const port = process.env.PORT || 5000;

// require model
const Diet = require("./models/Diet");

const dbName = "diet-database";

// mongoose.connect(
//   `mongodb://localhost:27017/${dbName}`,
//   { useNewUrlParser: true },
//   err => {
//     if (err) {
//       console.log("database is not connected ❌");
//     } else {
//       console.log("database is connected 💚");
//     }
//   }
// );

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true }, err => {
  if (err) {
    console.log("database is not connected ❌");
  } else {
    console.log("database is connected 💚");
  }
});

// middleware
app.use(express.json());
app.use(cors());

app.get("/diets", async (req, res) => {
  const showDiets = await Diet.find();
  res.send({
    showDiets: showDiets
  });
});

app.post("/seed", (req, res) => {
  // const { diet } = req.body
  const { showDiets } = req.body;
  // diet.forEach(async (diettype) => {
  showDiets.forEach(async diettype => {
    const newDiet = new Diet({
      dietType: diettype.dietType,
      ingredients: diettype.ingredients
    });
    const savedDiet = await newDiet.save();
    console.log(savedDiet);
  });
  res.send("seeding complete");
});

app.listen(port, () => {
  console.log(`listening on port ${port} ✌🏽`);
});
