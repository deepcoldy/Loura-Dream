/*
* @Author: hanjiyun
* @Date:   2018-07-21 13:36:22
* @Last Modified by:   hanjiyun
* @Last Modified time: 2018-07-21 14:44:47
*/


var express = require('express');
var path = require('path');
var app = express();
var swig = require('swig')

var sassMiddleware = require('node-sass-middleware');
var postcssMiddleware = require('postcss-middleware');
var autoprefixer = require('autoprefixer');

app.disable('x-powered-by');
app.use(express.static('sites'));


// 设置模板引擎
app.engine('html', swig.renderFile);
app.set('view engine', 'html');

// 静态文件目录
app.use(express.static('huana'));

// 不用缓存
app.set('view cache', false);
swig.setDefaults({ cache: false });


var srcPath = path.join(__dirname, 'huana/scss');
var destPath = path.join(__dirname, 'huana/dist/css');

app.use('/stylesheets', sassMiddleware({
    /* Options */
    src: srcPath,
    dest: destPath,
    debug: true,
    outputStyle: 'compressed',
    // prefix:  '/prefix'  // Where prefix is at <link rel="stylesheets" href="prefix/style.css"/>
}));

app.use('/stylesheets', postcssMiddleware({
  plugins: [
    // Plugins
    autoprefixer({
      browsers: [
        "ie 8",
        "safari >= 3",
        "chrome >= 34"
      ]
    })
  ],
  src: function(req) {
    return path.join(destPath, req.url);
  }
}));



app.get('/huana', function(req, res) {
  var viewdata = {
    currentTime: new Date() + '',

    comments: [{
      user_name: '小张',
      comment: '这是一条留言'
    }, {
      user_name: '小王',
      comment: '这是一条留言'
    }]
  };

  res.render(`${__dirname}/huana/templates/index.html`, viewdata);
});



// error handlers
app.use(function(err, req, res, next) {
  if (req.timedout && req.headers.upgrade === 'websocket') {
    // 忽略 websocket 的超时
    return;
  }

  var statusCode = err.status || 500;
  if (statusCode === 500) {
    console.error(err.stack || err);
  }
  if (req.timedout) {
    console.error('请求超时: url=%s, timeout=%d, 请确认方法执行耗时很长，或没有正确的 response 回调。', req.originalUrl, err.timeout);
  }
  res.status(statusCode);
  // 默认不输出异常详情
  var error = {};
  if (app.get('env') === 'development') {
    // 如果是开发环境，则将异常堆栈输出到页面，方便开发调试
    error = err;
  }
  res.render(`${__dirname}/huana/templates/error.html`, {
    message: err.message,
    error: error
  });
});


var PORT = parseInt(process.env.PORT || 3100);

app.listen(PORT, function (err) {
  console.log('Node app is running on port:', PORT);

  // 注册全局未捕获异常处理器
  process.on('uncaughtException', function(err) {
    console.error('Caught exception:', err.stack);
  });
  process.on('unhandledRejection', function(reason, p) {
    console.error('Unhandled Rejection at: Promise ', p, ' reason: ', reason.stack);
  });
});

