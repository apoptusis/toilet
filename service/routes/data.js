var express = require('express');
var router = express.Router();
var fs = require('fs');                 //引入node的读取文件模块
var PATH = './public/data/';            //公共路径

/*************************************
 *   1.数据读取模块：客户端调用
 ************************************/
router.get('/read', function(req, res, next) {
    //通过req对象，获取url中type的参数，默认为空
    var type = req.param('type') || '';
    //读取文件信息
    fs.readFile(PATH + type + '.json', function(err, data) {
        if(err){
            return res.send({
               status : 0,
               info : '读取文件出现异常'
            });
        }
        //最大json数目为50
        var COUNT = 50;
        //try catch，防止非json文件解析成字符串
        var obj = [];
        try{
            //将json文件解析为字符串
            obj = JSON.parse(data.toString());
        } catch(e) {
            obj = [];
        }
        //长度大于50，截取前面50条数据
        if(obj.length > COUNT) {
            obj = obj.slice(0,COUNT);
        }
        //返回json的数据
        return res.send({
            status : 1,
            data : obj
        });
    });
});

/*************************************
 *   2.数据存储模块：后台开发使用
 ************************************/
router.post('/write',function (req, res, next) {
    if(!req.session.user){
        return res.send({
            status : 0,
            info : '请先登录'
        });
    }
    // 获取url中各个字段
    var type = req.param('type') || '';
    var url = req.param('url') || '';
    var title = req.param('title') || '';
    var img = req.param('img') || '';
    // 判断每个字段必须非空
    if(!type || !url || !title || !img ) {
        return res.send({
            status : 0,
            info : '提交字段不全'
        });
    }
    var filePath = PATH + type + '.json';
    //1. 读取文件信息
    fs.readFile(filePath,function (err, data) {
        if(err) {
            return res.send({
                status : 0,
                info : '读取数据失败'
            });
        }
        var arr = JSON.parse(data.toString());
        var obj = {
            img : img,
            url : url,
            title : title,
            id : guidGenerate(),
            time : new Date()
        };
        //将数据插入数组最前
        arr.splice(0, 0, obj);
    //2. 写入文件
        var newData = JSON.stringify(arr);
        fs.writeFile (filePath, newData, function (err, data) {
            if(err) {
                return res.send({
                    status : 0,
                    info : '写入文件失败'
                });
            }
            return res.send({
                status : 1,
                info : obj
            });
        });
    });


});

/*************************************
 *   3.配置写入接口：后台开发使用
 ************************************/
router.post('/write_config',function (req, res, next) {
    if(!req.session.user){
        return res.send({
            status : 0,
            info : '请先登录'
        });
    }
    // TODO:后期进行数据提交的验证
    // 防xss攻击:
    // npm install xss
    // require('xss')
    // var str = xss()
    var data = req.body.data;
    // TODO: try catch
    var obj = JSON.parse(data);
    var newData = JSON.stringify(obj);
    //写入
    fs.writeFile(PATH + 'config' + '.json' , newData , function (err) {
        if(err) {
            return res.send({
                status : 0,
                info : '写入数据失败'
            });
        }
        return res.send({
            status : 1,
            info : obj
        });
    });
});

/*************************************
 *   4.登录接口
 ************************************/
router.post('/login',function (req, res, next) {
    // 用户名、密码
    var username = req.body.username;
    var password = req.body.password;

    // TODO:用户名密码的校验和验证码
    // xss处理，空字符串判断
    // 密码加密，md5(md5(password + salt))
    if ( username === 'admin' && password === '123456' ) {
        req.session.user = {
            username : username
        };
        return res.send({
            status : 1,
            info : '登录成功'
        });
    }
    return res.send({
        status : 0,
        info : '登录失败'
    });

});

//通用的生成guid的函数
function guidGenerate() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxx'.replace(/[xy]/g,function (c) {
        var r = Math.random() * 16 | 0 ,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return  v.toString(16);
    }).toUpperCase();
}
module.exports = router;