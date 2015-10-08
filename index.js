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
app.get('/:path?/:any?', function (req, res) {
  var path = req.params.path;

  if (!path) {
    return res.sendFile(__dirname + '/build/index.html');
  }

  setTimeout(function () {
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
              }
              //{
              //  name: 'mySalary'
              //},
              //{
              //  name: 'myLeave'
              //},
              //{
              //  name: 'myOT'
              //}
            ],
            manager: [
              //{
              //  name: 'teamProfile'
              //},
              //{
              //  name: 'leaveMgr',
              //  notification: 1
              //},
              //{
              //  name: 'otMgr',
              //  notification: 1
              //}
            ]
          }
        }
      });
    case 'profile':
      return res.json({
        success: true,
        data: {
          basicInfo: {
            id: 1,
            name: '张阿十',
            avatar: 'a2e0012df0916596196342a0915d6c5f.png',
            position: '前端设计师'
          },
          infoList: [
            {
              title: '基本信息',
              items: [
                {
                  name: '姓名',
                  value: '张阿十'
                },
                {
                  name: '性别',
                  value: '女'
                }
              ]
            },
            {
              title: '联系信息',
              items: [
                {
                  name: '地址',
                  value: '上海市闵行区莲花路 1733 号 D106（CDP 大楼）'
                },
                {
                  name: '电话',
                  value: '1800000000'
                }
              ]
            }
          ],
          workExp: [
            {
              items: [
                {
                  name: '时间',
                  value: '2007–2012'
                },
                {
                  name: '地点',
                  value: 'CDP'
                }
              ]
            },
            {
              items: [
                {
                  name: '时间',
                  value: '2012–2007'
                },
                {
                  name: '地点',
                  value: 'PDC'
                }
              ]
            }
          ]
        }
      });
    case 'salary':
      return res.json({
        success: true,
        data: {
          basicInfo: {
            id: 1,
            name: '张阿十',
            avatar: 'a2e0012df0916596196342a0915d6c5f.png',
            position: '前端设计师'
          },
          total: 7000,
          infoList: [
            {
              title: '发放',
              items: [
                {
                  name: '基本工资',
                  value: '10000'
                },
                {
                  name: '奖金',
                  value: '1000'
                }
              ]
            },
            {
              title: '扣减',
              items: [
                {
                  name: '个人所得税',
                  value: '2000'
                },
                {
                  name: '四金',
                  value: '2000'
                }
              ]
            }
          ]
        }
      });
    case 'team-members':
      return res.json({
        success: true,
        data: [
          {
            id: 1,
            name: '张阿十',
            avatar: 'a2e0012df0916596196342a0915d6c5f.png',
            position: '前端设计师'
          },
          {
            id: 2,
            name: '张阿廿',
            avatar: 'a2e0012df0916596196342a0915d6c5f.png',
            position: '前端服务员'
          }
        ]
      });
    default:
      res.json({
        success: true
      });
    }
  }, 100);
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