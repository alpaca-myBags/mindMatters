/// DATA STRUCTURES ///
const userChoices = {
  mood: "",
  journalEntry: "",
  preference: "",
};

const moodData = {
  c1: "positivity+affirmations",
  c2: "positivity+encouraging",
  c3: "energizing+gratitude",
  c4: "happy",
  c5: "great",
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

function generateVideo(userChoices) {
  let search = `${userChoices.preference}+${userChoices.mood}`;
  console.log(search);
  // let link = `https://developers.google.com/apis-explorer/#p/youtube/v3/youtube.search.list?part=snippet&q=${search}&type=video&videoDuration=medium`;
  let link = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=9&q=${search}&type=video&videoDuration=medium&key=${youtubeKey}`;
  console.log(link);
}
