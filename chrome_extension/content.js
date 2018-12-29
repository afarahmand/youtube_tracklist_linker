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


  //
  // let row;
  // for(let row = 0; row < sortedTrackNumbers.length; row++) {
  //   row = document.createElement("tr")
  //   for(let i = 0; i < headerCellText.length; i++) {
  //     tableHead.appendChild(
  //       document.createElement("td").appendChild(
  //         document.createTextNode()
  //       )
  //     );
  //   }
  // }



  // cells creation
  // for (let row = 0; row <= 2; row++) {
  //   // table row creation
  //   var row = document.createElement("tr");
  //
  //   for (var i = 0; i < 2; i++) {
  //     // create element <td> and text node
  //     //Make text node the contents of <td> element
  //     // put <td> at end of the table row
  //     var cell = document.createElement("td");
  //     var cellText = document.createTextNode("cell is row " + j + ", column " + i);
  //
  //     cell.appendChild(cellText);
  //     row.appendChild(cell);
  //   }
  //
  //   //row added to end of table body
  //   tblBody.appendChild(row);
  // }
  //
  // // append the <tbody> inside the <table>
  // tbl.appendChild(tblBody);
  // // put <table> in the <body>
  // body.appendChild(tbl);
  // // tbl border attribute to
  // tbl.setAttribute("border", "2");;
};

const fetchJSON = videoId => {
  const db = {
    "tbWS0j2fulY": {
      id: "1",
      videoId: "tbWS0j2fulY",
      title: "SQUΛD GOΛLS - Future Funk DJ Mix",
      status: "active",
      tracklist: {
        1: {
          startTime: "0:00",
          track: "[Fibre - Supernatural](https://www.youtube.com/watch?v=JHqeZi5W05A)",
          sample: "[The Limit - Miracles](https://www.youtube.com/watch?v=Ghvyy4mCmRQ), [Tavares - Got to Find My Way Back to You](https://www.youtube.com/watch?v=Ydjai0K2lLw)"
        },
        2: {
          startTime: "2:33",
          track: "[Night Tempo - Dreamer](https://www.youtube.com/watch?v=srX3csM1lhU)",
          sample: "[Minako Yoshida - Light'n Up](https://www.youtube.com/watch?v=VF1U8cdv6Dk)"
        },
        3: {
          startTime: "5:06",
          track: "[Cape Coral - Lovely Slut](https://www.youtube.com/watch?v=oppcFmWxGAw)",
          sample: "[Change - Lovely Lady](https://www.youtube.com/watch?v=UpuDPdAPz2w)"
        }
      }
    },
    "qXC4AyjRikg": {
      id: "2",
      videoId: "qXC4AyjRikg",
      title: "Future Funk Mega Mix",
      status: "active",
      tracklist: {
        1: {
          startTime: "0:00",
          track: "[コンピュータサイバー魂﻿PC'86 - OPEN UP YOUR HEART](https://www.youtube.com/watch?v=oM0wctqMfus)",
          sample: "[BONES JONES - open up your heart 86](https://www.youtube.com/watch?v=6mPVZ5GvWgc)"
        },
        2: {
          startTime: "3:10",
          track: "[Saint Pepsi - Skylar Spence](https://www.youtube.com/watch?v=AJA77S11BmM)",
          sample: "[Tatsuro Yamashita - Love Talkin' (Honey It's You)](https://www.youtube.com/watch?v=f3sU6DMzG1I)"
        },
        3: {
          startTime: "5:14",
          track: "[ALPHA CENTAURI アルファ - C:\This Feelin'](https://www.youtube.com/watch?v=tqto41sT-e0)",
          sample: "[Klique - I Can't Shake This Feeling](https://www.youtube.com/watch?v=qhvnDw6zyLQ)"
        },
        16: {
          startTime: "35:33",
          track: "[AnTgry - DANCE!](https://www.youtube.com/watch?v=BrhzJtfdojM)",
          sample: "[Jimmy Senyah - Weakness For Your Sweetness](https://www.youtube.com/watch?v=jJ5hFjqYaXQ)"
        }
      }
    }
  };

  return db[videoId]["tracklist"];
};

const getVideoIdFromURL = url => {
  let videoId = "";

  let indexOfVideoId = url.search("v=");

  if (indexOfVideoId === -1) { return null; }

  let i = indexOfVideoId + 2;
  while (i < url.length && url[i] !== "&") {
    videoId+=url[i];
    i++;
  }

  return videoId;
};

function receiver(message) {
  const videoId = getVideoIdFromURL(message["url"]);
  if (videoId === null) { return null; }

  console.log("DMX videoId CS: ", videoId);

  // Hit BE
  let tracklist = fetchJSON(videoId);

  console.log("Tracklist Keys: ", Object.keys(tracklist));

  displayTracklist(tracklist);
  console.log("DMX Displayed!!!");
}

chrome.runtime.onMessage.addListener(receiver);
chrome.runtime.sendMessage({ "message": "show_page_action" });
