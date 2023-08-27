const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(bodyParser());

const PORT_NUMBER = 2530;
mongoose.connect("mongodb://127.0.0.1:27017/itemdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const itemSchema = new mongoose.Schema({
  name: String,
  description: String,
});
const Item = mongoose.model("Item", itemSchema);

app.post("/items", async (req, res) => {
  try {
    const newItem = new Item(req.body);
    await newItem.save();
    res.json(newItem);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal server Error" });
  }
});

app.get("/items", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/items/:id", async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedItem);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal server Error" }).send();
  }
});

app.delete("/items/:id", async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: "Item deleted sucessfully !!" }).send();
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal Server Error" }).send();
  }
});

app.listen(PORT_NUMBER, () => {
  console.log(`Server started listening on port number ${PORT_NUMBER}`);
});
