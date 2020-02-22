// date2LocalString(new Date, 'yyyy-MM-dd hh:mm:ss')
export const date2LocalString = function(oldDateTime: string | Date, format: string) {
  // console.debug(typeof oldDateTime)
  let dt = null;
  if (typeof oldDateTime === "string") {
    dt = new Date(oldDateTime);
  } else {
    dt = oldDateTime;
  }
  var date: any = {
    "M+": dt.getMonth() + 1,
    "d+": dt.getDate(),
    "h+": dt.getHours(),
    "m+": dt.getMinutes(),
    "s+": dt.getSeconds(),
    "q+": Math.floor((dt.getMonth() + 3) / 3),
    "S+": dt.getMilliseconds(),
  };
  if (/(y+)/i.test(format)) {
    format = format.replace(RegExp.$1, (dt.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (let k in date) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? date[k] : ("00" + date[k]).substr(("" + date[k]).length),
      );
    }
  }
  return format;
};

// date2UTCString(new Date, 'yyyy-MM-dd hh:mm:ss')
export const date2UTCString = function(dt: Date, format: string) {
  dt = new Date(dt.valueOf() + 1000 * 3600 * 8);
  var date: any = {
    "M+": dt.getMonth() + 1,
    "d+": dt.getDate(),
    "h+": dt.getHours(),
    "m+": dt.getMinutes(),
    "s+": dt.getSeconds(),
    "q+": Math.floor((dt.getMonth() + 3) / 3),
    "S+": dt.getMilliseconds(),
  };
  if (/(y+)/i.test(format)) {
    format = format.replace(RegExp.$1, (dt.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in date) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? date[k] : ("00" + date[k]).substr(("" + date[k]).length),
      );
    }
  }
  return format;
};

export const daysInMonth = function(year: number, month: number) {
  if (month === 1) {
    if (year % 4 === 0 && year % 100 !== 0) {
      return 29;
    } else {
      return 28;
    }
  } else if ((month <= 6 && month % 2 === 0) || (month == 6 && month % 2 === 1)) {
    return 31;
  } else {
    return 30;
  }
};

export const addMonth = function(dt: Date, addMonth: number) {
  var y = dt.getFullYear();
  var m = dt.getMonth();
  var nextY = y;
  var nextM = m;
  // 如果当前月+要加上的月>11 这里之所以用11是因为 js的月份从0开始
  if (m > 11) {
    nextY = y + 1;
    nextM = m + addMonth - 11;
  } else {
    nextM = dt.getMonth() + addMonth;
  }
  var daysInNextMonth = daysInMonth(nextY, nextM);
  var day = dt.getDate();
  if (day > daysInNextMonth) {
    day = daysInNextMonth;
  }
  return new Date(nextY, nextM, day);
};

// 浏览器类型及版本
export const getBrowserInfo = function() {
  var agent = navigator.userAgent.toLowerCase();
  // var regStrIE = /msie [\d.]+;/gi
  var regStrFirefox = /firefox\/[\d.]+/gi;
  var regStrChrome = /chrome\/[\d.]+/gi;
  var regStrSafri = /safari\/[\d.]+/gi;
  var isIE = agent.indexOf("compatible") > -1 && agent.indexOf("msie") > -1; // 判断是否IE<11浏览器
  // var isEdge = agent.indexOf('edge') > -1 && !isIE // 判断是否IE的Edge浏览器
  var isIE11 = agent.indexOf("trident") > -1 && agent.indexOf("rv:11.0") > -1;
  if (isIE) {
    var reIE = new RegExp("msie (\\d+\\.\\d+);");
    reIE.test(agent);
    var fIEVersion = parseFloat(RegExp["$1"]);
    if (fIEVersion === 7) {
      return "IE/7";
    } else if (fIEVersion === 8) {
      return "IE/8";
    } else if (fIEVersion === 9) {
      return "IE/9";
    } else if (fIEVersion === 10) {
      return "IE/10";
    }
  } // isIE end
  if (isIE11) {
    return "IE/11";
  }
  // firefox
  if (agent.indexOf("firefox") > 0) {
    return agent.match(regStrFirefox);
  }
  // Safari
  if (agent.indexOf("safari") > 0 && agent.indexOf("chrome") < 0) {
    return agent.match(regStrSafri);
  }
  // Chrome
  if (agent.indexOf("chrome") > 0) {
    return agent.match(regStrChrome);
  }
};

// export default { formatDate, daysInMonth, addMonth, getBrowserInfo }
