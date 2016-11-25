/**
 * 解读 es2015 Object.assign()
 * var o1 = { a: 1 };
 * var o2 = { b: 2 };
 * var o3 = { c: 3 };
 * var obj = Object.assign(o1, o2, o3);
 * console.log(obj); // { a: 1, b: 2, c: 3 }
 * console.log(o1);  // { a: 1, b: 2, c: 3 }, 注意目标对象 o1 自身也会改变
 */

function formatTime(date) {
	var year = date.getFullYear()
	var month = date.getMonth() + 1
	var day = date.getDate()

	var hour = date.getHours()
	var minute = date.getMinutes()
	var second = date.getSeconds()

	return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
	n = n.toString()
	return n[1] ? n : '0' + n
}

var baseUrl = 'https://api.douban.com/v2/movie/'

function fetchAPI(type, page = 1, count = 20, search = '', callback) {
	var params = {
		start: (page - 1) * count,
		count: count
	};
	if (search) {
		Object.assign(params, {
			q: search
		});
	}
	wx.request({
		url: baseUrl + type,
		data: params,
		header: {
			'Content-Type': 'application/json'
		},
		success: function (res) {
			callback(res.data);
		}
	});
}

function detail(id, callback) {
	wx.request({
		url: baseUrl + 'subject/' + id,
		data: {},
		header: {
			'Content-Type': 'application/json'
		},
		success: function (res) {
			callback(res.data);
		}
	});
}



module.exports = {
	formatTime: formatTime,
	fetchAPI: fetchAPI,
	detail: detail
}