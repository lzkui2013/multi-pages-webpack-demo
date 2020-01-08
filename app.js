const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
let app = express();
// 为了能够让别的方法中可以直接调用到 app 实例，需要将app实例提前exports
exports = module.exports = app;
let routes = require('./routes/routes');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/', routes);
app.use(express.static('./dist'));
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    logger.error('从error handler中捕获的错误');
    logger.error(err);
    res.render('error/404');
});