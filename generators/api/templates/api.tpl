/**
 * api: <%= apiName %>
 */
var express = require('express');
var router = express.Router();

var reqPath = '/<%= reqPath %>';

//define the api
//TODO: type可以多种
router.<%= type %>(reqPath, function (req, res, next){
  res.json({
    code:0,
    msg: 'ok',
    data:{
      name: 'test api'
    }
  })
})

module.exports = router;
