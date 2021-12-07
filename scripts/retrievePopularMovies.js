'use script'

function fetchPopularMovies () {

const popularMoviesUrl = baseUrl + 'movie/popular?api_key=' + APIKEY;

fetch( popularMoviesUrl )
.then(response => response.json())
.then(data => {
    
    const returnedPopularMoviesArray = data.results;

    returnedPopularMoviesArray.forEach(element => {
            
            loadNowPopularMoviesToDiv( element );

        });
    

}); 

}

function loadNowPopularMoviesToDiv ( film ) {

    //Film Details
    var poster = (film.poster_path === null || film.poster_path === undefined) ? '' : film.poster_path;

    var div = document.createElement('div');
    div.className = 'popularMovies';

    appendAllPopularFilmElements( poster , div );

    $('.PopularMoviesDiv').appendChild(div);

}

function appendAllPopularFilmElements ( poster , div ) {

    appendPopularFilmPoster( poster , div );

}

function appendPopularFilmPoster ( poster , div ) {

    if(poster !== null && poster !== undefined && poster ) {

        var posterPath = poster;
        var posterImage = `https://image.tmdb.org/t/p/original/${posterPath}`;

        var img = document.createElement('img');
        img.src = posterImage;
        img.id = 'popularFilmPosterId';
        div.appendChild(img);
    }

}






