var express = require('express');
var router = express.Router();
var fs = require('fs');                 //引入node的读取文件模块
var PATH = './public/data/';            //公共路径

/* 主页 */
router.get('/', function(req, res, next) {
    if(!req.session.user){
        return res.render('login',{});
    }
    res.render('index', {});
});

/* 登录页 */
router.get('/login', function(req, res, next) {
    res.render('login', {});
});

/* 推荐页 */
router.get('/recommend', function(req, res, next) {
    if(!req.session.user){
        return res.render('login',{});
    }
    res.render('recommend', {});
});

/* 编辑页 */
router.get('/edit', function(req, res, next) {
    if(!req.session.user){
        return res.render('login',{});
    }
    var type = req.query.type;
    if(type) {
        var obj = {};
        switch (type) {
            case 'article' :
                obj = {};
                break;
            case 'it' :
                obj = {};
                break;
            case 'manager' :
                obj = {};
                break;
            case 'jocks' :
                obj = {};
                break;
            default :
                return res.send({
                    status : 0,
                    info : '参数错误'
                });
                break;
        }
        fs.readFile(PATH + type + '.json' , function(err,data) {
            if(err) {
                return res.send({
                    status : 0,
                    info : '读取数据失败'
                });
            }
            var obj = JSON.parse(data.toString());
            return res.render('edit', {
                data : obj
            });
        });
    } else {
      return res.send({
          status : 0,
          info : '参数错误'
      });
    }
});

module.exports = router;
