var express = require('express');
var router = express.Router();

var ticketsCtrl = require('../controllers/tickets');

router.post('/flights/:id/tickets', ticketsCtrl.create)
router.delete('/flights/:id/tickets/:tid', ticketsCtrl.delete)

module.exports = router;