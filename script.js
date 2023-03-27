/// DATA STRUCTURES ///
const userChoices = {
  mood: "",
  journalEntry: "",
  preference: "",
};

const moodData = {
  c1: "positivity+affirmations",
  c2: "positivity+encouraging",
  c3: "self-improvement+energizing",
  c4: "happy+motivational",
  c5: "energizing+gratitude",
};

/// VARIABLE DECLARATIONS ///
const youtubeKey = config.youtubeKey;
const api_url = "https://type.fit/api/quotes";

/// DOM CONTENT LOADING ///
document.addEventListener("DOMContentLoaded", async () => {
  console.log("loaded content");
  const quoteData = await fetchData(api_url);

  // const plEASE = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=9&q="meditation"&key=${youtubeKey}`;
  // const data = await fetchData(plEASE);
  // console.log("original: ")
  // console.log(data);
});

/// QUERY SELECTORS ///
document.querySelectorAll(".circle").forEach((circle) => {
  circle.addEventListener("click", (e) => {
    userChoices.mood = moodData[e.target.id];
    console.log(userChoices);
  });
});

document.getElementById("journalEntry").addEventListener("submit", (e) => {
  e.preventDefault();
  userChoices.journalEntry = e.target[0].value;
  console.log(userChoices);
});

document.querySelectorAll(".preference").forEach((circle) => {
  circle.addEventListener("click", (e) => {
    userChoices.preference = e.target.id;
    console.log(userChoices);
  });
});

document.getElementById("generate").addEventListener("click", (e) => {
  generateVideo(userChoices);
});

/// HELPER FUNCTIONS ///

const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

async function generateVideo(userChoices) {
  let search = `${userChoices.preference}+${userChoices.mood}`;
  let link = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&q=${search}&type=video&videoDuration=medium&key=${youtubeKey}`;
  const data = await fetchData(link);
  addVideosToPage(data.items);
}

function addVideosToPage(arrayOfVideos) {
  let videoDiv = document.getElementById("videos");
  while (videoDiv.firstChild) {
    videoDiv.removeChild(videoDiv.firstChild);
  }
  console.log(arrayOfVideos);
  arrayOfVideos.forEach((data) => {
    console.log(data.snippet.title);
    console.log(data.id.videoId);
    let video = document.createElement("iframe");
    video.alt = "generated youtube video";
    video.src = `https://www.youtube.com/embed/${data.id.videoId}`;
    videoDiv.appendChild(video);
  });
}
