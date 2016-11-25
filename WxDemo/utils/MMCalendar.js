
class MMCalendar {
    constructor() {
    }

    getNumberOfDaysForMonth(year, month) {
        var monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) {
            monthDays[1] = 29;
        }
        return monthDays[month];
    }

    getDaysForMonth(year, month) {
        var numberOfDays = this.getNumberOfDaysForMonth(year, month);
        var firstDay = new Date(year, month, 1);
        var indexOfFirstDay = firstDay.getUTCDay();     // 0-6
        return {
                numberOfDays : numberOfDays,
                firstDay : firstDay,
                indexOfFirstDay : indexOfFirstDay
            };
    }
};

export default MMCalendar;