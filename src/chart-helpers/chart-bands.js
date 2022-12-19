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

export { SDSColors, K10Colors };
