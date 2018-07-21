/*
* @Author: hanjiyun
* @Date:   2018-07-21 15:32:57
* @Last Modified by:   hanjiyun
* @Last Modified time: 2018-07-21 15:50:31
*/

var router = require('express').Router();

router.get('/', function(req, res) {
  res.status(200).json({
    error: 0,
    message: 'ok'
  })
})

module.exports = router