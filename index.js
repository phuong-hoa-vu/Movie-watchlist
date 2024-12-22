document.getElementById('search-btn').addEventListener('click', function () {
    const input = document.getElementById('input');
    const movieList = document.getElementById('movie-list');

    fetch(`http://www.omdbapi.com/?s=${input.value}&apikey=c15f76bc`)
        .then(res => res.json())
        .then(data => {
            const films = data.Search;

            const fetchPromises = films.map(film =>
                fetch(`http://www.omdbapi.com/?t=${film.Title}&apikey=c15f76bc`)
                    .then(res => res.json())
            );

            // Wait for all fetch promises to resolve
            Promise.all(fetchPromises).then(film => {
                movieList.textContent = '';
                film.forEach((dat ) => {
                    movieList.innerHTML += `
                        <div id='movie'>
                            <img id="img" src="${dat.Poster}" />
                            <div>
                                <div id="title">
                                    <h2>${dat.Title}</h2>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FBE6A3">
                                        <path d="M480-269 314-169q-11 7-23 6t-21-8q-9-7-14-17.5t-2-23.5l44-189-147-127q-10-9-12.5-20.5T140-571q4-11 12-18t22-9l194-17 75-178q5-12 15.5-18t21.5-6q11 0 21.5 6t15.5 18l75 178 194 17q14 2 22 9t12 18q4 11 1.5 22.5T809-528L662-401l44 189q3 13-2 23.5T690-171q-9 7-21 8t-23-6L480-269Z" />
                                    </svg>
                                    <p>${dat.imdbRating}</p>
                                </div>
                                <div id="extra">
                                    <p>${dat.Runtime}</p>
                                    <p>${dat.Genre}</p>
                                    <p>
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM9 5C9 4.44772 8.55228 4 8 4C7.44772 4 7 4.44772 7 5V7H5C4.44772 7 4 7.44771 4 8C4 8.55228 4.44772 9 5 9H7V11C7 11.5523 7.44772 12 8 12C8.55228 12 9 11.5523 9 11V9H11C11.5523 9 12 8.55228 12 8C12 7.44772 11.5523 7 11 7H9V5Z" fill="#111827" />
                                        </svg>
                                        Watchlist
                                    </p>
                                </div>
                                <p>${dat.Plot}</p>
                            </div>
                        </div>
                    `;
                });
            });
        });

    // Clear input field
    input.value = '';
});
