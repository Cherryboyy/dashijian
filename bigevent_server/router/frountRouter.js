// 导入express
const express = require('express')
// 导入路由
const router = express.Router()
// 导入信息
const message = require('../utils/message')
// 导入数据
const db = require('../utils/db')

// 导入控制器
const categoryController = require('../controllers/category')

// 文章搜索
router.get('/search', (req, res) => {
  // 参数获取
  const key = req.query.key || ''
  const type = req.query.type || ''
  const page = req.query.page || 1
  const perpage = req.query.perpage || 6

  // 类型判断
  if (isNaN(page) || isNaN(perpage)) {
    message.invalidParameter(res)
    return
  }
  // 数据获取
  const article = db.getArticle()

  // 根据类型检索数据
})

// 评论
router.post('/post_comment', (req, res) => {
  // 参数获取
  const article_id = req.body.article_id
  const name = req.body.name
  const content = req.body.content

  const result = db.addComments({ name, content, article_id })
  if (result) {
    res.send({
      msg: '添加评论成功',
      code: 200
    })
  } else {
    res.send({
      msg: '添加评论不成功',
      code: 400
    })
  }
})

// 获取指定文章编号的评论
router.get('/get_comments', (req, res) => {
  // 参数获取
  const article_id = req.query.article_id

  const result = db.getComments({ article_id })
  if (result) {
    res.send({
      msg: '获取评论成功！',
      code: 200,
      data: result
    })
  } else {
    res.send({
      msg: '获取评论不成功',
      code: 400
    })
  }
})

// 分类获取
router.get('/category', categoryController.category_search)

// 暴露
module.exports = router
