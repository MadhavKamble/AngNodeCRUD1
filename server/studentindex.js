const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(bodyParser());

const PORT_NUMBER = 3530;
mongoose.connect("mongodb://127.0.0.1:27017/itemdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const studentSchema = new mongoose.Schema({
  roll: Number,
  name: String,
  email: String,
  city: String,
  department: String,
  skills: String,
});
const Item = mongoose.model("Students", studentSchema);

app.post("/students", async (req, res) => {
  try {
    const newStudent = new Item(req.body);
    await newStudent.save();
    res.json(newStudent);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal server Error" });
  }
});

app.get("/students", async (req, res) => {
  try {
    const students = await Item.find();
    res.json(students);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/students/:id", async (req, res) => {
  try {
    const updatedStudent = await Item.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.json(updatedStudent);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal server Error" }).send();
  }
});

app.delete("/students/:id", async (req, res) => {
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
