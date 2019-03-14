var http = require('http');
var express = require('express');
var application = express();
var bodyParser = require('body-parser');
var routeConfig = require('./route-config');
var settingsConfig = require('./settings/settings-config');
var errors = require('throw.js');
var errorMessages = require('./error.config.json');

function configureWorker(application) {
  configureApplication(application);
  configureRoutes(application);
  configureErrorHandler(application);
  startServer(application);
}

function configureApplication(application) {
  application.use(bodyParser.json());

  application.use(function(req, res, next) {
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

function configureErrorHandler(application){
  application.use(function(req, res, next){
    next(new errors.NotFound('Not Found'));
  });
  application.use(function(err, req, res, next){
    if(err){
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

  server.listen(settingsConfig.settings.workerPort, settingsConfig.settings.hostName, settingsConfig.settings.queueLength, function() {
    console.log('listening at http://%s:%s', settingsConfig.settings.hostName, settingsConfig.settings.workerPort);
  });
}

configureWorker(application);