var express = require('express');
var router = express.Router();

/* GET blog page. */
router.get('/add', function(req, res, next) {
  res.render('add', { title: 'Express Add Blog' });
});

router.get('/edit/:id', function(req, res, next) {
    res.render('edit', { title: 'Express Edit Blog' });
  });

module.exports = router;
