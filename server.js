const express = require("express");

const app = express();

// #1 

app.get("/greetings/:username", (req, res) => {
  const username = req.params.username;
  res.send(`Hi there, ${username}`);
});

// #2

app.get("/roll/:number", (req, res) => {
  const number = parseInt(req.params.number, 10);

  if (isNaN(number) || number <= 0) {
    res.send("You must specify a number.");
  } else {
    const roll = Math.floor(Math.random() * (number + 1));
    res.send(`You rolled a ${roll}.`);
  }
});
// #3

const collectibles = [
  { name: "shiny ball", price: 5.95 },
  { name: "autographed picture of a dog", price: 10 },
  { name: "vintage 1970s yogurt SOLD AS-IS", price: 0.99 },
];

app.get("/collectibles/:index", (req, res) => {
  const index = parseInt(req.params.index, 10);

  if (isNaN(index) || index < 0 || index >= collectibles.length) {
    return res.send("This item is not yet in stock. Check back soon!");
  }

  const item = collectibles[index];
  res.send(
    `So, you want the ${item.name}? For ${item.price}, it can be yours!`
  );
});

app.get("/hello", (req, res) => {
  const name = req.query.name || "Guest";
  const age = req.query.age || "unknown";
  res.send(`Hello there, ${name}! I hear you are ${age} years old!`);
});
// #4

const shoes = [
  { name: "Birkenstocks", price: 50, type: "sandal" },
  { name: "Air Jordans", price: 500, type: "sneaker" },
  { name: "Air Mahomeses", price: 501, type: "sneaker" },
  { name: "Utility Boots", price: 20, type: "boot" },
  { name: "Velcro Sandals", price: 15, type: "sandal" },
  { name: "Jet Boots", price: 1000, type: "boot" },
  { name: "Fifty-Inch Heels", price: 175, type: "heel" },
];

app.get("/shoes", (req, res) => {
  const { minPrice, maxPrice, type } = req.query;

  const filteredShoes = shoes;

  if (minPrice) {
    filteredShoes = filteredShoes.filter(
      (shoe) => shoe.price >= parseFloat(minPrice)
    );
  }

  if (maxPrice) {
    filteredShoes = filteredShoes.filter(
      (shoe) => shoe.price <= parseFloat(maxPrice)
    );
  }

  if (type) {
    filteredShoes = filteredShoes.filter(
      (shoe) => shoe.type === type.toLowerCase()
    );
  }

  res.json(filteredShoes);
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});