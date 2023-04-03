/// DATA STRUCTURES ///
const userChoices = {
  mood: "",
  journalEntry: "",
  preference: "",
};

const moodData = {
  c1: "positivity+affirmations",
  c2: "positivity+encouraging",
  c3: "get-started+energizing",
  c4: "check-in+energizing",
  c5: "energizing+gratitude",
};

/// VARIABLE DECLARATIONS ///
const youtubeKey = "AIzaSyCE-shpndqMLi7whRXm5uwvTy7cguKftiw"; //config.youtubeKey;
// const api_url = "https://type.fit/api/quotes";

/// DOM CONTENT LOADING ///
document.addEventListener("DOMContentLoaded", async () => {
  console.log("loaded content, + quote data loaded");
});

// ----- Quote api -----

const api_url = "https://type.fit/api/quotes";
const quoteContainer = document.getElementById("quote-container");
let currColor = "";

fetch("https://type.fit/api/quotes")
  .then(response => response.json())
  .then(data => {
    let index = Math.floor(Math.random() * 1643);
    quoteContainer.innerText = `${data[index].text} - ${data[index].author}`;
  })
  .catch(error => console.log(error));

/// QUERY SELECTORS ///
const circleIcons = document.querySelectorAll(".circle");
circleIcons.forEach(circle => {
  circle.addEventListener("click", e => {
    userChoices.mood = moodData[e.target.id];
    choiceVisible(e.target.id);
    changePreferenceColor(e.target.style.backgroundColor);
    changeBackgroundColor(e.target.style.backgroundColor);
    generateQuestion();
    document.querySelector("#textArea").value = "";
    fadeInElement(".question2");
  });
});

document.getElementById("journalEntry").addEventListener("focus", e => {
  document.getElementById("textArea").style.backgroundColor = currColor;
});

document.getElementById("journalEntry").addEventListener("submit", e => {
  e.preventDefault();
  userChoices.journalEntry = e.target[0].value;
  fadeInElement(".question3");
});

document.querySelectorAll(".preference").forEach(circle => {
  circle.addEventListener("click", e => {
    userChoices.preference = e.target.id;
    choiceVisible(e.target.id);
    fadeInElement(".confirmation");
  });
});

document.getElementById("generate").addEventListener("click", e => {
  document.querySelector(".video").style.visibility = "visible";
  generateVideo(userChoices);
  fadeInElement(".video");
});

/// HELPER FUNCTIONS ///
const fetchData = async url => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

function generateQuestion() {
  let prompt = document.querySelector(".journalPrompt");
  switch (userChoices.mood) {
    case "positivity+affirmations":
      prompt.innerText =
        "That sucks, you can elaborate if you want, or move on to the next";
      break;
    case "positivity+encouraging":
      prompt.innerText =
        "You can elaborate if you want, or move on to the next";
      break;
    case "get-started+energizing":
      prompt.innerText =
        "We have an optional journal entry here, or you can move on";
      break;
    case "check-in+energizing":
      prompt.innerText =
        "Thats good! you can talk about it more, or go to the next";
      break;
    case "energizing+gratitude":
      prompt.innerText = "Lovely! you can share some more, or move on";
      break;
  }
}

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
  element.scrollIntoView({ behavior: "smooth", block: "center" });
}

function changePreferenceColor(color) {
  document.querySelectorAll(".preference").forEach(element => {
    element.style.backgroundColor = color;
  });
}

function changeBackgroundColor(color) {
  const newNum = color
    .match(/\d+/g)
    .map(num => Math.round(Number(num) + (255 - num) * (1 / 2)));
  document.body.style.backgroundColor = `rgb(${newNum[0]}, ${newNum[1]}, ${newNum[2]})`;
  currColor = `rgb(${newNum[0]}, ${newNum[1]}, ${newNum[2]})`;
  const textAreaColor = newNum.map(num =>
    Math.round(Number(num) + (255 - num) * (1 / 2))
  );
  document.getElementById(
    "textArea"
  ).style.backgroundColor = `rgb(${textAreaColor[0]}, ${textAreaColor[1]}, ${textAreaColor[2]})`;
}

function choiceVisible(choice) {
  if (choice[0] == "c") {
    circleIcons.forEach(circle => {
      if (circle.id == choice) {
        circle.classList.add("clicked"); //if its clicked
      } else {
        circle.classList.remove("clicked");
      }
    });
  } else {
    if (choice == "meditation") {
      document.getElementById("meditation").classList.add("clicked");
      document.getElementById("yoga").classList.remove("clicked");
    } else {
      document.getElementById("meditation").classList.remove("clicked");
      document.getElementById("yoga").classList.add("clicked");
    }
  }
}

// ---- Shiba api ----

fetch("http://shibe.online/api/shibes?count=10&urls=true&httpsUrls=true")
  .then(response => response.json())
  .then(data => {
    console.log(data); // This will log an array of URLs of 10 shibe images
  })
  .catch(error => {
    console.error(error);
  });

async function fetchShibeImages() {
  try {
    const response = await fetch(
      "https://shibe.online/api/shibes?count=10&urls=true&httpsUrls=true"
    );
    const data = await response.json();
  } catch (error) {
    console.error(error);
  }
}

fetchShibeImages();

function displayShibeImages() {
  fetch("https://shibe.online/api/shibes?count=10&urls=true&httpsUrls=true")
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById("shibe-container"); // Assuming you have a container element with ID 'shibe-container'
      data.forEach(url => {
        const img = document.createElement("img");
        img.src = url;
        container.appendChild(img);
      });
    })
    .catch(error => {
      console.error(error);
    });
}

displayShibeImages();
