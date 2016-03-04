var Pro = require('../models/pro');
var express = require('express');
var router = express.Router();

router.route('/animal')
  .get(function(req, res) {
    Pro.find(function(err, result) {
      if (err) res.end(err);
      res.json(result);
    });
  })
  .post(function(req, res) {
    var pro = new Pro(req.body);
    pro.save(function(err) {
      if (err) console.log(err);
      res.send({
        message: 'success',
        animalId: pro.animalId,
      });
    });
  });

router.route('api/:cType/:cPage')
  .post(function(req, res) {
    console.log('fenye');
    console.log(req.body);
    console.log(req.params);
  });

router.route('/animal/:animalId')
  .put(function(req, res) {
    Pro.findOne({
      animalId: req.params.animalId,
    }, function(err, pro) {

      if (err)
        res.send(err);

      for (prop in req.body) {
        pro[prop] = req.body[prop];
      }

      // save the movie
      pro.save(function(err) {
        if (err)
          res.send(err);

        res.send({
          message: 'success',
        });
      });

    });
  })
  .get(function(req, res) {
    Pro.findOne({
      animalId: req.params.animalId,
    }, function(err, pro) {
      if (err) res.send(err);
      res.json(pro);
    });
  })
  .delete(function(req, res) {
    Pro.remove({
      animalId: req.params.animalId,
    }, function(err, pro) {
      if (err) res.send(err);
      res.json({
        message: 'Successfully deleted',
      });
    });
  });


router.route('/disease/:animalId')
  .get(function(req, res) {
    console.log('/disease/:animalId ---get',
      req.params);
    res.json([{
      id: 1,
      diseaseName: '肚子疼',
      startDate: '2013-01-01',
      endDate: '2013-02-01',
      comments: '小事',
    }, {
      id: 2,
      diseaseName: '肚子疼',
      startDate: '2013-01-01',
      endDate: '2014-02-01',
      comments: '没事没事没事没事没事没事没事没事没事没事没事没事没事没事没事没事没事没事没事没事没事没事没事没事没事没事没事没事没事没事没事没事没事没事没事没事没事没事没事没事没事没事没事没事没事没事没事没事没事没事没事没事没事没事没事没事',
    }, {
      id: 3,
      diseaseName: '感冒',
      startDate: '2011-11-12',
      endDate: '2013-11-12',
      comments: '小事',
    }, {
      id: 4,
      diseaseName: '发烧',
      startDate: '2014-12-12',
      endDate: '2015-12-21',
      comments: '小事',
    }, ]);
  })
  .post(function(req, res) {
    console.log('/disease/:animalId  ---post', req.params.animalId);
    console.log('/disease/:animalId  ---post', req.body);
    res.send({
      message: 'success',
      id: 1,
    });
  });


router.route('/disease/:animalId/:id')
  .put(function(req, res) {
    console.log('/disease/:animalId/:id ---put', req.params);
    console.log('/disease/:animalId/:id ---put', req.body);
    res.send({
      message: 'success'
    });
  })
  .delete(function(req, res) {
    console.log('/disease/:animalId/:id --delete', req.params);
    console.log('/disease/:animalId/:id ---delete', req.body);
    res.send({
      message: 'success'
    });
  });


router.route('/quality')
  .get(function(req, res) {
    res.json([{
      date: '2013-01-01',
      organization: '华南农业大学',
      person: '检测人员一',
      pici: 1,
      testNum: 1011,
      quaNum: 199,
      comments: '结果说明'
    }, {
      date: '2013-01-01',
      organization: '华南农业大学',
      person: '检测人员二',
      pici: 1,
      testNum: 1011,
      quaNum: 199,
      comments: '结果说明'
    }, {
      date: '2013-01-01',
      organization: '华南农业大学',
      person: '检测人员三',
      pici: 1,
      testNum: 1011,
      quaNum: 199,
      comments: '结果说明'
    }, {
      date: '2013-01-01',
      organization: '华南农业大学',
      person: '检测人员四',
      pici: 1,
      testNum: 1011,
      quaNum: 199,
      comments: '结果说明'
    }, {
      date: '2013-01-01',
      organization: '华南农业大学',
      person: '检测人员五',
      pici: 1,
      testNum: 1011,
      quaNum: 199,
      comments: '结果说明'
    }, {
      date: '2013-01-01',
      organization: '华南农业大学',
      person: '检测人员六',
      pici: 1,
      testNum: 1011,
      quaNum: 199,
      comments: '结果说明'
    }, {
      date: '2013-01-01',
      organization: '华南农业大学',
      person: '检测人员七',
      pici: 1,
      testNum: 1011,
      quaNum: 199,
      comments: '结果说明'
    }, {
      date: '2013-01-01',
      organization: '华南农业大学',
      person: '检测人员八',
      pici: 1,
      testNum: 1011,
      quaNum: 199,
      comments: '结果说明'
    }, {
      date: '2013-01-01',
      organization: '华南农业大学',
      person: '检测人员一,检测人员一,检测人员一',
      pici: 1,
      testNum: 1011,
      quaNum: 199,
      comments: '结果说明'
    }, {
      date: '2013-01-01',
      organization: '华南农业大学',
      person: '检测人员一,检测人员一,检测人员一',
      pici: 1,
      testNum: 1011,
      quaNum: 199,
      comments: '结果说明'
    }, {
      date: '2013-01-01',
      organization: '华南农业大学',
      person: '检测人员一,检测人员一,检测人员一',
      pici: 1,
      testNum: 1011,
      quaNum: 199,
      comments: '结果说明'
    }, {
      date: '2013-01-01',
      organization: '华南农业大学',
      person: '检测人员一,检测人员一,检测人员一',
      pici: 1,
      testNum: 1011,
      quaNum: 199,
      comments: '结果说明'
    }, {
      date: '2013-01-01',
      organization: '华南农业大学',
      person: '检测人员一,检测人员一,检测人员一',
      pici: 1,
      testNum: 1011,
      quaNum: 199,
      comments: '结果说明'
    }, {
      date: '2013-01-01',
      organization: '华南农业大学',
      person: '检测人员一,检测人员一,检测人员一',
      pici: 1,
      testNum: 1011,
      quaNum: 199,
      comments: '结果说明'
    }, {
      date: '2013-01-01',
      organization: '华南农业大学',
      person: '检测人员一,检测人员一,检测人员一',
      pici: 1,
      testNum: 1011,
      quaNum: 199,
      comments: '结果说明'
    }, {
      date: '2013-01-01',
      organization: '华南农业大学',
      person: '检测人员一,检测人员一,检测人员一',
      pici: 1,
      testNum: 1011,
      quaNum: 199,
      comments: '结果说明'
    }, {
      date: '2013-01-01',
      organization: '华南农业大学',
      person: '检测人员一,检测人员一,检测人员一',
      pici: 1,
      testNum: 1011,
      quaNum: 199,
      comments: '结果说明'
    }, {
      date: '2013-01-01',
      organization: '华南农业大学',
      person: '检测人员一,检测人员一,检测人员一',
      pici: 1,
      testNum: 1011,
      quaNum: 199,
      comments: '结果说明'
    }, {
      date: '2013-01-01',
      organization: '华南农业大学',
      person: '检测人员一,检测人员一,检测人员一',
      pici: 1,
      testNum: 1011,
      quaNum: 199,
      comments: '结果说明'
    }, {
      date: '2013-01-01',
      organization: '华南农业大学',
      person: '检测人员一,检测人员一,检测人员一',
      pici: 1,
      testNum: 1011,
      quaNum: 199,
      comments: '结果说明'
    }, {
      date: '2013-01-01',
      organization: '华南农业大学',
      person: '检测人员一,检测人员一,检测人员一',
      pici: 1,
      testNum: 1011,
      quaNum: 199,
      comments: '结果说明'
    }, ]);
  })
  .post(function(req, res) {
    console.log('/quality --post', req.body);
    res.send({
      message: 'success',
      id: 1,
    });
  });
router.route('/quality/:id')
  .put(function(req, res) {
    console.log('/quality:id --put', req.body);
    console.log('/quality:id --put', req.params.id);
    res.send({
      message: 'success'
    });
  })
  .delete(function(req, res) {
    console.log('/quality:id --delete', req.params.id);
    res.send({
      message: 'success'
    });
  });
router.route('/aniQua/:animalId')
  .get(function(req, res) {
    console.log('/aniQua/:animalId ---get', req.params.animalId);
    res.json([{
      date: '2013-01-01',
      organization: '华南农业大学',
      person: '检测人员一',
      pici: 1,
      testNum: 1011,
      quaNum: 199,
      comments: '结果说明'
    }, {
      date: '2013-01-01',
      organization: '华南农业大学',
      person: '检测人员一',
      pici: 2,
      testNum: 1011,
      quaNum: 199,
      comments: '结果说明'
    }, {
      date: '2013-01-01',
      organization: '华南农业大学',
      person: '检测人员一',
      pici: 3,
      testNum: 1011,
      quaNum: 199,
      comments: '结果说明'
    }, {
      date: '2013-01-01',
      organization: '华南农业大学',
      person: '检测人员一',
      pici: 1,
      testNum: 1011,
      quaNum: 199,
      comments: '结果说明'
    }]);
  })
  .post(function(req, res) {
    console.log('/aniQua/:animalId ---post', req.params);
    console.log('/aniQua/:animalId ---post', req.body);
    res.send({
      message: 'success'
    });
  });

router.route('/aniQua/:animalId/:pici')
  .delete(function(req, res) {
    console.log('/aniQua/:animalId ---delete', req.params);
    res.send({
      message: "success"
    });
  });

module.exports = router;