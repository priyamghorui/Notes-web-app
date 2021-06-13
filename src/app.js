const express = require("express");
const path = require("path");
const { exit } = require("process");
const app = express();
require("./db/connection");
const amodel = require("./models/amodel");
app.set("view engine", "hbs");
app.use(express.urlencoded({ extended: false }));
const staticpath = path.join(__dirname, "../static");
app.use(express.static(staticpath));
async function data() {
  let result = await amodel.find();
  // console.log(result);
  result.forEach((element) => {
    // console.log(element.massage);
    element.massage.forEach((elementmass) => {
      for (const iterator of elementmass) {
        // console.log(iterator);
        if (iterator == "\n") {
          element.massage = element.massage[0].split("\n");
          break;
        }
      }
    });
  });
  return result;
}
app.get("/", async (req, res) => {
  res.render("index", {
    data: await data(),
  });
});

app.post("/", async (req, res) => {
  try {
    console.log(req.body.massage);
    const doc = await new amodel({
      titel: req.body.titel,
      massage: req.body.massage,
    });
    const result = await doc.save();
    console.log(result);
    res.render("index", {
      data: await data(),
    });
  } catch (error) {
    console.log(error);
  }
});
app.get("/del", async (req, res) => {
  const deletedoc = await amodel.deleteOne({ _id: req.query._id });
  console.log(deletedoc);
  let workDone = false;
  if (deletedoc.deletedCount != 0) {
    workDone = true;
  }
  console.log(workDone);
  res.render("index", {
    data: await data(),
    workDone: workDone,
  });
});
app.post("/update", async (req, res) => {
  try {
    let updateworkDone = true;
    console.log(req.body);
    const result = await amodel.findOneAndUpdate(
      { _id: req.body.update_id },
      { $set: { titel: req.body.updatetitel, massage: req.body.updatemassage } }
    );
    console.log(result);
    res.render("index", {
      data: await data(),
      updateworkDone: updateworkDone,
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(8000, () => {
  console.log("connect");
});
