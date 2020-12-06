const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const app = new express();
const port = process.env.PORT || 5000;

// require model
const Diet = require("./models/Diet");

const dbName = "diet-database";

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



// const express = require('express');
// const mongoose = require('mongoose');
// const path = require('path');
// const config = require('config');

// require("dotenv").config();
// const cors = require("cors");

//   // require model
//   const Diet = require("./models/Diet");

//   const dbName = "diet-database";

// //const app = new express();
// const app = express();

// const db = config.get('mongoURI');

// // var MongoClient = require('mongodb').MongoClient
// //   , assert = require('assert');

// // // Connection URL
// // var url = 'mongodb://localhost:27017/FB';
// // // Use connect method to connect to the Server
// // MongoClient.connect(url, function(err, db) {
// //   assert.equal(null, err);
// //   console.log("Connected correctly to server");

// //   db.close();
// // });

// const port = process.env.PORT || 5000;



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

// // mongoose.connect(process.env.DB_URL, { useNewUrlParser: true }, err => {
// //   if (err) {
// //     console.log("database is not connected ❌");
// //   } else {
// //     console.log("database is connected 💚");
// //   }
// // });

// // mongoose
// //   .connect(db, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false })
// //   .then(() => console.log('MongoDB Connected...'))
// //   .catch(err => console.log(err));



// // middleware
// app.use(express.json());
// app.use(cors());

// app.get("/diets", async (req, res) => {
//   const showDiets = await Diet.find();
//   res.send({
//     showDiets: showDiets
//   });
// });

// //const Animal = require('./models/Animal');
// // app.get('/', (req, res) => {
// //   Diet.find()
// //     .sort({ date: -1 })
// //     .then(items => console.log(res.json(items)));
// // });

// app.post("/seed", (req, res) => {
//   // const { diet } = req.body
//   const { showDiets } = req.body;
//   // diet.forEach(async (diettype) => {
//   showDiets.forEach(async diettype => {
//     const newDiet = new Diet({
//       dietType: diettype.dietType,
//       ingredients: diettype.ingredients
//     });
//     const savedDiet = await newDiet.save();
//     console.log(savedDiet);
//   });
//   res.send("seeding complete");
// });

// // app.listen(port, () => {
// //   console.log(`listening on port ${port} ✌🏽`);
// // });

// //const port = 5003;
// app.listen(port, () => console.log(`Server started on port: http://localhost:${port}`));
