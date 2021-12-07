'use script'

function fetchNowPlayingMovies () {

const nowPlayingMoviesUrl = baseUrl + 'movie/now_playing?api_key=' + APIKEY;

fetch( nowPlayingMoviesUrl )
.then(response => response.json())
.then(data => {


    const lengthOfReturnedNowPlayingMovies = data.results.length;
    const returnedNowPlayingArray = data.results;

    returnedNowPlayingArray.forEach(element => {
            
            loadNowPlayingMoviesToDiv( element );

        });
    

}); 

}

function loadNowPlayingMoviesToDiv ( film ) {

    //Film Details
    var poster = (film.poster_path === null || film.poster_path === undefined) ? '' : film.poster_path;

    var div = document.createElement('div');
    div.className = 'nowPlayingFilm';

    appendAllNowPlayingFilmElements( poster , div );

    $('.NowPlayingMoviesDiv').appendChild(div);

}

function appendAllNowPlayingFilmElements ( poster , div ) {

    appendNowPlayingFilmPoster( poster , div );

}

function appendNowPlayingFilmPoster ( poster , div ) {

    if(poster !== null && poster !== undefined && poster ) {

        var posterPath = poster;
        var posterImage = `https://image.tmdb.org/t/p/original/${posterPath}`;

        var img = document.createElement('img');
        img.src = posterImage;
        img.id = 'nowPlayingPosterId';
        div.appendChild(img);
    }

}






