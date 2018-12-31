const constructAnchorElement = (url, text) => {
  let textNode = document.createTextNode(text);
  let anchorElement = document.createElement("a");
  anchorElement.setAttribute("href", url);
  anchorElement.appendChild(textNode);

  return anchorElement;
};

const constructTable = videoInfo => {
  const tableColumnNames = ["#", "start", "track", "sample"];
  let table = document.createElement("table");
  table.appendChild(constructTHead(tableColumnNames));
  table.appendChild(constructTBody(tableColumnNames, videoInfo));

  return table;
};

const constructTBody = (tableColumnNames, videoInfo) => {
  let tableBody = document.createElement("tbody");
  const sortedTrackNumbers = Object.keys(videoInfo.tracklist).sort(spaceship);

  let row, textNode, td;

  console.log("DMX sorted: ", sortedTrackNumbers);
  sortedTrackNumbers.forEach(trackNumber => {
    tableBody.appendChild(constructTrackRow(
      tableColumnNames,
      videoInfo.tracklist[trackNumber],
      videoInfo.videoId
    ));
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

const constructTrackNumber = (track, videoId) => {
  // const timeParam = convertTimeToURLParam(track.start);
  const url = `/watch?v=${videoId}&t=${convertTimeToURLParam(track.start)}s`;
  console.log("DMX url: ", url);
  let link = constructAnchorElement(url, track.trackNumber.toString());
  let td = document.createElement("td");
  td.appendChild(link);

  return td;
};

const constructTrackRow = (tableColumnNames, track, videoId) => {
  let row = document.createElement("tr");
  let textNode, td;

  row.appendChild(constructTrackNumber(track, videoId));

  for(let coli = 1; coli < tableColumnNames.length; coli++) {
    textNode = document.createTextNode(track[tableColumnNames[coli]]);
    td = document.createElement("td");
    td.appendChild(textNode);
    row.appendChild(td);
  }

  return row;
};

const convertTimeToURLParam = startTime => {
  let numberOfSeconds = 0;
  let timeSplit = startTime.split(":").reverse();

  for(let i = 0; i < timeSplit.length; i++) {
    if (i === 0)      { numberOfSeconds+=Number(timeSplit[i]); }
    else if (i === 1) { numberOfSeconds+=Number(timeSplit[i])*60;}
    else if (i === 2) { numberOfSeconds+=Number(timeSplit[i])*60*60; }
    else if (i === 3) { numberOfSeconds+=Number(timeSplit[i])*60*60*24; }
  }

  return numberOfSeconds.toString();
};

async function displayTracklist(videoInfo) {
  await sleep(2000);
  let primaryInner = document.getElementById('primary-inner'); // Parent
  let meta = document.getElementById('meta');                  // Child
  let table = constructTable(videoInfo);
  primaryInner.insertBefore(table, meta);

  // -----------------------------------------------------------------
  // // put <table> in the <body>
  // body.appendChild(tbl);
  // // tbl border attribute to
  // tbl.setAttribute("border", "2");;
};

const sleep = ms => (new Promise(resolve => setTimeout(resolve, ms)))

const spaceship = function (a, b) {
  a = Number(a);
  b = Number(b);
  if (a < b) return -1;
  if (a === b) return 0;
  if (a > b) return  1;
};
