/**
 * Created by User on 2016/10/25.
 */

var myDate = new Date();
var month = myDate.getMonth();
var year = myDate.getFullYear();

/**
 * 月份天数表
 * @type {*[]}
 */
var dayOfMonth = [
    [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
];

/**
 * 判断当前年是否闰年
 * @param year 年
 * @returns {number}
 */
var isLeapYear = (year)=> {
    if (year % 400 == 0 || (year % 4 == 0 && year % 100 != 0))
        return 1
    else
        return 0
};

/**
 * 获取当月有多少天
 * @param year 年
 * @param month 月(未减1)
 * @returns {*}
 */
var get_day = (year, month)=> {
    return dayOfMonth[isLeapYear(year)][month];
};

Page({
    data: {
        week: ["日", "一", "二", "三", "四", "五", "六"],
        monthStart: (new Date(year, month, 1)).getDay(),
        day: get_day(year, month),
        date: year + '年'+(month+1)+'月'
    },

    switchMonth (e) {
        switch (+e.target.dataset.type) {
            case 0 :    //左切
                if (month == 0) {
                    year--;
                    month = 11;
                } else {
                    month--;
                }
                break;
            case 1 :    //右切
                if (month == 11) {
                    year++;
                    month = 0;
                } else {
                    month++;
                }
                break;
        }
        this.switchDate(year,month + 1);
    },

    //切换年月
    switchDate (y,m) {  //调用此方法切换指定时间

        //重置年月
        year = y;
        month = m - 1;
        this.setData({
            day : get_day(year, month),
            date : year + "年" + (month + 1) + "月",
            monthStart: (new Date(year, month, 1)).getDay()
        });

    },

    clickItem (e) { 
        var day = e.target.dataset.day;

        console.log(year + '年'+(month+1)+'月' + day+"日");

    },
    onLoad () {



    },

    onReady() {

        //切换年份
        // this.switchDate(2017,4);

    }
});