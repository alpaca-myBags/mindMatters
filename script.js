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
  c4: "check-in+energizing",
  c5: "energizing+gratitude",
};

/// VARIABLE DECLARATIONS ///
const youtubeKey = config.youtubeKey;
//const api_url = "https://type.fit/api/quotes";

/// DOM CONTENT LOADING ///
document.addEventListener("DOMContentLoaded", async () => {
  console.log("loaded content, + quote data loaded");
});

/// QUERY SELECTORS ///
document.querySelectorAll(".circle").forEach((circle) => {
  circle.addEventListener("click", (e) => {
    userChoices.mood = moodData[e.target.id];
    changePreferenceColor(e.target.style.backgroundColor);
    changeBackgroundColor(e.target.style.backgroundColor);
    fadeInElement(".question2");
  });
});

document.getElementById("journalEntry").addEventListener("submit", (e) => {
  e.preventDefault();
  userChoices.journalEntry = e.target[0].value;
  fadeInElement(".question3");
});

document.querySelectorAll(".preference").forEach((circle) => {
  circle.addEventListener("click", (e) => {
    userChoices.preference = e.target.id;
    fadeInElement(".confirmation");
  });
});

document.getElementById("generate").addEventListener("click", (e) => {
  document.querySelector(".video").style.visibility = "visible";
  generateVideo(userChoices);
  fadeInElement(".video");
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
  //// PREVIOUSLY GENERATED VIDEOS
  // arrayOfVideos.forEach((data) => {
  //   let video = document.createElement("iframe");
  //   video.alt = "generated youtube video";
  //   video.src = `https://www.youtube.com/embed/${data.id.videoId}`;
  //   videoDiv.appendChild(video);
  // });
  arrayOfVideos.forEach((data, i) => {
    let video = document.getElementById("video-" + i);
    video.alt = "generated youtube video";
    video.src = `https://www.youtube.com/embed/${data.id.videoId}`;
    video.style.width = "100%";
    video.style.height = "100%";
  });
}

function fadeInElement(queryName) {
  let element = document.querySelector(queryName);
  element.classList.add("visible");
}

function changePreferenceColor(color) {
  document.querySelectorAll(".preference").forEach((element) => {
    element.style.backgroundColor = color;
  });
}

function changeBackgroundColor(color) {
  const newNums = color
    .match(/\d+/g)
    .map((num) => Math.round(Number(num) + (255 - num) * (1 / 2)));
  document.body.style.backgroundColor = `rgb(${newNums[0]}, ${newNums[1]}, ${newNums[2]})`;
}
