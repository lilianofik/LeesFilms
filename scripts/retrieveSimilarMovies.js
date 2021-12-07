'use script'

function fetchSimilarMovies () {

    $('#moreLikeThis').style.color = '#fff';//ensure link is white to indicate selection
    $('#moreLikeThis').style.opacity = 1;
    $('#overviewLink').style.color = '#6e6e6e';//ensure link is greyed to indicate deselection
    $('#overviewLink').style.opacity = 0.5;

const similarMoviesUrl = baseUrl + 'movie/' + filmIdRetrieved + '/similar?api_key=' + APIKEY + '&page=1';
const desiredNumOfSimilarFilms = 10;

fetch( similarMoviesUrl )
.then(response => response.json())
.then(data => {
    
    const lengthOfReturnedSimilarMovies = data.results.length;
    const returnedSimilarFilmsArray = data.results;

    if( lengthOfReturnedSimilarMovies > 10 ) {

        for(var i = 0; i < desiredNumOfSimilarFilms; i++){

            if( returnedSimilarFilmsArray[i].id === filmIdRetrieved && (desiredNumOfSimilarFilms + 1) < lengthOfReturnedSimilarMovies ) {
                desiredNumOfSimilarFilms++;
                continue;
            }

            else loadSimilarMovieToDiv( returnedSimilarFilmsArray[i] );
        }

    } else {
        returnedSimilarFilmsArray.forEach(element => {
            
            loadSimilarMovieToDiv( element );

        });
    }

}); 

}

function loadSimilarMovieToDiv ( film ) {

    //Film Details
    //var filmTitle = film.original_title;
    var poster = (film.poster_path === null || film.poster_path === undefined) ? '' : film.poster_path;

    var div = document.createElement('div');
    div.className = 'similarFilm';

    appendAllSimilarFilmElements( poster , div );

    // div.onclick = function () {

    // }

    $('.similarMoviesDiv').appendChild(div);
    
}

function appendAllSimilarFilmElements( poster , div ) {

    appendSimilarFilmPoster( poster , div );
    //appendSimilarFilmTitle( filmTitle , div );

}

function appendSimilarFilmPoster ( poster , div ) {

    if(poster !== null && poster !== undefined && poster ) {

        var posterPath = poster;
        var posterImage = `https://image.tmdb.org/t/p/original/${posterPath}`;

        var img = document.createElement('img');
        img.src = posterImage;
        img.id = 'similarPosterId';
        div.appendChild(img);
    }

}

// function appendSimilarFilmTitle ( filmTitle , div ) {

//     var h2 = document.createElement('h2');
//     h2.innerText = filmTitle;
//     h2.id = 'similarFilmTitleId';
//     div.appendChild(h2);

// }

// function appendToFlexSemiDiv (filmTitle , filmReleaseYear , div ) {

//     var semiDiv = document.createElement('div');
//     semiDiv.className = 'flexSimiDeets';

//     var h2 = document.createElement('h2');//append filmTitle to div
//     h2.innerText = filmTitle;
//     h2.id = 'similarFilmTitleId';
//     semiDiv.appendChild(h2);

//     var p = document.createElement('p');//append filmReleaseYear to div
//     p.innerText = filmReleaseYear;
//     p.id = 'similarFilmReleaseYearId';
//     semiDiv.appendChild(p);

//     div.appendChild( semiDiv );//append flexSemiDiv to similarFilmDiv
// }




