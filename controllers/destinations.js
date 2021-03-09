const Flight = require("../models/flight");

module.exports = {
  create,
};

async function create(req, res) {
  console.log(req.body, req.params);
  try {
    await Flight.findOneAndUpdate(
      { _id: req.params.id },
      { destinations: req.params },
      { new: true }
    );
    res.redirect(`/flights/${req.params.id}`);
  } catch (err) {
    console.log(err);
    res.redirect(`/flights/`);
  }
}
