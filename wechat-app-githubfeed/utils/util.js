export default {
  timesAgo(date) {
    const currentDate = new Date();
    const ghDate = new Date(date);

    return timeDifference(currentDate.getTime(), ghDate.getTime());
  },

  // fix bug: Uncaught TypeError: Cannot read property 'apply' of undefined
  debounce: function(func, wait) {
    let timeout, context, args;

    return function() {
      context = this;
      args = arguments;
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        func.apply(context, args);
      }, wait);
    }
  }
};

const timeDifference = (current, previous) => {
  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 60;
  const msPerWeek = msPerDay * 7;
  const msPerMouth = msPerWeek * 4;
  const msPerYear = msPerMouth * 12;
  const elapsed = Math.abs(current - previous);

  switch (true) {
    case elapsed < msPerMinute:
      return Math.round(elapsed / 1000) + ' seconds age';
    case elapsed < msPerHour:
      return Math.round(elapsed / msPerMinute) + ' minutes age';
    case elapsed < msPerDay:
      return Math.round(elapsed / msPerHour) + ' hours age';
    case elapsed < msPerWeek:
      return Math.round(elapsed / msPerDay) + ' days age';
    case elapsed < msPerMouth:
      return `approximately ${Math.round(elapsed / msPerWeek)} weeks age`;
    case elapsed < msPerYear:
      return `approximately ${Math.round(elapsed / msPerMouth)} mouths age`;
    default:
      return `approximately ${Math.round(elapsed / msPerYear)} years age`;
  }
};
