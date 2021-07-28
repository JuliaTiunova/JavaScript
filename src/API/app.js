const API_URL = "https://www.omdbapi.com/";
const API_KEY = "4e274ff4";

let movies = [];
let total = 0;
let currentPage = 1;

const showPreviousButton = () => currentPage > 1;
const showNextButton = () => total / 10 > currentPage;

const totalLine = document.createElement("p");

async function searchMovies(title, year, type, page = 1) {
  const params = new URLSearchParams({
    apikey: API_KEY,
    s: title,
    y: year,
    type: type,
    page: page,
  });

  const response = await fetch(`${API_URL}?${params}`);
  const result = await response.json();
  if (result.Search) {
    console.log(result);
    return result;
  } else {
    alert(result.Error);
  }
}

async function getInfo(id) {
  const params = new URLSearchParams({
    apikey: API_KEY,
    i: id,
  });

  const response = await fetch(`${API_URL}?${params}`);
  const result = await response.json();
  return result;
}

const movieList = document.querySelector(".movieList");
const prevButton = document.querySelector(".button--prev");
const nextButton = document.querySelector(".button--next");
const wrapper = document.querySelector(".list__wrapper");

const searchForm = document.forms.search;

const title = searchForm.title;
const year = searchForm.year;
const type = searchForm.type;

searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  wrapper.style.opacity = "1";
  const header = document.querySelector(".header");
  const scroll = document.createElement("div");
  header.lastChild.remove();

  scroll.classList.add("scroll", "animate__animated", "animate__tada");
  scroll.textContent = "scroll down";
  header.appendChild(scroll);

  const title = document.forms.search.title;
  const year = document.forms.search.year;
  const type = document.forms.search.type;

  const result = await searchMovies(title.value, year.value, type.value);
  movies = result.Search;

  const totalResult = result.totalResults;

  total = +result.totalResults;

  if (result.totalResults > 10) {
    nextButton.style.display = "block";
  }
  render();
});

nextButton.addEventListener("click", async () => {
  const result = await searchMovies(
    title.value,
    year.value,
    type.value,
    ++currentPage
  );
  movies = result.Search;
  render();
});

prevButton.addEventListener("click", async () => {
  const result = await searchMovies(
    title.value,
    year.value,
    type.value,
    --currentPage
  );
  movies = result.Search;
  render();
});

let favs = JSON.parse(localStorage.getItem("favs")) || [];
function saveMovie() {
  window.localStorage.setItem("favs", JSON.stringify(movies));
}

async function render() {
  movieList.replaceChildren();
  movieList.appendChild(totalLine);
  totalLine.textContent = `Search result: ${total} items`;

  for (const movie of movies) {
    const movieId = movie.imdbID;

    const movieWrapper = document.createElement("div");
    movieWrapper.classList.add("movie");

    const movieTitle = document.createElement("h2");
    movieTitle.textContent = movie.Title;
    movieWrapper.appendChild(movieTitle);

    const buttonDetails = document.createElement("button");
    buttonDetails.classList.add("button-details", "button");
    buttonDetails.textContent = "details";
    movieWrapper.appendChild(buttonDetails);

    buttonDetails.addEventListener("click", async (e) => {
      e.preventDefault();

      const movieInfo = await getInfo(movieId);
      const details = document.createElement("div");

      if (movieWrapper.classList.contains("on")) {
        movieWrapper.lastChild.remove(details);
        movieWrapper.classList.remove("on");
      } else {
        const img = document.createElement("img");
        const imgWrapper = document.createElement("div");
        const infoWrapper = document.createElement("div");
        const yearOf = document.createElement("p");
        const typeOf = document.createElement("p");
        const plot = document.createElement("p");
        const actors = document.createElement("p");
        const language = document.createElement("p");
        const country = document.createElement("p");
        const genre = document.createElement("p");
        const ratings = document.createElement("p");
        const director = document.createElement("p");
        const runtime = document.createElement("p");
        const awards = document.createElement("p");
        const buttonLove = document.createElement("button");
        img.src = movie.Poster;
        yearOf.textContent = `Year of release: ${movie.Year}`;

        plot.textContent = `${movieInfo.Plot}...`;
        actors.textContent = `Actors: ${movieInfo.Actors}`;
        language.textContent = `Language: ${movieInfo.Language}`;
        country.textContent = `Country: ${movieInfo.Country}`;
        genre.textContent = `Genre: ${movieInfo.Genre}`;
        ratings.textContent = `imdbRating: ${movieInfo.imdbRating}`;
        director.textContent = `Director: ${movieInfo.Director}`;
        runtime.textContent = `Runtime: ${movieInfo.Runtime}`;
        awards.textContent = `Awards: ${movieInfo.Awards}`;

        movieWrapper.appendChild(details);
        details.classList.add(
          "details",
          "animate__animated",
          "animate__fadeInDown"
        );

        details.appendChild(imgWrapper);
        imgWrapper.appendChild(img);
        details.appendChild(infoWrapper);
        infoWrapper.classList.add("info-wrapper");
        infoWrapper.appendChild(yearOf);
        if (movie.Type === "series") {
          typeOf.textContent = `Seasons: ${movieInfo.totalSeasons}`;
          infoWrapper.appendChild(typeOf);
        }
        infoWrapper.appendChild(ratings);
        infoWrapper.appendChild(awards);
        infoWrapper.appendChild(language);
        infoWrapper.appendChild(country);
        infoWrapper.appendChild(genre);
        infoWrapper.appendChild(runtime);
        infoWrapper.appendChild(director);
        infoWrapper.appendChild(actors);
        infoWrapper.appendChild(plot);
        plot.classList.add("plot");
        details.appendChild(buttonLove);
        buttonLove.classList.add("button--love");

        buttonLove.addEventListener("click", () => {
          buttonLove.classList.toggle("clicked");
          // if (buttonLove.classList.contains("clicked")) {
          // } else {
          //   favs.remove();
          // }
        });

        movieWrapper.classList.add("on");
      }
    });

    prevButton.style.display = showPreviousButton() ? "block" : "none";
    nextButton.style.display = showNextButton() ? "block" : "none";
    movieList.appendChild(movieWrapper);
  }
}
