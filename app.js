const dateInput = document.querySelector("input");
const btnCheck = document.querySelector("button");
const outputDiv = document.querySelector("div");

function reverseStr(ipStr) {
  var splitArray = ipStr.split("");
  var reversedArray = splitArray.reverse();
  var reversedStr = reversedArray.join("");
  return reversedStr;
}

function isPalindrome(ipStr) {
  return ipStr === reverseStr(ipStr);
}

function convertDateToStr(date) {
  var strDate = {
    day: "",
    month: "",
    year: "",
  };

  if (date.day < 10) {
    strDate.day = "0" + date.day;
  } else {
    strDate.day = date.day.toString();
  }

  if (date.month < 10) {
    strDate.month = "0" + date.month;
  } else {
    strDate.month = date.month.toString();
  }

  strDate.year = date.year.toString();

  return strDate;
}

function generateAllFormats(date) {
  var strDate = convertDateToStr(date);

  var ddmmyyyy = strDate.day + strDate.month + strDate.year;
  var mmddyyyy = strDate.month + strDate.day + strDate.year;
  var yyyymmdd = strDate.year + strDate.month + strDate.day;
  var ddmmyy = strDate.day + strDate.month + strDate.year.slice(-2);
  var mmddyy = strDate.month + strDate.day + strDate.year.slice(-2);
  var yymmdd = strDate.year.slice(-2) + strDate.month + strDate.day;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkForPalindrome(date) {
  var returnedFormatsArray = generateAllFormats(date);
  var flag = false;
  for (var i = 0; i < returnedFormatsArray.length; i++) {
    if (isPalindrome(returnedFormatsArray[i])) {
      flag = true;
      break;
    }
  }
  return flag;
}

function isLeapYear(year) {
  if (year % 400 === 0) {
    return true;
  }
  if (year % 100 === 0) {
    return false;
  }
  if (year % 4 === 0) {
    return true;
  }
  return false;
}

function getNextDate(date) {
  var day = date.day + 1;
  var month = date.month;
  var year = date.year;

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 2) {
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month++;
      }
    } else {
      if (day > 28) {
        day = 1;
        month++;
      }
    }
  } else {
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month++;
    }
  }

  if (month > 12) {
    month = 1;
    year++;
  }

  return {
    day: day,
    month: month,
    year: year,
  };
}

function getPrevDate(date) {
  var day = date.day - 1;
  var month = date.month;
  var year = date.year;

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (day === 0) {
    if (month > 1) {
      if (month === 3) {
        if (isLeapYear(year)) {
          day = 29;
          month--;
        } else {
          day = 28;
          month--;
        }
      } else {
        day = daysInMonth[month - 2];
        month--;
      }
    } else {
      day = 31;
      month = 12;
      year--;
    }
  }

  if (month === 0) {
    month = 12;
    year--;
  }

  return {
    day: day,
    month: month,
    year: year,
  };
}

function getNextPalindrome(date) {
  var ctr = 0;
  var nextDate = getNextDate(date);

  while (true) {
    ctr++;
    var success = checkForPalindrome(nextDate);
    if (success) break;
    nextDate = getNextDate(nextDate);
  }

  return [ctr, nextDate, "ahead"];
}

function getPrevPalindrome(date) {
  var ctr = 0;
  var prevDate = getPrevDate(date);

  while (true) {
    ctr++;
    var success = checkForPalindrome(prevDate);
    if (success) break;
    prevDate = getPrevDate(prevDate);
  }

  return [ctr, prevDate, "behind"];
}

function getClosestDate(date) {
  if (getNextPalindrome(date)[0] < getPrevPalindrome(date)[0]) {
    return getNextPalindrome(date);
  } else {
    return getPrevPalindrome(date);
  }
}

function parseDateToDisplay(date) {
  return date.day + " / " + date.month + " / " + date.year;
}

btnCheck.addEventListener("click", function () {
  if (dateInput.value !== "") {
    var inputArray = dateInput.value.split("-");
    var date = {
      day: Number(inputArray[2]),
      month: Number(inputArray[1]),
      year: Number(inputArray[0]),
    };
    if (checkForPalindrome(date)) {
      outputDiv.innerText = "The selected date is a palindrome.";
    } else {
      var outputArray = getClosestDate(date);
      if (outputArray[0] === 1) {
        outputDiv.innerText =
          "The selected date is not a palindrome. The nearest palindrome is " +
          parseDateToDisplay(outputArray[1]) +
          ", which is " +
          outputArray[0] +
          " day " +
          outputArray[2] +
          ".";
      } else {
        outputDiv.innerText =
          "The selected date is not a palindrome. The nearest palindrome is " +
          parseDateToDisplay(outputArray[1]) +
          ", which is " +
          outputArray[0] +
          " days " +
          outputArray[2] +
          ".";
      }
    }
  }
});
