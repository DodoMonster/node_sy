var Pro = require('../models/pro');
var express = require('express');
var router = express.Router();

router.route('/pro')
.get(function(req, res) {
  Pro.find(function(err, result) {
    if (err)  res.end(err);
    res.json(result);
  });
})
.post(function(req, res) {
  console.log(req.body);
  var pro = new Pro(req.body);
  pro.save(function(err) {
    if (err)  res.end(err);
    res.send({
      message:'Pro Added!',
      id:pro.id,
    });
  });
});

router.route('/:cType/:cPage')
.post(function(req, res) {
  console.log(req.body);
  console.log(req.params);
});

router.route('/pro/:id')
.put(function(req, res) {
  Pro.findOne({id:req.params.id}, function(err, pro) {

    if (err)
        res.send(err);

    for (prop in req.body) {
      pro[prop] = req.body[prop];
    }

    // save the movie
    pro.save(function(err) {
      if (err)
          res.send(err);

      res.json({ message: 'Movie updated!' });
    });

  });
})
.get(function(req, res) {
  Pro.findOne({id:req.params.id}, function(err, pro) {
    if (err) res.send(err);
    res.json(pro);
  });
})
.delete(function(req, res) {
  console.log(req.params.id);
  Pro.remove({
    id:req.params.id,
  }, function(err, pro) {
    if (err)  res.send(err);
    res.json({ message: 'Successfully deleted' });
  });
});

module.exports = router;
