/*
* @Author: hanjiyun
* @Date:   2018-07-21 15:32:57
* @Last Modified by:   hanjiyun
* @Last Modified time: 2018-07-22 14:14:30
*/

const router = require('express').Router();
const Comment = require('../model/comment');

const phoneReg = /^1[34578]\d{9}$/

/* 获取留言 */
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

/* 添加留言 */
router.post('/', function(req, res) {

  const comment = req.body;

  if (!comment.user_name) {
    res.status(400).send({
      error: 1,
      message: '记得写名字哦'
    })
    return
  }

  if (!comment.phone) {
    res.status(400).send({
      error: 1,
      message: '记得写手机号哦'
    })
    return
  } else if (!phoneReg.test(comment.phone)) {
    res.status(400).send({
      error: 1,
      message: '手机号格式似乎不对'
    })
    return
  }


  if (!comment.content) {
    res.status(400).send({
      error: 1,
      message: '写点什么吧'
    })
    return
  }

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
