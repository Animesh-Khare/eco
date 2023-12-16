const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/Ecohodo", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Schema = mongoose.Schema;

// question model
const questionSchema = new Schema({
  question: String,
  type: String,
  required: String,
  answered: String,
  options: [String],
});

const Questions = mongoose.model("Questions", questionSchema);

// user model
const userSchema = new Schema({
  name: String,
  email: String,
  phoneNumber: String,
  question: [{ type: Schema.Types.ObjectId, ref: "Questions" }],
});

const Users = mongoose.model("Users", userSchema);

app.post("/questions", async (req, res) => {
  try {
    const questions = new Questions(req.body);
    await questions.save();
    res.json(questions);
  } catch (err) {
    console.error(err);
  }
});

app.get("/questions", async (req, res) => {
  try {
    const data = await Questions.find({});
    res.send(data);
  } catch (err) {
    console.error(err);
  }
});

app.post("/user", async (req, res) => {
  try {
    const user = new Users(req.body.values);
    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err);
  }
});

app.get("/allusers", async (req, res) => {
  try {
    const data = await Users.find({}).populate("question");
    res.json(data);
  } catch (err) {
    console.error(err);
  }
});

app.put("/findbyid/:id", async (req, res) => {
  try {
    const data = await Users.findByIdAndUpdate(
      { _id: req.params.id },
      req.body
    );
    res.json(data);
  } catch (err) {
    console.error(err);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
