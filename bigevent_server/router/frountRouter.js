// 导入express
const express = require('express')
// 导入路由
const router = express.Router()
// 导入信息
const message = require('../utils/message')
// 导入数据
const db = require('../utils/db')
<<<<<<< HEAD
const path = require('path')
const article = require(path.join(__dirname, '../utils/article'))
const category = require(path.join(__dirname, '../utils/category'))
const config = require(path.join(__dirname, '../utils/config'))
const moment = require('moment')
const fs = require('fs')
=======

>>>>>>> 7452ea40f7442cca49fc92a887087772016e6252
// 导入控制器
const categoryController = require('../controllers/category')

// 文章搜索
router.get('/search', (req, res) => {
<<<<<<< HEAD
  // 获取提交的数据
  const key = req.query.key || ''
  const type = req.query.type || ''
  const state = req.query.state || ''
  const page = parseInt(req.query.page || 1)
  const perpage = parseInt(req.query.perpage || 6)
  const id = req.query.id

  // 文章检索
  let articles = article.getArticle()
  // 类型筛选
  articles = articles.filter(v => {
    // 类型筛选
    const rs = []
    rs.push(type == '' ? true : v.type == type)
    rs.push(state == '' ? true : v.state == state)
    return rs.every(item => item)
  })

  // 获取分类
  const cateData = {}
  category.getCategory().map(v => {
    cateData[v.id] = v.name
  })
  // 关键字
  articles = articles
    .filter(v => {
      if (key == '') return true
      try {
        return v.title.indexOf(key) != -1 || v.content.indexOf(key) != -1
      } catch (error) {
        return false
      }
    })
    .reverse()
    .map(v => {
      let { id, title, content, cover, type, read, comment, date, state, author } = v
      if (cover.indexOf('http') == -1 && cover.indexOf(config.serverAddress) == -1) {
        cover = config.serverAddress + cover
      }
      type = cateData[type]
      return {
        id,
        title,
        content,
        cover,
        type,
        read,
        comment,
        date,
        state,
        author
      }
    })
  if (id) {
    // 如果只是id
    const editOne = articles.filter(v => {
      return v.id == id
    })[0]

    // 设置type 为id
    for (const key in cateData) {
      if (cateData[key] == editOne.type) {
        editOne.type = key
      }
    }
    if (editOne) {
      res.send({
        msg: '获取成功',
        code: 200,
        data: editOne
      })
      return
    }
  }

  // 实现分页
  const startIndex = (page - 1) * perpage
  let endIndex = startIndex + perpage
  if (endIndex > articles.length) {
    endIndex = articles.length
  }
  // 总页数
  const totalPage = Math.ceil(articles.length / perpage) || 1
  // 返回的数据
  var backData = []
  console.log(`分页 起始索引${startIndex}  结束索引${endIndex}`)
  for (let i = startIndex; i < endIndex; i++) {
    backData.push(articles[i])
  }
  res.send({
    msg: '搜索成功',
    code: 200,
    totalPage,
    page: page,
    data: backData
  })
})

// 热点图
router.get('/hotpic', (req, res) => {
  let articles = article.getArticle();
  function randomsort(a, b) {
    return Math.random()>.5 ? -1 : 1;
    //用Math.random()函数生成0~1之间的随机数与0.5比较，返回-1或1
  }
  articles.sort(randomsort);
  let data = articles.slice(0, 5).map(item => {
    return {id: item.id, title: item.title, cover: item.cover}
  });
  res.json({
    msg: '获取成功',
    code: 200,
    data
  })
});

// 文章热门排行
router.get('/rank', (req, res) => {
  let articles = article.getArticle();
  function randomsort(a, b) {
    return Math.random()>.5 ? -1 : 1;
    //用Math.random()函数生成0~1之间的随机数与0.5比较，返回-1或1
  }
  articles.sort(randomsort);
  let data = articles.slice(0, 7).map(item => {
    return {id: item.id, title: item.title}
  });
  res.json({
    msg: '获取成功',
    code: 200,
    data
  })
});

// 最新资讯
router.get('/latest', (req, res) => {
  let articles = article.getArticle();
  let categorys = category.getCategory();
  let data = articles.slice(-5);
  data.forEach((item) => {
    item.intro = item.content.replace(/[^\u4e00-\u9fa5]/g, "").replace(/\s/g, "").substr(0, 100);
    delete item.content;
    item.type = categorys.find(v => {
      console.log(v.id, item.type);
      return v.id = item.type;
    }).name;
  })
  res.json({
    code: 200,
    msg: '获取数据成功',
    data
  })
});

// 焦点关注
router.get('/focus', (req, res) => {
  let articles = article.getArticle();
  function randomsort(a, b) {
    return Math.random()>.5 ? -1 : 1;
    //用Math.random()函数生成0~1之间的随机数与0.5比较，返回-1或1
  }
  articles.sort(randomsort);
  let data = articles.slice(0, 7).map(item => {
    return {id: item.id, title: item.title}
  });
  res.json({
    msg: '获取成功',
    code: 200,
    data
  })
});

=======
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

>>>>>>> 7452ea40f7442cca49fc92a887087772016e6252
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
<<<<<<< HEAD
  // console.log(111)
=======
>>>>>>> 7452ea40f7442cca49fc92a887087772016e6252
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

<<<<<<< HEAD
// 最新评论
router.get('/latest_comment', (req, res) => {
  let comments = db.getComments();
  res.json({
    msg: '获取成功',
    code: 200,
    data: comments.slice(-6).reverse()
  });
})

// 分类获取
router.get('/category', categoryController.category_search);

// 根据id获取一篇文章，附带上一篇下一篇
router.get('/article', (req, res) => {
  if (!req.query.id) {
    res.send({msg: '缺少id参数', code: 400});
    return;
  }
  let id = req.query.id;
  let articles = article.getArticle();
  let categorys = category.getCategory();
  let data = articles.find(v => {
    return v.id == id;
  });
  if (!data) {
    res.send({code: 400, msg: '无数据'});
    return;
  }
  data.type = categorys.find(v => {
    return v.id = data.type;
  }).name;
  let next = articles.find(v => {
    return v.id > data.id;
  })
  if (next) {
    data.next = {
      id: next.id,
      title: next.title
    }
  }
  let prev = articles.reverse().find(v => {
    return v.id < data.id;
  })
  if (prev) {
    data.prev = {
      id: prev.id,
      title: prev.title
    }
  }



  res.send({
    code: 200,
    msg: '获取成功',
    data
  });
});
=======
// 分类获取
router.get('/category', categoryController.category_search)
>>>>>>> 7452ea40f7442cca49fc92a887087772016e6252

// 暴露
module.exports = router
