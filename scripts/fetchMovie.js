'use strict'

// var filmIdRetrieved = '';

function fetchMovieId( discoverUrl ) {

    fetch( discoverUrl )
    .then(response => response.json())
    .then(data => {

        var lengthOfReturnedObject = data.results.length;

        var rangeOfRandomSelections = Math.floor(Math.random() * lengthOfReturnedObject);

        var fetchedMovieId = '';

        try{
            fetchedMovieId = data.results[rangeOfRandomSelections].id;
        }catch(err) {
            if(err.message == `Cannot read properties of undefined (reading 'id')`) $('.notAvail').style.display = 'block';
            //Cannot read properties of undefined (reading 'id')
        }

        filmIdRetrieved = fetchedMovieId;//save film ID for future use

        fetchMovie( fetchedMovieId );
    }); 

}

function fetchMovie( fetchedMovieId ) {

    var movieUrl = baseUrl + 'movie/' + fetchedMovieId + '?api_key=' + APIKEY; // fetches the movie specific details par TMDB
    //.then(response => response.json())

    fetch( movieUrl )
    .then(response => response.json())
    .then(data => {
        
        loadMovieToDiv( data );
        //loadToFetchIMDBdetails( data );
    }); 
}
//Load movie to div
//check if fetch will work with loadToFetchIMDBdetails
//then add rating n dat

// function loadToFetchIMDBdetails ( film ) {

//     var imdb_id = film.imdb_id;

//     var imdbUrl = baseUrl + 'find/' + imdb_id + '?api_key=' + APIKEY + '&external_source=imdb_id';
    
//     fetch( imdbUrl )
//     .then(response => {
//         console.log('fuck ' + JSON.stringify(response));
//         // if (response.success == true) {
//         //     return response.json();
//         //   } else {
//         //     throw Error('The imdb recommendation you need is not possible today :(' + response.status_message);
//         //   }
    
//     })
//     .then(data => {
//         // if( data.movie_results[0] === null || data.movie_results[0] === undefined ) loadMovieToDiv ( film ); 
        
//         // else loadMovieToDivIMDB ( data.movie_results[0] , film );
//         loadMovieToDivIMDB ( data.movie_results[0] , film );
//     })
//     .catch((error) => {
//         // Only network error comes here
//         console.log(error);
//       }); 

// }

// function loadMovieToDivIMDB ( imdbRes, film ) {

//         /*
//         {"movie_results":[{"adult":false,"backdrop_path":"/qwtgsc5pWRdWOgD6OCFIVkqSDPn.jpg","genre_ids":[27],"vote_count":4122,"original_language":"en","original_title":"Final Destination","poster_path":"/g4dkGtWdc1eQ9JL1kta6LC0DlGS.jpg","release_date":"2000-03-17","video":false,"vote_average":6.5,"title":"Final Destination","overview":"After a teenager has a terrifying vision of him and his friends dying in a plane crash, he prevents the accident only to have Death hunt them down, one by one.","id":9532,"popularity":54.671}],"person_results":[],"tv_results":[],"tv_episode_results":[],"tv_season_results":[]}
    
//     */
//     //Film Details
//     var filmTitle = (imdbRes.original_title === null || imdbRes.original_title === undefined ) ? film.original_title : imdbRes.original_title;
//     var overview = (imdbRes.overview === null || imdbRes.overview === undefined) ? film.overview : imdbRes.overview; 
//     var poster = (imdbRes.poster_path === null || imdbRes.poster_path === undefined) ? film.poster_path : imdbRes.poster_path;
//     var filmReleaseYear = (imdbRes.release_date.substring(0, 4) === null || imdbRes.release_date.substring(0, 4) === undefined) ? film.release_date.substring(0, 4) : imdbRes.release_date.substring(0, 4); 
//     var filmDuration = film.runtime;
//     // var backdrop =  (imdbRes.backdrop_path === null || imdbRes.backdrop_path === undefined) ? '': imdbRes.backdrop_path;

//     //Get Rating
//     var isThereIMDBrating = (imdbRes.vote_average !== null || imdbRes.vote_average !== undefined);
//     var isThereFilmrating = (film.vote_average !== null || film.vote_average !== undefined);
//     var rating;

//     if( isThereIMDBrating ) rating = imdbRes.vote_average + '/10';
//     else if( !isThereIMDBrating && isThereFilmrating ) rating = film.vote_average + '/10';
//     else rating = null;

//     //Get Genres
//     //"genres":[{"id":14,"name":"Fantasy"},{"id":27,"name":"Horror"},{"id":53,"name":"Thriller"}]
//     var lengthOfGenreList = film.genres.length;
//     var genreList = '';

//     for(var i = 0; i < lengthOfGenreList ; i++) {

//         var currentGenre = film.genres[i].name;

//         if(i <= lengthOfGenreList - 2) {

//             var newGenre = currentGenre + ',';
//             genreList += newGenre;
//         }

//         else genreList += currentGenre;

//     }

//     appendAllFilmElements( filmTitle , overview , poster , filmReleaseYear , filmDuration , rating , genreList );

//     $('.recommendationsEngine').style.display = 'none';//close recommendations ending to display recommended film
//     $('.recommendedFilm').style.display = 'block';
// }

function loadMovieToDiv ( film ) {

    //loadToFetchIMDBdetails ( film );

    //Film Details
    filmNameRetrieved = film.original_title;//set film name for later use
    var filmTitle = film.original_title;
    var overview = film.overview;
    var poster = (film.poster_path === null || film.poster_path === undefined) ? '' : film.poster_path;
    filmPosterRetrieved = poster;
    
    var filmReleaseYear = film.release_date.substring(0, 4);
    var filmDuration = film.runtime;

    var isThereFilmrating = (film.vote_average !== null || film.vote_average !== undefined);
    var rating;

    //Get Rating
    if( isThereFilmrating ) rating = film.vote_average + '/10';
    else rating = null;

    //Get Genres
    //"genres":[{"id":14,"name":"Fantasy"},{"id":27,"name":"Horror"},{"id":53,"name":"Thriller"}]
    var lengthOfGenreList = film.genres.length;
    var genreList = '';

    for(var i = 0; i < lengthOfGenreList ; i++) {

        var currentGenre = film.genres[i].name;

        if(i <= lengthOfGenreList - 2) {

            var newGenre = currentGenre + ', ';
            genreList += newGenre;
        }

        else genreList += currentGenre;

    }

    appendAllFilmElements( filmTitle , overview , poster , filmReleaseYear , filmDuration , rating , genreList );

    $('.recommendationsEngine').style.display = 'none';//close recommendations ending to display recommended film
    $('.recommendedFilm').style.display = 'block';
}
