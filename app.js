/*
* @Author: hanjiyun
* @Date:   2018-07-21 13:36:22
* @Last Modified by:   hanjiyun
* @Last Modified time: 2018-07-21 16:34:13
*/


var express = require('express');
var app = express();
var path = require('path');
var timeout = require('connect-timeout');
var bodyParser = require('body-parser');
var compression = require('compression')
var swig = require('swig')
var cors = require('cors')
var sassMiddleware = require('node-sass-middleware');
var postcssMiddleware = require('postcss-middleware');
var autoprefixer = require('autoprefixer');

app.disable('x-powered-by');
app.use(express.static('sites'));

// Enable CORS with various options
// https://github.com/expressjs/cors
app.use(cors())

// 设置默认超时时间
app.use(timeout('15s'));

// gzip
app.use(compression())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 设置模板引擎
app.engine('html', swig.renderFile);
app.set('view engine', 'html');

// 静态文件目录
app.use(express.static('public'));

// 开发时不用缓存
app.set('view cache', false);
swig.setDefaults({ cache: false });

// 后端 API
var CommentAPI = require('./api/comment');
// 可以将一类的路由单独保存在一个文件中
app.use('/api/comment', CommentAPI);


// 样式
var srcPath = path.join(__dirname, 'huana/scss');
var destPath = path.join(__dirname, 'public/dist/css');
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


// 首页
app.get('/', function(req, res) {
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

