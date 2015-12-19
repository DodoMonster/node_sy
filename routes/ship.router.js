var Ship = require('../models/ship');
var express = require('express');
var router = express.Router();

router.route('/ship')
.get(function(req, res) {
  Ship.find(function(err, result) {
    if (err)  res.end(err);
    res.json(result);
  });
})
.post(function(req, res) {
  console.log(req.body);
  var ship = new Ship(req.body);
  ship.save(function(err) {
    if (err)  res.end(err);
    res.send({
      message:'Dis Added!',
      id:ship.id,
    });
  });
});

router.route('/ship/:id')
.put(function(req, res) {
  Ship.findOne({id:req.params.id}, function(err, ship) {

    if (err)
        res.send(err);

    for (prop in req.body) {
      ship[prop] = req.body[prop];
    }

    // save the ship
    ship.save(function(err) {
      if (err)
          res.send(err);

      res.json({ message: 'Movie updated!' });
    });

  });
})
.get(function(req, res) {
  Ship.findOne({id:req.params.id}, function(err, ship) {
    if (err) res.send(err);
    res.json(ship);
  });
})
.delete(function(req, res) {
  Ship.remove({
    id:req.params.id,
  }, function(err, ship) {
    if (err)  res.send(err);
    res.json({ message: 'Successfully deleted' });
  });
});

module.exports = router;
