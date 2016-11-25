import MMCalendar from '../../utils/MMCalendar.js'
var calendar = new MMCalendar();

Page({
  today: new Date(),
  offsetOfMonth: 0,

  daysOfPreMonth: null,
  daysOfCurrentMonth: null,
  daysOfNextMonth: null,

  data: {
    daysOfPreMonth: null,
    daysOfCurrentMonth: null,
    daysOfNextMonth: null,
    dataForRenderMonth: null,
  },

  buildDays: function() {
    // 当前月
    var yearOfCurrentMonth = this.today.getFullYear();
    var currentMonth = this.today.getMonth() + this.offsetOfMonth; // 0-11

    if(currentMonth < 0) {
      while(currentMonth < 0) {
        currentMonth += 12;
        yearOfCurrentMonth - 1;
      }
    } else if (currentMonth > 11) {
      while(currentMonth > 11) {
        currentMonth -= 12;
        yearOfCurrentMonth + 1;
      }
    }
    this.daysOfCurrentMonth = calendar.getDaysForMonth(yearOfCurrentMonth, currentMonth);

    var dayInCurrentMonth = this.daysOfCurrentMonth.firstDay;
    this.buildPreMonth(dayInCurrentMonth);
    this.buildNextMonth(dayInCurrentMonth);

    this.refreshCalendar(this.daysOfPreMonth, this.daysOfCurrentMonth, this.daysOfNextMonth);
  },

  buildPreMonth(date) {
    var yearOfPreMonth = date.getFullYear();
    var preMonth = date.getMonth() - 1;
    if (preMonth < 0) {
      preMonth = 11;
      yearOfPreMonth = yearOfCurrentMonth - 1;
    }
    this.daysOfPreMonth = calendar.getDaysForMonth(yearOfPreMonth, preMonth);
  },

  buildNextMonth(date) {
    var yearOfNextMonth = date.getFullYear();
    var nextMonth = date.getMonth() + 1;
    if (nextMonth > 11) {
      nextMonth = 0;
      yearOfNextMonth = currentYear + 1;
    }
    this.daysOfNextMonth = calendar.getDaysForMonth(yearOfNextMonth, nextMonth);
  },

  moveToPrevious() {
    this.daysOfNextMonth = this.daysOfCurrentMonth;
    this.daysOfCurrentMonth = this.daysOfPreMonth;
    this.buildPreMonth(this.daysOfCurrentMonth.firstDay);
    this.setData({
      daysOfPreMonth: this.daysOfPreMonth,
      daysOfCurrentMonth: this.daysOfCurrentMonth,
      daysOfNextMonth: this.daysOfNextMonth,
    });
  },

  moveToNext() {
    this.daysOfPreMonth = this.daysOfCurrentMonth;
    this.daysOfCurrentMonth = this.daysOfNextMonth;
    this.buildNextMonth(this.daysOfCurrentMonth.firstDay);
    this.setData({
      daysOfPreMonth: this.daysOfPreMonth,
      daysOfCurrentMonth: this.daysOfCurrentMonth,
      daysOfNextMonth: this.daysOfNextMonth,
    });
  },

  refreshCalendar: function(daysOfPreMonth, daysOfCurrentMonth, daysOfNextMonth) {
    var windowWidth = getApp().globalData.systemInfo.windowWidth - 44 * 2;
    var itemCountEachRow = 7;
	  var margin = 0;
    var itemSize = (windowWidth - itemCountEachRow * 2 * margin) / itemCountEachRow;

    var numberOfLines = this.numberOfLinesForMonth(this.daysOfCurrentMonth);
    var cellArray = [];
    for (var k = 0; k < numberOfLines * 7; ++k) {
      cellArray.push(k);
    }

    this.setData({
      dataForRenderMonth: {cellArray: cellArray, numberOfLines: numberOfLines},
      daysOfCurrentMonth: this.daysOfCurrentMonth,
      margin : margin,
      itemSize : itemSize
    });
  },

  numberOfLinesForMonth: function(daysOfMonth) {
    return Math.ceil((daysOfMonth.numberOfDays + daysOfMonth.indexOfFirstDay) / 7);
  },

  onLoad: function(options) {
    // Do some initialize when page load.
    this.buildDays();
  },
  onReady: function() {
    // Do something when page ready.
  },
  onShow: function() {
    // Do something when page show.
    // wx.setNavigationBarTitle = "第1页";
  },
  onHide: function() {
    // Do something when page hide.
  },
  onUnload: function() {
    // Do something when page close.
  },
  onPullDownRefresh: function() {
    // Do something when pull down
  }
})