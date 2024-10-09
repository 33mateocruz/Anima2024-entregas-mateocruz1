document.getElementById("searchBtn").addEventListener("click", function () {
  const movieTitle = document.getElementById("movieTitle").value;
  const apiUrl = `https://www.omdbapi.com/?t=${movieTitle}&apikey=8cb4e2ca`;

  document.getElementById("loader").classList.remove("hidden");
  document.getElementById("movieInfo").classList.add("hidden");
  document.getElementById("error").classList.add("hidden");

  fetch(apiUrl)
    .then((response) => {
      document.getElementById("loader").classList.add("hidden");
      if (!response.ok) {
        throw new Error("Error en la red");
      }
      return response.json();
    })
    .then((data) => {
      if (data.Response === "True") {
        document.getElementById("movieInfo").classList.remove("hidden");
        document.getElementById("poster").src = data.Poster;
        document.getElementById("title").textContent = data.Title;
        document.getElementById("plot").textContent = data.Plot;
        document.getElementById("director").textContent = data.Director;
        document.getElementById("actors").textContent = data.Actors;
        document.getElementById("rating").textContent = data.imdbRating;
      } else {
        document.getElementById("error").classList.remove("hidden");
      }
    })
    .catch((error) => {
      document.getElementById("loader").classList.add("hidden");
      document.getElementById("error").classList.remove("hidden");
      console.error("Error:", error);
    });
});
