const Flight = require("../models/flight");
const Ticket = require("../models/ticket")

module.exports = {
  create,
  delete: deleteTicket,
};

async function create(req, res) {
  console.log(req.params, req.body);
  try{
    let newTicket = new Ticket({
      seat: req.body.seat,
      price: req.body.price,
      flight: req.params.id,
    });
    let thisFlight = await Flight.findById(req.params.id);
    thisFlight.tickets.push(newTicket._id);
    await newTicket.save();
    await thisFlight.save();
    res.redirect(`/flights/${req.params.id}`)
  }
  catch(err){
    res.render('error',{
      message: "ticketCtrl - create",
      error: err,
    })
  }
}

async function deleteTicket(req, res) {
  try{
    console.log(req.body, req.params);
    
    let thisFlight = await Flight.findById(req.params.id);

    let thisTicket = Ticket.findById(req.params.tid);
    thisTicket.remove().exec();
    
    await thisFlight.save();
    res.redirect(`/flights/${req.params.id}`);
  }catch(err){
    res.render('error',{
      message: "ticketsCtrl - delete",
      error: err,
    })
    
  }
}
