var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/buena_onda', function(req, res, next) {
  res.render('users/bo', { grupo: '5B'});
});

module.exports = router;
