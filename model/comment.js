/*
* @Author: hanjiyun
* @Date:   2018-07-21 20:14:12
* @Last Modified by:   hanjiyun
* @Last Modified time: 2018-07-22 13:21:05
*/


const db = require('../dbconnection');

const getAllComments = () => {
  return new Promise((resolve, reject) => {
    db.query("Select * from comments", (error, results, fields) => {
      if (error) {
        reject({
          success: false,
          message: error
        })
      }

      resolve(results)
    })
  })
}

const getComments = (limit, page) => {
  return new Promise((resolve, reject) => {
    db.query("Select * from comments LIMIT ? OFFSET ?", [limit, page * limit], (error, results, fields) => {
      if (error) {
        reject({
          success: false,
          message: error
        })
      }

      resolve(results)
    })
  })
}

const getCommentById = (id) => {
  return new Promise((resolve, reject) => {
    db.query("select * from comments where id=?", [id], (error, results, fields) => {
      if (error) {
        reject({
          success: false,
          message: error
        })
      }

      resolve(results[0])
    })
  })
}

const addComment = (comment) => {
  return new Promise((resolve, reject) => {
    db.query("Insert into comments SET ?", comment, (error, results, fields) => {
      if (error) {
        reject({
          success: false,
          message: error
        })
      }

      // 获取刚添加的留言内容
      let id = results.insertId
      getCommentById(id).then(data => {
        resolve(data)
      }).catch(err => {
        reject({
          success: false,
          message: err
        })
      })

    })
  })
}

const deleteComment = (id, callback) => {
  return db.query("delete from comments where id=?", [id], callback);
}

const updateComment = (id, comment, callback) => {
  return db.query("update comments set user_name=?,phone=?,content=? where id=?", [comment.user_name, comment.phone, comment.content, comment.id], callback);
}


const Comment = {
  getAllComments,
  getComments,
  getCommentById,
  addComment,
  deleteComment,
  updateComment
};

module.exports = Comment