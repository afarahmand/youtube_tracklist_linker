const constructTBody = (tableColumnNames, videoInfo) => {
  let tableBody = document.createElement("tbody");
  const trackKeys = tableColumnNames.slice(1);
  const sortedTrackNumbers = Object.keys(videoInfo.tracklist).sort(spaceship);

  let row, textNode, td;

  console.log("DMX sorted: ", sortedTrackNumbers);
  sortedTrackNumbers.forEach(trackNumber => {
    row = document.createElement("tr");

    // Append track #
    textNode = document.createTextNode(trackNumber);
    td = document.createElement("td");
    td.appendChild(textNode);
    row.appendChild(td);

    for(let coli = 0; coli < trackKeys.length; coli++) {
      textNode = document.createTextNode(videoInfo.tracklist[trackNumber][trackKeys[coli]]);
      td = document.createElement("td");
      td.appendChild(textNode);
      row.appendChild(td);
    }
    tableBody.appendChild(row);
  });

  return tableBody;
};

const constructTHead = thText => {
  let tableHead = document.createElement("thead");
  let row, th, textNode;

  row = document.createElement("tr");
  for(let coli = 0; coli < thText.length; coli++) {
    textNode = document.createTextNode(thText[coli]);
    th = document.createElement("th");
    th.appendChild(textNode);
    row.appendChild(th);
  }

  tableHead.appendChild(row);
  return tableHead;
};

const displayTracklist = record => {
  let primaryInner = document.getElementById('primary-inner'); // Parent
  let meta = document.getElementById('meta');                  // Child

  const tableColumnNames = ["#", "start", "track", "sample"];
  let table = document.createElement("table");
  table.appendChild(constructTHead(tableColumnNames));
  table.appendChild(constructTBody(tableColumnNames, record));

  primaryInner.insertBefore(table, meta);

  // -----------------------------------------------------------------
  // // put <table> in the <body>
  // body.appendChild(tbl);
  // // tbl border attribute to
  // tbl.setAttribute("border", "2");;
};

const spaceship = function (a, b) {
  a = Number(a);
  b = Number(b);
  if (a < b) return -1;
  if (a === b) return 0;
  if (a > b) return  1;
};
