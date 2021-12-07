'use script'

function fetchTopRatedMovies () {

const topRatedMoviesUrl = baseUrl + 'movie/top_rated?api_key=' + APIKEY;

fetch( topRatedMoviesUrl )
.then(response => response.json())
.then(data => {
    
    const returnedTopRatedMoviesArray = data.results;

    returnedTopRatedMoviesArray.forEach(element => {
            
            loadTopRatedMoviesToDiv( element );

        });
    

}); 

}

function loadTopRatedMoviesToDiv ( film ) {

    //Film Details
    var poster = (film.poster_path === null || film.poster_path === undefined) ? '' : film.poster_path;

    var div = document.createElement('div');
    div.className = 'popularMovies';

    appendAllTopRatedFilmElements( poster , div );

    $('.TopRatedMoviesDiv').appendChild(div);

}

function appendAllTopRatedFilmElements ( poster , div ) {

    appendTopRatedFilmPoster( poster , div );

}

function appendTopRatedFilmPoster ( poster , div ) {

    if(poster !== null && poster !== undefined && poster ) {

        var posterPath = poster;
        var posterImage = `https://image.tmdb.org/t/p/original/${posterPath}`;

        var img = document.createElement('img');
        img.src = posterImage;
        img.id = 'topRatedFilmPosterId';
        div.appendChild(img);
    }

}






