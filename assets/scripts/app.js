const addMovieBtn = document.getElementById("add-movie-btn");
const searchBtn = document.getElementById("search-btn");

const movies = [];

const addMovieHandler = () => {
	const title = document.getElementById("title").value;
	const extraName = document.getElementById("extra-name").value;
	const extraValue = document.getElementById("extra-value").value;
	const inputs = document.querySelectorAll("#title, #extra-name, #extra-value");

	if (
		title.trim() === "" ||
		extraName.trim() === "" ||
		extraValue.trim() === ""
	) {
		return;
	}

	const newMovie = {
		info: {
			title,
			[extraName]: extraValue, // [extraName] assign dynamic property name
		},
		id: Math.random(),
	};

	inputs.forEach((input) => {
		input.value = "";
	});

	movies.push(newMovie);

	renderMovies();
};

addMovieBtn.addEventListener("click", addMovieHandler);

// Outputing movies

const renderMovies = (filter = "") => {
	const movieList = document.getElementById("movie-list");

	if (movies.length === 0) {
		movieList.classList.remove("visible");
		return;
	} else {
		movieList.classList.add("visible");
	}
	movieList.innerHTML = "";

	const filteredMovies = !filter
		? movies
		: movies.filter((movie) => movie.info.title.includes(filter));

	filteredMovies.forEach((movie) => {
		const movieEl = document.createElement("li");
		let text = movie.info.title + " - ";
		for (const key in movie.info) {
			if (key !== "title") {
				text = text + `${key}: ${movie.info[key]} `;
			}
		}
		movieEl.textContent = text;
		movieList.append(movieEl);
	});
};

const searchMovieHandler = () => {
	const filterTerm = document.getElementById("filter-title").value;
	renderMovies(filterTerm);
};

searchBtn.addEventListener("click", searchMovieHandler);
