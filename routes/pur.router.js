var Pur = require('../models/pur');
var express = require('express');
var router = express.Router();

router.route('/pur')
.get(function(req, res) {
  Pur.find(function(err, result) {
    if (err)  res.end(err);
    res.json(result);
  });
})
.post(function(req, res) {
  console.log(req.body);
  var pur = new Pur(req.body);
  pur.save(function(err) {
    if (err)  res.end(err);
    res.send({
      message:'Pro Added!',
      id:pur.id,
    });
  });
});

router.route('/pur/:id')
.put(function(req, res) {
  Pur.findOne({id:req.params.id}, function(err, pur) {

    if (err)
        res.send(err);

    for (prop in req.body) {
      pur[prop] = req.body[prop];
    }

    // save the movie
    pur.save(function(err) {
      if (err)
          res.send(err);

      res.json({ message: 'Movie updated!' });
    });

  });
})
.get(function(req, res) {
  Pur.findOne({id:req.params.id}, function(err, pur) {
    if (err) res.send(err);
    res.json(pur);
  });
})
.delete(function(req, res) {
  console.log(req.params.id);
  Pur.remove({
    id:req.params.id,
  }, function(err, pur) {
    if (err)  res.send(err);
    res.json({ message: 'Successfully deleted' });
  });
});

module.exports = router;
