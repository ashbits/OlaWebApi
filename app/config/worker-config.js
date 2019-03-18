var http = require('http');
var express = require('express');
var favicon = require('serve-favicon');
var path = require('path');
var application = express();
var bodyParser = require('body-parser');
var routeConfig = require('./route-config');
var settingsConfig = require('./settings/settings-config');
// var cors = require('cors');
var errors = require('throw.js');

function configureWorker(application) {
  // application.use(cors());
  require('dotenv').config();
  configureApplication(application);
  configureRoutes(application);
  configureErrorHandler(application);
  startServer(application);
}

function configureApplication(application) {
  application.use(bodyParser.json());
  application.use(favicon(path.join(__dirname, '../../app/public', 'favicon.ico')));
  application.use(express.static(__dirname + '../../client'));
  application.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '../../client/index.html'));
  });
  application.use(function (req, res, next) {
    console.log('requested API : ' + req.url);
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
    res.type('application/json');
    next();
  });
}

function configureRoutes(application) {
  routeConfig.registerRoutes(application);
}

function configureErrorHandler(application) {
  application.use(function (req, res, next) {
    next(new errors.NotFound('Not Found'));
  });
  application.use(function (err, req, res, next) {
    if (err) {
      console.error('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Error for Request<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
      console.error('requested API : ' + req.url);
      console.error('method : ' + req.method);
      console.error('request body : ');
      console.error(req.body);
      console.error('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Error stack<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
      console.error(err);
      console.error('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>End of error<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
      if (settingsConfig.settings.environment === 'prod' ||
        settingsConfig.settings.environment === 'beta') {
        //deletes the stack if it is prod or beta envoironment.
        //As stack is just for devlopment purpose.
        delete err.stack;
      }
      res.status(err.statusCode || err.status || 500).json(err);
    }
  });
}

function startServer(application) {
  var server = http.createServer(application);

  server.listen(settingsConfig.settings.workerPort, settingsConfig.settings.hostName, settingsConfig.settings.queueLength, function () {
    console.log('listening at http://%s:%s', settingsConfig.settings.hostName, settingsConfig.settings.workerPort);
  });
}

configureWorker(application);