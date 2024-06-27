import React, { useState, useEffect } from 'eact';
import axios from 'axios';

const ProxyApi = "https://proxy.sb543267gmailcom.workers.dev/";
const IndexApi = "/home";
const recentapi = "/recent/";
const AvailableServers = ["https://asta-api.sb543267gmailcom.workers.dev/", "https://vip-gamma.vercel.app/", "https://api3.sb543267gmailcom.workers.dev/", "https://api100.sb543267gmailcom.workers.dev/", "https://api1.sb543267gmailcom.workers.dev/"];

function getApiServer() {
  return AvailableServers[Math.floor(Math.random() * AvailableServers.length)];
}

function genresToString(genres) {
  return genres.join(", ");
}

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

function App() {
  const [trendingAnimes, setTrendingAnimes] = useState([]);
  const [popularAnimes, setPopularAnimes] = useState([]);
  const [recentAnimes, setRecentAnimes] = useState([]);
  const [slideIndex, setSlideIndex] = useState(0);
  const [clickes, setClickes] = useState(0);
  const [page, setPage] = useState(2);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(getApiServer() + IndexApi);
      const data = response.data.results;
      const anilistTrending = shuffle(data.anilistTrending);
      const gogoanimePopular = shuffle(data.gogoPopular);

      setTrendingAnimes(anilistTrending);
      setPopularAnimes(gogoanimePopular);

      getTrendingAnimes(anilistTrending);
      getPopularAnimes(gogoanimePopular);
      getRecentAnimes(1);
    }

    fetchData();
  }, []);

  async function getTrendingAnimes(data) {
    let SLIDER_HTML = "";

    for (let pos = 0; pos < data.length; pos++) {
      let anime = data[pos];
      let title = anime.title.userPreferred;
      let type = anime.format;
      let status = anime.status;
      let genres = genresToString(anime.genres);
      let description = anime.description;
      let url = "./anime.html?anime_id=" + encodeURIComponent(title);

      let poster = anime.bannerImage;
      if (poster == null) {
        poster = anime.coverImage.extraLarge;
      }

      SLIDER_HTML += (
        <div className="mySlides fade">
          <div className="data-slider">
            <p className="spotlight">#${pos + 1} Spotlight</p>
            <h1>{title}</h1>
            <div className="extra1">
              <span className="year">
                <i className="fa fa-play-circle" />
                {type}
              </span>
              <span className="year year2">
                <i className="fa fa-calendar" />
                {status}
              </span>
              <span className="cbox cbox1">{genres}</span>
              <span className="cbox cbox2">HD</span>
            </div>
            <p className="small-synop">{description}</p>
            <div id="watchh">
              <a href={url} className="watch-btn">
                <i className="fa fa-play-circle" />
                Watch Now
              </a>
              <a href={url} className="watch-btn watch-btn2">
                <i className="fa fa-info-circle" />
                Details
                <i className="fa fa-angle-right" />
              </a>
            </div>
          </div>
          <div className="shado">
            <a href={url} />
          </div>
          <img src={poster} />
        </div>
      );
    }

    document.querySelector(".slideshow-container").innerHTML = SLIDER_HTML + '<a class="prev" onclick="plusSlides(-1)">&#10094;</a><a class="next" onclick="plusSlides(1)">&#10095;</a>';
  }

  async function getPopularAnimes(data) {
    let POPULAR_HTML = "";

    for (let pos = 0; pos < data.length; pos++) {
      let anime = data[pos];
      let title = anime.title;
      let id = anime.id;
      let url = "./anime.html?anime_id=" + id;
      let image = anime.image;
      let subOrDub;
      if (title.toLowerCase().includes("dub")) {
        sub
