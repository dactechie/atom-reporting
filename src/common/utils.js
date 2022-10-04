function sortByAssessmentDate(surveyDataObject) {
  const result = surveyDataObject.sort((a, b) => {
    let aDate = new Date(Date.parse(a["AssessmentDate"]));
    let bDate = new Date(Date.parse(b["AssessmentDate"]));
    if (aDate > bDate) return 1;
    if (aDate < bDate) return -1;
    return 0;
  });
  return result;
}

function getRangeAvg(rangeString) {
  if (rangeString === undefined) return undefined;

  if (!rangeString.includes("-")) return parseInt(rangeString);

  return (
    rangeString
      .split("-")
      .map(e => parseInt(e))
      .reduce((a, b) => a + b, 0) / 2
  );
}

function SDSColors(index) {
  let severityColor = "#ffffff";
  // console.log("Index " + typeof index);

  if (index < 4)
    // 0- 3 : Nil/Negligible
    severityColor = "#50eb21";
  else if (index < 7)
    // 4 -6 : Mild
    severityColor = "#b2f507";
  else if (index < 10)
    // 7 - 9: Moderate
    severityColor = "#ebda21";
  else if (index < 13)
    // 10- 12: Substantial
    severityColor = "#f59e07";
  // 13- 15 : Severe
  else severityColor = "#E52B50";

  return severityColor;
}

function K10Colors(index) {
  let severityColor = "#ffffff";
  // console.log("Index " + typeof index);

  if (index < 20)
    // 0- 3 : Nil/Negligible
    severityColor = "#50eb21";
  else if (index < 25)
    // 4 -6 : Mild
    severityColor = "#b2f507";
  else if (index < 30)
    // 7 - 9: Moderate
    severityColor = "#ebda21";
  else if (index < 51)
    //severe
    severityColor = "#E52B50";

  return severityColor;
}

const monthNamesShort = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
// Validates that the input string is a valid date formatted as "ddmmyyyy"
function isValidDate(dayStr, monthStr, yearStr) {
  const [day, month, year] = [
    parseInt(dayStr),
    parseInt(monthStr),
    parseInt(yearStr)
  ];

  // Check the ranges of month and year
  if (year < 1910 || year > 2050 || month == 0 || month > 12) return false;

  // Adjust for leap years
  if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
    monthLength[1] = 29;

  // Check the range of the day
  return day > 0 && day <= monthLength[month - 1];
}
function isValidSLK(slkString) {
  const matchedList = slkString.match(
    /^[A-Z29]{5}(\d{2})(\d{2})(\d{4})[1,2,9]$/
  );
  if (matchedList === null) return false;

  return isValidDate(matchedList[1], matchedList[2], matchedList[3]);
}

function getMinMaxAcrossLists(lists) {
  let maxVal = 0,
    minVal = 50;
  lists.forEach(e => {
    const noUndefs = e.data.filter(a => a);
    const max = Math.max(...noUndefs);
    if (maxVal < max) maxVal = max;
    const min = Math.min(...noUndefs);
    if (minVal > min) minVal = min;
  });
  return { minVal, maxVal };
}

export {
  sortByAssessmentDate,
  getRangeAvg,
  SDSColors,
  K10Colors,
  monthNamesShort,
  isValidSLK,
  getMinMaxAcrossLists
};
