var Dis = require('../models/dis');
var express = require('express');
var router = express.Router();

router.route('/dis')
.get(function(req, res) {
  Dis.find(function(err, result) {
    if (err)  res.end(err);
    res.json(result);
  });
})
.post(function(req, res) {
  console.log(req.body);
  var dis = new Dis(req.body);
  dis.save(function(err) {
    if (err)  res.end(err);
    console.log(dis);
    res.send({
      message:'Dis Added!',
      id:dis.id,
    });
  });
});

router.route('/dis/:id')
.put(function(req, res) {
  Dis.findOne({id:req.params.id}, function(err, dis) {

    if (err)
        res.send(err);

    for (prop in req.body) {
      dis[prop] = req.body[prop];
    }

    // save the movie
    dis.save(function(err) {
      if (err)
          res.send(err);

      res.json({ message: 'Movie updated!' });
    });

  });
})
.get(function(req, res) {
  Dis.findOne({id:req.params.id}, function(err, dis) {
    if (err) res.send(err);
    res.json(dis);
  });
})
.delete(function(req, res) {
  Dis.remove({
    id:req.params.id,
  }, function(err, dis) {
    if (err)  res.send(err);
    res.json({ message: 'Successfully deleted' });
  });
});

module.exports = router;
