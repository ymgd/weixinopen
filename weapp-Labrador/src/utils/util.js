function formatNumber(n) {
  n = n.toString();
  return n[1] ? n : '0' + n;
}

export function formatTime(date) {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':');
}

export function sleep(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

export function add(a, b) {
  return a + b;
}
