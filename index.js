const express = require("express");
const app = express();
const port = 7000;
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/Company");

app.use(express.static("public"));

const employeeSchema = mongoose.Schema({
  name: String,
  salary: Number,
  city: String,
});
const employee = mongoose.model("employee", employeeSchema);

// data
let nameArr = ["saksham", "Manav", "Pandey"];
let salaryArr = [50000, 60000, 70000];
let cityArr = ["Delhi", "Bangalore", "Moradabad"];
//------
let count;
async function countData() {
  count = await employee.countDocuments();
  console.log(count);
}
async function deleteData() {
  await employee.deleteMany({});
}

countData();
app.get("/", (req, res) => {
  res.sendFile("index", { root: __dirname });
});

app.post("/", (req, res) => {
  res.send("data has been saved");
  console.log("data has been saved or deleted");
  if (count === 0) {
    for (let i = 0; i <= 9; i++) {
      let aboutemployee = new employee({
        name: nameArr[Math.round(Math.random() * 2)],
        salary: salaryArr[Math.round(Math.random() * 2)],
        city: cityArr[Math.round(Math.random() * 2)],
      });

      aboutemployee.save();
    }
  } else {
    deleteData();
  }
});
app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
