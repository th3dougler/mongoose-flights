const Flight = require("../models/flight");

module.exports = {
  create,
  delete: deleteDestination,
};

function create(req, res) {
  if (req.body.airport != "" && req.body.arrival != "") {
    Flight.findOne({ _id: req.params.id }, function (err, result) {
      if (err) {
        return res.send("u made a mistake", err);
      }
      result.destinations.push(req.body);
      result.save(function (err) {
        res.redirect(`/flights/${req.params.id}`);
      });
    });
  } else res.redirect(`/flights/${req.params.id}`);
}

async function deleteDestination(req, res) {
  try {
    let result = await Flight.findById(req.params.id);
    await result.destinations.id(req.params.did).remove();
    await result.save();
    res.redirect(`/flights/${req.params.id}`);
  } catch (err) {
    res.render("error", {
      message: "destination - delete",
      error: err,
    });
  }
}
