const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = new express();

// middleware
app.use(express.json())
app.use(cors());

// require model
const Diet = require('./models/Diet')

const dbName = 'diet-database'

mongoose.connect(`mongodb://localhost:27017/${dbName}`, { useNewUrlParser: true }, (err) => {
  if (err) {
    console.log('database is not connected')
  } else {
    console.log('database is connected')
  }
})

app.get('/diets', async (req, res) => {
  const showDiets = await Diet.find()
  res.send({
    showDiets
    // shorthand for showDiets: showDiets (I think)
  })
})

app.post('/seed', (req, res) => {
  const { diet } = req.body
  diet.forEach(async (diettype) => {
    const newDiet = new Diet({
      dietType: diettype.dietType,
      ingredients: diettype.ingredients
    })
    const savedDiet = await newDiet.save()
    console.log(savedDiet)
  })
  res.send('seeding complete')
})

app.listen(5000, () => {
  console.log('listening on port 5000')
})