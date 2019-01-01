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

const constructTable = (tableId, videoInfo) => {
  let tableColumnNames;
  if (everySampleNull(videoInfo.tracklist)) {
    tableColumnNames = ["#", "start", "track"];
  } else {
    tableColumnNames = ["#", "start", "track", "sample"];
  }

  let table = document.createElement("table");
  table.setAttribute("id", tableId);
  table.appendChild(constructTHead(tableColumnNames));
  table.appendChild(constructTBody(tableColumnNames, videoInfo));

  return table;
};

const constructTBody = (tableColumnNames, videoInfo) => {
  let tableBody = document.createElement("tbody");
  const sortedTrackNumbers = Object.keys(videoInfo.tracklist).sort(spaceship);

  let row, textNode, td;

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

const constructTrack = track => {
  let td, trackName, trackURL, anchorElement, indivTracks;

  // Multi-Track
  if (track.search(/\[.+\](.+),/) !== -1) {
    anchorElement = [];
    indivTracks = track.split(',');
    indivTracks.forEach(indivTrack => {
      trackName = unwrap(indivTrack.match(/\[.+\]/)[0]);
      trackURL = unwrap(indivTrack.match(/\(.+\)/)[0]);
      anchorElement.push(constructAnchorElement(trackURL, trackName));
    })
  } else {
    trackName = unwrap(track.match(/\[.+\]/)[0]);
    trackURL = unwrap(track.match(/\(.+\)/)[0]);
    anchorElement = [constructAnchorElement(trackURL, trackName)];
  }

  td = document.createElement("td");
  anchorElement.forEach((a, idx) => {
    td.appendChild(a);

    if (idx < anchorElement.length - 1) { td.appendChild(document.createTextNode(", ")); }
  })

  return td;
};

const constructTrackRow = (tableColumnNames, tracklistElement, videoId) => {
  let row = document.createElement("tr");
  let textNode, td;

  row.appendChild(constructTrackNumber(tracklistElement, videoId));
  row.appendChild(constructStartTime(tracklistElement.start, videoId));
  row.appendChild(constructTrack(tracklistElement.track));
  if (tableColumnNames[3] !== undefined) {
    row.appendChild(constructTrack(tracklistElement.sample));
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

async function displayTracklist(tableId, videoInfo) {
  await sleep(3000);
  let primaryInner = document.getElementById('primary-inner'); // Parent
  let meta = document.getElementById('meta');                  // Child
  let table = constructTable(tableId, videoInfo);
  primaryInner.insertBefore(table, meta);

  // // tbl border attribute to
  // tbl.setAttribute("border", "2");
};

const everySampleNull = tracklist => {
  let trackNums = Object.keys(tracklist);
  for(let i = 0; i < trackNums.length; i++) {
    if (tracklist[trackNums[i]].sample !== null) { return false; }
  }

  return true;
};

const removePreviouslyRenderedTable = tableId => {
  let table = document.getElementById(tableId);
  if (table !== null) { table.parentNode.removeChild(table); }
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
