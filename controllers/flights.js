const { Schema } = require("mongoose");
const Flight = require("../models/flight");

module.exports = {
  index,
  new: newEntry,
  show,
  edit,
  update,
  create,
  delete: deleteEntry,
};

async function index(req, res, next) {
  try {
    let result = await Flight.find({});
    res.render("flights/index", {
      title: "ALL FLIGHTS ",
      active: "index",
      array: result,
    });
  } catch (err) {
    console.log(err);
    res.redirect("/flights");
  }
}

function newEntry(req, res, next) {
  let date = new Date();
  date = `${date.getFullYear() + 1}-${date.getMonth() + 1}-${date.getDate()}`;
  res.render("flights/new", {
    title: "NEW FLIGHT",
    active: "new",
    date: date,
  });
}

async function show(req, res, next) {
  try {
    let result = await Flight.findById(req.params.id)
    let tmpObj = result.toObject();
    tmpObj.destinations.sort(function(first,second){
      if(first.arrival < second.arrival) return -1;
      else if (first.arrival > second.arrival) return 1;
      else return 0;
    })
    res.render("flights/show", {
      title: "SHOW FLIGHT ",
      entry: tmpObj,
      active: req.params.id,
    });
  } catch (err) {
    console.log(err);
    res.redirect("/flights");
  }
}
async function edit(req, res, next) {
  try {
    let result = await Flight.findById(req.params.id);
    let resultObject = result.toObject();
    resultObject.date_input = convertDateyyyyMMdd(resultObject.date_input);
    resultObject.array_input = resultObject.array_input.reduce(
      (acc, cur) => acc + "\n" + cur
    );
    res.render(`my_db/edit`, {
      title: "MyDB - Edit ",
      entry: resultObject,
    });
  } catch (err) {
    console.log(err);
    res.status(400);
  }
}
//obviously this returns the date to acceptable HTML format
function convertDateyyyyMMdd(d) {
  date = new Date(d);
  year = date.getFullYear();
  month = date.getMonth() + 1;
  dt = date.getDate() + 1;

  if (dt < 10) {
    dt = "0" + dt;
  }
  if (month < 10) {
    month = "0" + month;
  }
  return year + "-" + month + "-" + dt;
}

async function update(req, res, next) {
  //convert checkbox input from  "ON"/"" to boolean true/false
  req.body.boolean_input = !!req.body.boolean_input;

  //convert textarea newlines into js newlines
  req.body.array_input = req.body.array_input.split("\r\n");

  try {
    // const newEntry = await new Flight(req.body);
    await Flight.findByIdAndUpdate(req.params.id, req.body);
    res.redirect(`/my_db/${req.params.id}`);
  } catch (err) {
    console.log(err);
  }
}

async function create(req, res, next) {
  try {
    let doc = new Flight(req.body);
    await doc.save();
    res.redirect("/flights");
  } catch (err) {
    console.log(err);
    res.redirect("/flights");
  }
}

function deleteEntry(req, res, next) {
  Flight.findByIdAndRemove(req.params.id, function (err, docs) {
    if (err) console.log(err);
    else {
      res.redirect("/flights");
    }
  });
}
