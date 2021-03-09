const Flight = require("../models/flight");
const Ticket = require("../models/ticket")

Date.prototype.getDateForHTML = function(addYear){
  return `${this.getUTCFullYear()+addYear}/${(this.getUTCMonth()+1).toString().padStart(2,'0')}/${this.getUTCDate().toString().padStart(2,'0')}`
}

module.exports = {
  index,
  new: newEntry,
  show,
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
  res.render("flights/new", {
    title: "NEW FLIGHT",
    active: "new",
    date: date.getDateForHTML(10),
  });
}


async function show(req, res, next) {
  try {
    let result = await (await Flight.findById(req.params.id)).populate('tickets').execPopulate();
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
/* async function edit(req, res, next) {
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
} */


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
