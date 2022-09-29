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
const COLORS = ["#537bc4", "#7FFF00", "#FE6F5E", "#E52B50", "#acc236"];

function color(index) {
  return COLORS[index % COLORS.length];
}
const months = [
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

export { sortByAssessmentDate, getRangeAvg, color, months };
