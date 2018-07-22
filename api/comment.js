/*
* @Author: hanjiyun
* @Date:   2018-07-21 15:32:57
* @Last Modified by:   hanjiyun
* @Last Modified time: 2018-07-22 13:21:15
*/

var router = require('express').Router();
var Comment = require('../model/comment');

router.get('/', function(req, res) {

  const page = parseInt(Math.abs(req.query.page - 1), 10) || 0;
  const limit = parseInt(Math.abs(req.query.limit), 10) || 5;

  Comment.getComments(limit, page)
    .then(data => res.status(200).json({
      error: 0,
      message: 'ok',
      data: data
    }))
    .catch(err => {
      console.log('出错了', err)
      res.status(500).send(err)
    });
});


router.post('/', function(req, res) {
  const comment = req.body;
  Comment.addComment(comment)
    .then(data => res.status(200).json({
      error: 0,
      message: 'ok',
      data: data
    }))
    .catch(err => {
      console.log('出错了', err)
      res.status(500).send(err)
    });

});


module.exports = router
