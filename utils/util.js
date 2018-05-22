const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
//日期格式化
Date.prototype.format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1,                 //月份
    "d+": this.getDate(),                    //日
    "h+": this.getHours(),                   //小时
    "m+": this.getMinutes(),                 //分
    "s+": this.getSeconds(),                 //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds()             //毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (k == 'S' ? milliseconds(o[k]) : o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
}

function milliseconds(num) {
  var number = num.toString();
  var len = number.length;
  while (len < 3) {
    number = '0' + number;
    len++;
  }
  return number;
}
function timeToDate(time) {
  var date = new Date(time);
  return date.format('yyyy-MM-dd hh:mm:ss');
}

function GetDateStr(currDate, AddMonthCount) {
  var dd = new Date(currDate);
  var currMonth = parseInt(dd.getMonth(), 10);
  var year = parseInt(dd.getFullYear(), 10);
  if (AddMonthCount == -1) {
    if (currMonth == 0) {
      currMonth = 12;
      year -= 1;
    } else {
      currMonth = currMonth + AddMonthCount + 1;
    }
  } else if (AddMonthCount == 1) {
    if (currMonth == 11) {
      currMonth = 1;
      year += 1;
    } else {
      currMonth = currMonth + AddMonthCount + 1;
    }
  }
  if (currMonth < 10) {
    currMonth = '0' + currMonth;
  }
  return year + '-' + currMonth;
}


module.exports = {
  formatTime: formatTime
}
