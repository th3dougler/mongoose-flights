var express = require('express');
var router = express.Router();
var flightsCtrl = require('../controllers/flights');


router.get('/', flightsCtrl.index);
router.post('/', flightsCtrl.create);

router.get('/new', flightsCtrl.new);

router.get('/:id', flightsCtrl.show);
router.put('/:id', flightsCtrl.update);

router.get('/:id/edit', flightsCtrl.edit);


router.delete('/:id', flightsCtrl.delete);




module.exports = router;
