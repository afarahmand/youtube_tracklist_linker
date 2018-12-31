const constructAnchorElement = (url, text) => {
  let textNode = document.createTextNode(text);
  let anchorElement = document.createElement("a");

  // anchorElement.classList.add("yt-simple-endpoint");
  // anchorElement.classList.add("style-scope");
  // anchorElement.classList.add("yt-formatted-string");
  // anchorElement.setAttribute("spellcheck", false)

  anchorElement.setAttribute("href", url);
  anchorElement.appendChild(textNode);

  return anchorElement;
};

const constructStartTime = (startTime, videoId) => {
  let timeParam, anchorElement;

  timeParam = convertTimeToURLParam(startTime);
  const url = `/watch?v=${videoId}&t=${convertTimeToURLParam(startTime)}s`;
  anchorElement = constructAnchorElement(url, startTime);

  // Replace converted token chars back to ',' in future
  let td = document.createElement("td");
  td.appendChild(anchorElement);

  return td;
}

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

const constructTrackNumber = (tracklistElement, videoId) => {
  const url = `/watch?v=${videoId}&t=${convertTimeToURLParam(tracklistElement.start)}s`;
  let link = constructAnchorElement(url, tracklistElement.trackNumber.toString());
  let td = document.createElement("td");
  td.appendChild(link);

  return td;
};

// WIP
const constructTrack = track => {
  let td, trackName, trackURL, anchorElement;

  // Multi-Track
  if (track.search(/\[.+\](.+),/) !== -1) {

  } else {
    trackName = unwrap(track.match(/\[.+\]/)[0]);
    trackURL = unwrap(track.match(/\(.+\)/)[0]);
    anchorElement = constructAnchorElement(trackURL, trackName);
  }

  // Replace converted token chars back to ',' in future
  td = document.createElement("td");
  td.appendChild(anchorElement);

  return td;
};

const constructTrackRow = (tableColumnNames, tracklistElement, videoId) => {
  let row = document.createElement("tr");
  let textNode, td;

  row.appendChild(constructTrackNumber(tracklistElement, videoId));
  row.appendChild(constructStartTime(tracklistElement.start, videoId));
  row.appendChild(constructTrack(tracklistElement.track));
  row.appendChild(constructTrack(tracklistElement.sample));

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
  await sleep(5000);
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

const unwrap = str => (str.slice(1, str.length - 1))

const sleep = ms => (new Promise(resolve => setTimeout(resolve, ms)))

const spaceship = function (a, b) {
  a = Number(a);
  b = Number(b);
  if (a < b) return -1;
  if (a === b) return 0;
  if (a > b) return  1;
};
