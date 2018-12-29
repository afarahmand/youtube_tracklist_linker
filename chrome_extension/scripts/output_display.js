const displayTracklist = tracklist => {
  let primaryInner = document.getElementById('primary-inner'); // Parent
  let meta = document.getElementById('meta');                  // Child

  // create elements <table> and a <tbody>
  let table = document.createElement("table");
  let tableHead = document.createElement("thead");
  let row, th, td, textNode;

  // Construct Table Header
  row = document.createElement("tr");
  const thCellText = ["#", "Start", "Track", "Sample"];
  for(let i = 0; i < thCellText.length; i++) {
    textNode = document.createTextNode(thCellText[i]);
    th = document.createElement("th");
    th.appendChild(textNode);
    row.appendChild(th);
  }

  tableHead.appendChild(row);
  table.appendChild(tableHead);

  // Construct Table Body
  let tableBody = document.createElement("tbody");
  const trackKeys = ["startTime", "track", "sample"];
  const sortedTrackNumbers = Object.keys(tracklist).sort(function (a, b) {
    a = Number(a);
    b = Number(b);
    if (a < b) return -1;
    if (a === b) return  0;
    if (a > b) return  1;
  });

  console.log("DMX sorted: ", sortedTrackNumbers);
  sortedTrackNumbers.forEach(trackNumber => {
    row = document.createElement("tr");

    // Append track #
    textNode = document.createTextNode(trackNumber);
    td = document.createElement("td");
    td.appendChild(textNode);
    row.appendChild(td);

    for(let coli = 0; coli < trackKeys.length; coli++) {
      textNode = document.createTextNode(tracklist[trackNumber][trackKeys[coli]]);
      td = document.createElement("td");
      td.appendChild(textNode);
      row.appendChild(td);
    }
    tableBody.appendChild(row);
  });

  table.appendChild(tableBody);

  primaryInner.insertBefore(table, meta);

  // -----------------------------------------------------------------
  // // put <table> in the <body>
  // body.appendChild(tbl);
  // // tbl border attribute to
  // tbl.setAttribute("border", "2");;
};
