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
}

chrome.runtime.onMessage.addListener(receiver);
chrome.runtime.sendMessage({ "message": "show_page_action" });
