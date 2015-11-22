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
  console.log('cookie: ' + JSON.stringify(req.cookies) + ' from ' + req.url);
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');
  res.setHeader('Access-Control-Allow-Credentials', true);

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
        res: true,
        val: {
          menu: {
            ess: [
              {
                name: 'baseMessage',
                text: '基本信息',
                id: 1984
              },
              {
                name: 'myPay',
                text: '我的工资',
                id: 2006
              },
              {
                name: 'myVacation',
                text: '我的休假',
                id: 569
              },
              {
                name: 'myOvertime',
                text: '我的加班',
                id: 1456
              }
            ],
            mss: [
              {
                name: 'teamMessage',
                text: '团队信息',
                id: 1
              },
              {
                name: 'leaveManagement',
                text: '请假管理',
                id: '1656',
                notification: 1
              },
              {
                name: 'overtimeManagement',
                text: '加班管理',
                id: '1666',
                notification: 1
              }
            ]
          }
        }
      });
    case 'user-message':
      return res.json({
        res: true,
        val: {
          //basicInfo: {
          //  id: 1,
          //  name: '张阿十',
          //  avatar: 'a2e0012df0916596196342a0915d6c5f.png',
          //  position: '前端设计师'
          //},
          infoList: [
            {
              title: '基本信息',
              items: [[
                {
                  name: '姓名',
                  value: '张阿十'
                },
                {
                  name: '性别',
                  value: '女'
                }
              ], [
                {
                  name: '地址',
                  value: '上海市闵行区莲花路 1733 号 D106（CDP 大楼）'
                },
                {
                  name: '电话',
                  value: '1800000000'
                }
              ]]
            },
            {
              title: '联系信息',
              items: [[
                {
                  name: '地址',
                  value: '上海市闵行区莲花路 1733 号 D106（CDP 大楼）'
                },
                {
                  name: '电话',
                  value: '1800000000'
                }
              ], [
                {
                  name: '地址',
                  value: '上海市闵行区莲花路 1733 号 D106（CDP 大楼）'
                },
                {
                  name: '电话',
                  value: '1800000000'
                }
              ]]
            }
          ]
          //workExp: [
          //  {
          //    items: [
          //      {
          //        name: '时间',
          //        value: '2007–2012'
          //      },
          //      {
          //        name: '地点',
          //        value: 'CDP'
          //      }
          //    ]
          //  },
          //  {
          //    items: [
          //      {
          //        name: '时间',
          //        value: '2012–2007'
          //      },
          //      {
          //        name: '地点',
          //        value: 'PDC'
          //      }
          //    ]
          //  }
          //]
        }
      });
    case 'salary':
      return res.json({
        res: true,
        val: {
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
        res: true,
        val: (function () {
          var base = [
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
          ];

          if (req.query.page <= 3) {
            for (var i = 0; i < 4; i += 1) {
              base = base.concat(base);
            }
          }

          return base.slice(0, 20);
        }())
      });
    case 'leave-form':
      return res.json({
        res: true,
        val: [
          {
            id: 'type',
            name: 'type',
            label: '假期类型',
            type: 'select',
            required: true,
            options: [
              {
                text: ''
              },
              {
                text: '事假',
                value: 1
              }
            ]
          },
          {
            id: 'startDate',
            name: 'startDate',
            label: '开始日期',
            type: 'date',
            half: true
          },
          {
            id: 'startTime',
            name: 'startTime',
            label: '时间',
            half: true,
            type: 'time'
          },
          {
            id: 'endDate',
            name: 'endDate',
            label: '结束日期',
            half: true,
            type: 'date'
          },
          {
            id: 'endTime',
            name: 'endTime',
            label: '时间',
            half: true,
            type: 'time'
          },
          {
            id: 'reason',
            name: 'reason',
            label: '理由',
            type: 'text'
          },
          {
            id: 'attach',
            name: 'attach',
            label: '附件',
            type: 'file'
          }
        ]
      });
    case 'leave-validation':
      return res.sendFile(__dirname + '/form-validation/leave.js');
    case 'leave-types':
      return res.json({
        res: true,
        val: [
          {
            text: '事假',
            name: 'personalAffairs'
          },
          {
            text: '病假',
            name: 'disease'
          }
        ]
      });
    case 'leave-records':
      return res.json({
        res: true,
        val: (function () {
          var base = [
            {
              id: 1,
              name: '张阿十',
              time: '2015-08-10 10:30 – 2015-08-10 18:00',
              status: 0
            },
            {
              id: 2,
              name: '张阿廿',
              time: '2015-08-10 10:30 – 2015-08-10 18:00',
              status: 1
            },
            {
              id: 3,
              name: '张阿廿',
              time: '2015-08-10 10:30 – 2015-08-10 18:00',
              status: 2
            }
          ];

          if (req.query.page <= 3) {
            for (var i = 0; i < 4; i += 1) {
              base = base.concat(base);
            }
          }

          return base.slice(0, 20);
        }())
      });
    case 'leave-record':
      return res.json({
        res: true,
        val: {
          userInfo: {
            id: 1,
            name: '张阿十',
            avatar: 'a2e0012df0916596196342a0915d6c5f.png',
            position: '前端设计师'
          },
          data: [
            {
              title: '请假明细',
              items: [
                {
                  name: '状态',
                  value: '已审批'
                },
                {
                  name: '开始时间',
                  value: '2015-10-28 10:00'
                },
                {
                  name: '结束时间',
                  value: '2015-10-28 18:00'
                },
                {
                  value: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus earum eum in obcaecati ratione, repellat sequi soluta tempora? Corporis dolore in quisquam similique. Asperiores aut est excepturi nostrum tenetur vero!'
                }
              ]
            }
            //{
            //  title: '审批意见',
            //  items: [
            //    {
            //      value: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. At cupiditate delectus deserunt, dicta error eveniet fuga ipsam ipsum magni, maxime molestiae neque placeat possimus quas quibusdam quod similique, tempora voluptas!'
            //    }
            //  ]
            //}
          ]
        }
      });
    default:
      res.json({
        res: true
      });
    }
  }, 300);
});

// POST
app.post('/:path?/:id?', multer.single('attach'), function (req, res) {
  console.log('post: ', req.body, req.file);

  switch (req.params.path) {
  case 'login':
    setTimeout(function () {
      return res.json({
        res: true,
        val: {
          company: 'cdp',
          username: 'ash',
          nickname: 'Ash'
        }
        //res: false,
        //error: '公司代码不存在'
      });
    }, 500);
    return;
  }

  setTimeout(function () {
    res.json({
      success: true
    });
  }, 100);
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