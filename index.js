/**
 * Development server
 */


'use strict';

var path = require('path'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    express = require('express'),
    multer = require('multer')(),
    app = express(),
    PORT = 9090;


// Settings
// ---------------------------

app.disable('x-powered-by');
app.set('port', process.env.PORT || PORT);
app.use(cookieParser());
app.use(express.static(__dirname + '/build'));


// Middleware
// ---------------------------

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());


// REST API
// ---------------------------

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Origin', '*');

  next();
});

// GET
app.get('/:path?', function (req, res) {
  var path = req.params.path;

  if (!path) {
    return res.sendFile(__dirname + '/build/index.html');
  }

  switch (path) {
  case 'user-menu':
    return res.json({
      success: true,
      data: {
        identity: 2,
        menu: {
          employee: [
            {
              name: 'profile'
            },
            {
              name: 'mySalary'
            },
            {
              name: 'myLeave'
            },
            {
              name: 'myOT'
            }
          ],
          manager: [
            {
              name: 'teamProfile'
            },
            {
              name: 'leaveMgr',
              notification: 1
            },
            {
              name: 'otMgr',
              notification: 1
            }
          ]
        }
      }
    });
  default:
    res.json({
      success: true
    });
  }
});

// POST
app.post('/:path?', multer.array(), function (req, res) {
  console.log('post: ', req.body);

  switch (req.params.path) {
  case 'login':
    setTimeout(function () {
      return res.json({
        success: true,
        data: {
          company: 'cdp',
          username: 'ash',
          nickname: 'Ash'
        }
      });
    }, 1000);
    return;
  }

  setTimeout(function () {
    res.json({
      success: true
    });
  }, 1000);
});

// PUT
app.put('/:path?', function (req, res) {
  console.log('put: ', req.body);

  res.json({
    success: true
  });
});

// DELETE
app.delete('/:path?', function (req, res) {
  console.log('delete: ', req.body);

  res.json({
    success: true
  });
});


// Listening
// ---------------------------

app.listen(app.get('port'), function () {
  console.log('Listening at port: ' + app.get('port'));
});