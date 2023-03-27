document.addEventListener("DOMContentLoaded", async () => {
  console.log("loaded content");

  const api_url = "https://type.fit/api/quotes";
  const quoteData = await fetchData(api_url);
  console.log(quoteData);

  const youtubeKey = config.youtubeKey;
  console.log(youtubeKey);
  const plEASE = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=9&q="meditation"&key=${youtubeKey}`;
  const data = await fetchData(plEASE);
  console.log(data);
});

const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
