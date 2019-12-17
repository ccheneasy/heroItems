// 引入模块
const fs = require('fs');
const http = require('http');
const path = require('path')
const template = require('art-template')
const urlModel = require('url')

// 构建服务器
const app = http.createServer()
app.listen(3006,()=>{
    console.log('server is on running http://127.0.0.1:3006')
})

app.on('request',(req,res)=>{
    // 获得请求的地址和类型
    let method = req.method;
    let url = req.url;
    // 判断页面的请求
    if(method == 'GET' && (url == '/' || url == '/index' || url == '/index.html')){
        // fs.readFile(path.join(__dirname,'./views/index.html'),'utf-8',(err,data)=>{
        //     if(err) return console.log(err.message);
        //     res.end(data)
        // })
        // 先读取数据库的数据，将数据取出并json转换成数组
        fs.readFile(path.join(__dirname,'./heros.json'),(err,data)=>{
            if(err) return console.log(err.message);
            let heroArr = JSON.parse(data);
            // console.log(heroArr)
            // 导入模板引擎   注意模板引擎的参数要为对象
            let htmlStr = template(path.join(__dirname,'./views/index.html'),{data:heroArr});
            res.end(htmlStr)
        })

    }else if(method == 'GET' && (url == '/add' || url == '/add.html')){
        fs.readFile(path.join(__dirname,'./views/add.html'),'utf-8',(err,data)=>{
            if(err) return console.log(err.message);
            res.end(data)
        })
    }else if(method == 'GET' && (url == '/edit' || url == '/edit.html')){
        fs.readFile(path.join(__dirname,'./views/edit.html'),'utf-8',(err,data)=>{
            if(err) return console.log(err.message);
            res.end(data)
        })
    }else if(method == 'GET' && (url == '/info' || url == '/info.html')){
        fs.readFile(path.join(__dirname,'./views/info.html'),'utf-8',(err,data)=>{
            if(err) return console.log(err.message);
            res.end(data)
        })
    }
    // 处理页面发送的插件请求
    else if(method == 'GET' && url == '/node_modules/bootstrap/dist/css/bootstrap.css' ){
        fs.readFile(path.join(__dirname,'./node_modules/bootstrap/dist/css/bootstrap.css'),'utf-8',(err,data)=>{
            if(err) return console.log(err.message);
            res.end(data)
        })
    }else if(method == 'GET' && url == '/node_modules/jquery/dist/jquery.js' ){
        fs.readFile(path.join(__dirname,'/node_modules/jquery/dist/jquery.js'),'utf-8',(err,data)=>{
            if(err) return console.log(err.message);
            res.end(data)
        })
    }else{
        res.end('404')
    }
    
    
})