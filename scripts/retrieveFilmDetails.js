'use strict'   

function appendAllFilmElements( filmTitle , overview , poster , filmReleaseYear , filmDuration , rating , genreList ) {

    appendFilmTitle( filmTitle );
    appendFilmRating( rating );
    appendFilmReleaseYear( filmReleaseYear );
    appendFilmDuration( filmDuration );
    appendFilmOverview( overview );
    appendFilmPoster( poster );
    appendFilmGenre( genreList );
}

function appendFilmTitle( filmTitle ) {

    filmNameRetrieved = filmTitle;

    // var h2 = document.createElement('h2');
    // h2.innerText = filmTitle;
    $('#filmTitle').innerText = filmTitle;

}

function appendFilmOverview( overview ) {

    // var p = document.createElement('p');
    // p.innerText = overview;

    $('#overview').innerText = overview;

}

function appendFilmPoster( poster ) {

    if(poster !== null && poster !== undefined && poster ) {
        var posterPath = poster;
        var posterImage = `https://image.tmdb.org/t/p/original/${posterPath}`;
        $('#poster').src = posterImage;
    }

    else $('#poster').style.display = 'none';
}

function appendFilmReleaseYear( filmReleaseYear ) {

    // var p = document.createElement('p');
    // p.innerText = filmReleaseYear;
    $('#releaseYear').innerText = filmReleaseYear;
}

function appendFilmDuration( filmDuration ) {

    if(filmDuration !== 0 && filmDuration !== null) {

        // var p = document.createElement('p');
        // p.innerText = filmDuration + ' min';
        $('#filmDuration').innerText = filmDuration + ' min';
        
    }

}

function appendFilmRating( rating ) {

    if(rating !== null && rating !== undefined ) {

        // var h3 = document.createElement('h3');
        // h3.innerText = rating + ' ⭐';
        $('#rating').innerText = rating;

    }

}

function appendFilmGenre( genreList ) {
    //genreNames

    if(genreList !== null && genreList !== undefined ) {

        // var p = document.createElement('p');
        // p.innerText = genreList;
        $('.genreNames').innerText = genreList;

    }

}


// function appendFilmTitle( filmTitle ) {

//     filmNameRetrieved = filmTitle;

//     var h2 = document.createElement('h2');
//     h2.innerText = filmTitle;
//     $('#filmTitle').appendChild(h2);

// }

// function appendFilmOverview( overview ) {

//     var p = document.createElement('p');
//     p.innerText = overview;
//     $('#overview').appendChild(p);

// }

// function appendFilmPoster( poster ) {

//     if(poster !== null && poster !== undefined && poster ) {
//         var posterPath = poster;
//         var posterImage = `https://image.tmdb.org/t/p/original/${posterPath}`;
//         $('#poster').src = posterImage;
//     }

//     else $('#poster').style.display = 'none';
// }

// function appendFilmReleaseYear( filmReleaseYear ) {

//     var p = document.createElement('p');
//     p.innerText = filmReleaseYear;
//     $('#releaseYear').appendChild(p);
// }

// function appendFilmDuration( filmDuration ) {

//     if(filmDuration !== 0 && filmDuration !== null) {

//         var p = document.createElement('p');
//         p.innerText = filmDuration + ' min';
//         $('#filmDuration').appendChild(p);
        
//     }

// }

// function appendFilmRating( rating ) {

//     if(rating !== null && rating !== undefined ) {

//         var h3 = document.createElement('h3');
//         h3.innerText = rating + ' ⭐';
//         $('#rating').appendChild(h3);

//     }

// }

// function appendFilmGenre( genreList ) {
//     //genreNames

//     if(genreList !== null && genreList !== undefined ) {

//         var p = document.createElement('p');
//         p.innerText = genreList;
//         $('.genreNames').appendChild(p);

//     }

// }

