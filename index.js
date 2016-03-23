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
		case 'user-confirm':
			return res.json({
				res: true
			});
		case 'user-menu':
			//return res.sendStatus(999);
			return res.json({
				res: true,
				val: {
					menu: {
						ess: [
							{
								name: 'baseMessage',
								text: '基本信息',
								content: '查看个人信息',
								id: 1984
							},
							{
								name: 'myPay',
								text: '我的工资',
								content: '查看个人薪资',
								id: 2006
							},
							{
								name: 'myVacation',
								text: '我的休假',
								content: '查看个人休假',
								id: 569
							},
							{
								name: 'myOvertime',
								text: '我的加班',
								content: '查看个人加班',
								id: 1456
							}
						],
						mss: [
							{
								name: 'teamMessage',
								text: '团队信息',
								content: '查看团队信息',
								id: 1
							},
							{
								name: 'leaveManagement',
								text: '请假管理',
								id: '1656',
								content: '查看团队请假',
								notification: 1
							},
							{
								name: 'overtimeManagement',
								text: '加班管理',
								content: '查看团队加班',
								id: '1666',
								notification: 1
							}
						]
					},
					"picInfo": {
						"name": "René Ash Wagner",
						"empWorkId": "18820",
						"position": "Vice-President of Administration and Finance",
						"url": "../export/upload/hitachihk_emp_info_2608.jpg"
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
		case 'user-message-info-type':
			return res.json({
				"val": {
					baseType: [{
						"cmdId": 12000,
						"langCode": "portal_tab_baseinfo",
						"efnType": "p_grp_ess",
						"pla_lan": "Basic Information"
					},
						{
							"cmdId": 12005,
							"langCode": "portal_tab_social_relations",
							"efnType": "p_grp_ess",
							"pla_lan": "社会关系"
						},
						{
							"cmdId": 12001,
							"langCode": "portal_tab_contract_information",
							"efnType": "p_grp_ess",
							"pla_lan": "合同信息"
						},
						{
							"cmdId": 12007,
							"langCode": "portal_tab_ id_ information",
							"efnType": "p_grp_ess",
							"pla_lan": "证件信息"
						},
						{
							"cmdId": 12008,
							"langCode": "portal_tab_ expat_residency_rermit",
							"efnType": "p_grp_ess",
							"pla_lan": "外籍员工居留许可信息"
						}],
					picInfo: {
						"name": "著美玲",
						"empWorkId": "18820",
						"url": "../export/upload/hitachihk_emp_info_2608.jpg",
						position: '前端'
					}
				},
				"res": "true"
			});
		case 'calendar-salary':
			return res.json({
				"val": {
					"payrollData": {
						"minYear": 2015,
						"payrollPeriodList": [{
							"payResId": 36946,
							"payAccName": "hitachihk201505",
							"payPerYear": 2015,
							"payPerMon": 6
						},
							{
								"payResId": 37674,
								"payAccName": "hitachihk201507",
								"payPerYear": 2015,
								"payPerMon": 8
							},
							{
								"payResId": 35242,
								"payAccName": "hitachihk201508",
								"payPerYear": 2015,
								"payPerMon": 7
							},
							{
								"payResId": 37736,
								"payAccName": "hitachihk201509",
								"payPerYear": 2015,
								"payPerMon": 9
							},
							{
								"payResId": 37530,
								"payAccName": "hitachihk201510",
								"payPerYear": 2015,
								"payPerMon": 9
							}],
						"pointInfo": "本月无数据！"
					},
					"picInfo": {
						"name": "著美玲",
						"empWorkId": "18820",
						"url": "../export/upload/hitachihk_emp_info_2608.jpg"
					}
				},
				"res": true
			});
		case 'user-quota':
			return res.json({
				"val": [
					{
						title: '配额分类 1',
						items: [{
							"name": "员工姓名",
							"value": "罗 美文"
						}, {
							"name": "部门",
							"value": "人事总务法务部"
						}, {
							"name": "年份",
							"value": "2016"
						}, {
							"name": "QuotaType",
							"value": "调休假"
						}, {
							"name": "可取得天数",
							"value": "0.83000"
						}, {
							"name": "已取得天数",
							"value": "0.5"
						}, {
							"name": "剩余天数",
							"value": "0.33"
						}]
					},
					{
						title: '配额分类 2',
						items: [{
							"name": "员工姓名",
							"value": "罗 美文"
						}, {
							"name": "部门",
							"value": "人事总务法务部"
						}, {
							"name": "年份",
							"value": "2016"
						}, {
							"name": "QuotaType",
							"value": "年假"
						}, {
							"name": "可取得天数",
							"value": "0.83000"
						}, {
							"name": "已取得天数",
							"value": "0.5"
						}, {
							"name": "剩余天数",
							"value": "0.33"
						}]
					}
				],
				"res": true
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
		case 'ess-lv-list':
			return res.json({
				res: true,
				val: (function () {
					var base = [{
						"id": 2,
						"End": "2015/09/22",
						"Start": "2015/09/22",
						"hours": "7.5",
						"Type": "婚假",
						"state": "审批中"
					}, {
						"id": 7,
						"End": "2015/10/15",
						"Start": "2015/10/14",
						"hours": "15",
						"Type": "年度带薪休假",
						"state": "审批中"
					}, {
						"id": 6,
						"End": "2015/09/24",
						"Start": "2015/09/24",
						"hours": "7.5",
						"Type": "年度带薪休假",
						"state": "审批中"
					}, {
						"id": 9,
						"End": "2015/11/30",
						"Start": "2015/11/27",
						"hours": "15",
						"Type": "晚婚假",
						"state": "审批中"
					}];

					if (req.query.page <= 3) {
						for (var i = 0; i < 4; i += 1) {
							base = base.concat(base);
						}
					}

					return base.slice(0, 20);
				}())
			});
		case 'ess-lv-detail':
			return res.json({
					"val": [{
						"title": "审批信息",
						"items": [{
							"firField": "审批人",
							"secField": "海 天"
						}, {
							"firField": "状态",
							"secField": "审批中"
						}, {
							"firField": "审批人",
							"secField": "李 康"
						}, {
							"firField": "状态",
							"secField": "待审批"
						}]
					}, {
						"title": "单据信息",
						"items": [{
							"firField": "员工姓名",
							"secField": "刘 天"
						}, {
							"firField": "审批状态",
							"secField": "审批中"
						}, {
							"firField": "休暇型名",
							"secField": "晚婚假"
						}, {
							"firField": "开始时间",
							"secField": "2015/11/27 09:00:00"
						}, {
							"firField": "结束时间",
							"secField": "2015/11/30 17:30:00"
						}, {
							"firField": "休假小时数",
							"secField": "15"
						}, {
							"firField": "申请日期",
							"secField": "2015/11/09"
						}, {
							"firField": "休假理由",
							"secField": "test"
						}]
					}],
					"res": true
				}
			);
		case 'ess-lv-summary':
			return res.json({
				"val": [{
					"title": "婚假",
					"items": [{
						"firField": "审批中",
						"secField": "7.5"
					}]
				}, {
					"title": "年度带薪休假",
					"items": [{
						"firField": "编辑中",
						"secField": "7.5"
					}, {
						"firField": "审批中",
						"secField": "22.5"
					}, {
						"firField": "已批准",
						"secField": "15"
					}]
				}, {
					"title": "晚婚假",
					"items": [{
						"firField": "审批中",
						"secField": "15"
					}]
				}],
				"res": true
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
		return res.json({
			res: true,
			val: {
				lang: [{
					"langCode": "pla_lan_001",
					"langName": "简体中文",
					"flag": true
				}, {
					"langCode": "pla_lan_002",
					"langName": "English",
					"flag": false
				}],
				"userInfo": {
					"companyCode": "hitachihk-1000",
					"userName": "reese",
					"passWord": null,
					"valid": "true",
					"userTime": 30,
					"userFlag": 1,  // 0 为初次登录
					"userInitFlag": 1,  // 0 为需要修改密码
					"userMail": "mtse@hitachi.cn",
					"phone": "14785296321",
					"lang": "pla_lan_001",
					"sysSip": null,
					"eeId": null,
					"useMss": 1719,
					"useEss": 1718,
					"userEmpId": 2608,
					"userId": 2066,
					"portalUser": false,
					"objectCode": null
				}
			}
			//res: false,
			//error: '公司代码不存在',
			//val: {
			//  company: 'CDP'
			//}
		});
	case 'change-lang':
		return setTimeout(() => {
			res.json({
				res: true,
				val: 'pla_lan_002'
			});
		}, 100);
	case 'user-base-message-info':
		return setTimeout(function () {
			res.json({
				"val": {
					"items": [[{
						"name": "Join Date",
						"value": "1988-06-01"
					},
						{
							"name": "E-mailE-mailE-mailE-mailE-mailE-mailE-mailE-mailE-mail",
							"value": "mtse@hitachi.cmtse@hitachi.cmtse@hitachi.cmtse@hitachi.cmtse@hitachi.cmtse@hitachi.cmtse@hitachi.cmtse@hitachi.cn"
						},
						{
							"name": "Account Code",
							"value": "0040315725267"
						},
						{
							"name": "Bank",
							"value": "004"
						},
						{
							"name": "Cost Center",
							"value": "HK-IFG-GM2-HK"
						},
						{
							"name": "Owner's Name",
							"value": "TSE, Mei Ling, May"
						},
						{
							"name": "Legal Company",
							"value": "HCH"
						},
						{
							"name": "Branch",
							"value": "HK"
						},
						{
							"name": "Department",
							"value": "IFG"
						},
						{
							"name": "Position",
							"value": "Manager"
						},
						{
							"name": "Personal ID",
							"value": "C254404(9)"
						},
						{
							"name": "Residential Address",
							"value": "Flat 3702, Shing Yam House, On Yan Estate, Kwai Chung, New Territories"
						},
						{
							"name": "Service Year",
							"value": "27.46"
						},
						{
							"name": "Employee ID",
							"value": "18820"
						},
						{
							"name": "English Name",
							"value": "TSE, Mei Ling, May"
						},
						{
							"name": "Chinese Name",
							"value": "美玲"
						},
						{
							"name": "Nationality",
							"value": "China"
						},
						{
							"name": "Age",
							"value": "53"
						}]]
				},
				"res": "true"
			});
		}, 2000);
	case 'salary':
		return res.json({
			"val": {
				"infoList": [
					{
						"title": "eps_basic_info",
						"items": [{
							"name": "Employee ID",
							"value": "18820"
						}, {
							"name": "Chinese Name",
							"value": "�x美玲"
						},
							{
								"name": "English Name",
								"value": "TSE, Mei Ling, May"
							}, {
								"name": "Company Name",
								"value": "Hitachi East Asia Ltd."
							},
							{
								"name": "Department",
								"value": "IFG"
							}, {
								"name": "Position",
								"value": "Manager"
							}, {
								"name": "Join Date",
								"value": "1988-06-01"
							},
							{
								"name": "Pay Month",
								"value": "201510"
							}]
					}, {
						"title": "eps_earning_deduction",
						"items": [{
							"name": "Gross Earnings",
							"value": "32970.00"
						},
							{
								"name": "Gross Deductions",
								"value": "1648.50"
							}]
					}, {
						"title": "eps_net_pay",
						"items": [{
							"name": "Net Pay",
							"value": "31321.50"
						}]
					},
					{
						"title": "eps_mpf_orso",
						"items": [{
							"name": "Issue Date",
							"value": "2015-10-31"
						}, {
							"name": "Relevant Income",
							"value": "32970.00"
						},
							{
								"name": "ORSO(Company)",
								"value": "2307.90"
							}, {
								"name": "ORSO(Employee)",
								"value": "1648.50"
							}, {
								"name": "Mandatory(Company)",
								"value": "0.00"
							},
							{
								"name": "Mandatory(Employee)",
								"value": "0.00"
							}, {
								"name": "Voluntary(Company)",
								"value": "0.00"
							}]
					},
					{
						"title": "eps_attendance",
						"items": [{
							"name": "Overtime Hours",
							"value": "0.00"
						}, {
							"name": "Early/Late/Personal Affaire Minutes",
							"value": "0.00"
						},
							{
								"name": "No Pay Leave Days",
								"value": "0.00"
							}, {
								"name": "4/5 Pay Sick Leave Days",
								"value": "0.00"
							}, {
								"name": "Maternity Leave Days",
								"value": "0.00"
							},
							{
								"name": "Paternity Leave Days",
								"value": "0.00"
							}]
					}, {
						"title": "eps_earnings",
						"items": [{
							"name": "Basic Salary",
							"value": "32970.00"
						},
							{
								"name": "Living Allowance",
								"value": "0.00"
							}, {
								"name": "Housing Allowance",
								"value": "0.00"
							}, {
								"name": "Transportation Allowance",
								"value": "0.00"
							},
							{
								"name": "Language Allowance",
								"value": "0.00"
							}, {
								"name": "Child Education Allowance",
								"value": "0.00"
							}, {
								"name": "Home Return Allowance",
								"value": "0.00"
							},
							{
								"name": "Overtime Fee",
								"value": "0.00"
							}, {
								"name": "Severance Payment",
								"value": "0.00"
							}, {
								"name": "Long Service Payment",
								"value": "0.00"
							},
							{
								"name": "Payment in lieu of Notice",
								"value": "0.00"
							}, {
								"name": "Shortage Adjustment",
								"value": "0.00"
							}, {
								"name": "Bonus",
								"value": "0.00"
							},
							{
								"name": "Double Pay",
								"value": "0.00"
							}, {
								"name": "Special Bonus",
								"value": "0.00"
							}]
					},
					{
						"title": "eps_deductions",
						"items": [{
							"name": "No Pay Absence Deduction",
							"value": "0.00"
						}, {
							"name": "No Pay Leave Deduction",
							"value": "0.00"
						},
							{
								"name": "Sick Leave Deduction",
								"value": "0.00"
							}, {
								"name": "Maternity Leave Deduction",
								"value": "0.00"
							}, {
								"name": "Paternity Leave Deduction",
								"value": "0.00"
							},
							{
								"name": "ORSO/MPF Deduction",
								"value": "1648.50"
							}, {
								"name": "Loan Repay",
								"value": "0.00"
							}, {
								"name": "Deduction in Lieu of Notice",
								"value": "0.00"
							}]
					}],
				//"payCharts": ""
				"payCharts": [{
					"payrollChartsName": "NetMonthly Income",
					"payrollTotal": 11287.9
				}, {
					"payrollChartsName": "NetMonthly Outcome",
					"payrollTotal": 11287.9
				}]
			},
			"res": true
		});
	case 'team-info-page':
		return res.json({
			res: true,
			val: (function () {
				var base = [
					{
						id: 1,
						firField: '张阿十',
						avatar: 'a2e0012df0916596196342a0915d6c5f.png',
						secField: '前端设计师'
					},
					{
						id: 2,
						firField: '张阿廿',
						avatar: 'a2e0012df0916596196342a0915d6c5f.png',
						secField: '前端服务员'
					}
				];

				if (req.body.page <= 3) {
					for (var i = 0; i < 4; i += 1) {
						base = base.concat(base);
					}
				}

				return base.slice(0, 20);
			}())
		});
	case 'quota-team-member':
		return res.json({
			"val": [{
				"secField": "生活产业事业部",
				"id": 12000014,
				"firField": "曾 晖"
			}, {
				"secField": "财务会计审查部",
				"id": 12000015,
				"firField": "谢 颖"
			}, {
				"secField": "泛用·聚氨酯涂料化学品部",
				"id": 12000017,
				"firField": "林 光晓"
			}, {
				"secField": "聚氯乙烯树脂部",
				"id": 12000019,
				"firField": "杨 思慧"
			}, {
				"secField": "人事总务法务部",
				"id": 12000020,
				"firField": "张 月华"
			}, {
				"secField": "泛用·聚氨酯涂料化学品部",
				"id": 12000021,
				"firField": "吴 军"
			}, {
				"secField": "生活产业事业部",
				"id": 12000022,
				"firField": "李 晓琼"
			}, {
				"secField": "聚氯乙烯树脂部",
				"id": 12000024,
				"firField": "刘 湘"
			}, {
				"secField": "财务会计审查部",
				"id": 12000025,
				"firField": "麦 智莹"
			}, {
				"secField": "能源部",
				"id": 12000028,
				"firField": "邵 远志"
			}],
			"res": true
		});
		return;
	}

	setTimeout(function () {
		res.json({
			res: true
		});
	}, 100);
});

// PUT
app.put('/:path?', function (req, res) {
	console.log('put: ', req.body);

	res.json({
		res: true
	});
});

// DELETE
app.delete('/:path?', function (req, res) {
	console.log('delete: ', req.body);

	res.json({
		res: true
	});
});


// Listening
// ---------------------------

app.listen(app.get('port'), function () {
	console.log('Listening at port: ' + app.get('port'));
});