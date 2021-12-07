'use script'

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
var isReenterPswd = false;
const APIKEY = '0cfa28cb964e4771fa43d752dd8e69b3';
var filmIdRetrieved = '';
var filmNameRetrieved = '';
var filmPosterRetrieved = '';
var userEmail = '';
var stolenDisplayName = '';
var userDisplayName = '';

window.onload = function() {

    //Monitor when user signs in/out
    onLogin( user => {

        
        if(user){
            alert('logged in');
            
            //addDisplayName(stolenDisplayName, user);

            userEmail = user.email;
            userDisplayName = user.displayName;
            alterScreenDisplayWhenSignedIn();
        
        }
        else{
            alert('logged out');

            alterScreenDisplayWhenSignedOut();
        }

    });

    $('#homeBtn').onclick = () => {

        $('.userFilmCol').innerHTML = '';//reset the user collection in the div so as not to duplicate
        $('.userReviews').innerHTML = '';
        $('.userRatings').innerHTML = '';

        fetchFilmCollection( userEmail );
        fetchReviewsCollection( userEmail );
        fetchRatingsCollection( userEmail );

        $('.WelcomeContent').style.display = 'none';
        $('.recommendationsEngine').style.display = 'none';
        $('.recommendedFilm').style.display = 'none';
        $('.NowPlayingMoviesDiv').style.display = 'none';
        $('.TopRatedMoviesDiv').style.display = 'none';
        // $('.nowPlayingHeading').style.display = 'block';
        $('.PopularMoviesDiv').style.display = 'none';

        $('.Home').style.display = 'block';
        $('.notAvail').style.display = 'none';
    }

    $('.logoImage').onclick = () => {

        $('.recommendationsEngine').style.display = 'block';
        $('.searchEngine').style.display = 'block';
        $('.yearOptions').style.display = 'none';
        $('.genreOptions').style.display = 'none';
        $('.Home').style.display = 'none';
        $('.WelcomeContent').style.display = 'none';
        $('.recommendedFilm').style.display = 'none';
        $('.PopularMoviesDiv').style.display = 'none';
        $('.TopRatedMoviesDiv').style.display = 'none';
        $('.NowPlayingMoviesDiv').style.display = 'none';
        $('.notAvail').style.display = 'none';

        deactivateRating();
        refactorGenreList();
        removePrevSelectedYear();
    }

    $('#returnToRecEngine').onclick = () => {

        $('.recommendationsEngine').style.display = 'block';
        $('.searchEngine').style.display = 'block';
        $('.yearOptions').style.display = 'none';
        $('.genreOptions').style.display = 'none';
        $('.Home').style.display = 'none';
        $('.WelcomeContent').style.display = 'none';
        $('.recommendedFilm').style.display = 'none';
        $('.PopularMoviesDiv').style.display = 'none';
        $('.TopRatedMoviesDiv').style.display = 'none';
        $('.NowPlayingMoviesDiv').style.display = 'none';
        $('.notAvail').style.display = 'none';

        deactivateRating();
        refactorGenreList();
        removePrevSelectedYear();
    }

    $('#goToRec').onclick = () => {

        $('.recommendationsEngine').style.display = 'block';
        $('.searchEngine').style.display = 'block';
        $('.yearOptions').style.display = 'none';
        $('.genreOptions').style.display = 'none';
        $('.Home').style.display = 'none';
        $('.WelcomeContent').style.display = 'none';
        $('.recommendedFilm').style.display = 'none';
        $('.PopularMoviesDiv').style.display = 'none';
        $('.TopRatedMoviesDiv').style.display = 'none';
        $('.NowPlayingMoviesDiv').style.display = 'none';
        $('.notAvail').style.display = 'none';

        deactivateRating();
        refactorGenreList();
        removePrevSelectedYear();
    }

    $('#restartRec').onclick = () => {

        $('.recommendationsEngine').style.display = 'block';
        $('.searchEngine').style.display = 'block';
        $('.yearOptions').style.display = 'none';
        $('.genreOptions').style.display = 'none';
        $('.Home').style.display = 'none';
        $('.WelcomeContent').style.display = 'none';
        $('.recommendedFilm').style.display = 'none';
        $('.PopularMoviesDiv').style.display = 'none';
        $('.TopRatedMoviesDiv').style.display = 'none';
        $('.NowPlayingMoviesDiv').style.display = 'none';
        $('.notAvail').style.display = 'none';

        deactivateRating();
        refactorGenreList();

        $('#backBtnGenre').style.opacity = '50%';
        $('#backBtnGenre').style.pointerEvents = 'none';

        $('#nextBtnGenre').style.opacity = '50%';
        $('#nextBtnGenre').style.pointerEvents = 'none';

        removePrevSelectedYear();
    }

    //Sign On Functionality
    $('#loginBtn').onclick = function(){ //onclick functionality for login button homepage
        $('.loginForm').style.display = 'block';
        $('.signUpForm').style.display = 'none';
    }

    $('#signUpBtn').onclick = function(){ //onclick functionality for signup button homepage
        $('.loginForm').style.display = 'none';
        $('.signUpForm').style.display = 'block';
    }

    $('#signUpFormSubmit').onclick = function( event ) { //create new user functionality

        const userPswdSignUp = $('#signUpPswd').value;

        if(userPswdSignUp.length < 6) $('#badPswdSignUp').style.display = 'block';
        
        else {

            $('#badPswdSignUp').style.display = 'none'; 
        }

        stolenDisplayName = $('#FirstName');

        signup( $('#signUpEmail').value, $('#signUpPswd').value )
        .then( () => {
            $('#signUpEmail').value = '';
            $('#signUpPswd').value = '';

            $('#reusedEmail').style.display = 'none';//assume email is correct
        })
        .catch((err) => {
            if(('Firebase: Error (auth/email-already-in-use).') == err.message) {

                $('#reusedEmail').style.display = 'block';
                $('#signUpEmail').value = '';
                $('#signUpPswd').value = '';
            } 

        });

        event.preventDefault();
    }

    $('#loginFormSubmit').onclick = function( event ) { //login user functionality

        login( $('#loginEmail').value, $('#loginPswd').value )
        .then( () => {
            $('#loginEmail').value = '';
            $('#loginPswd').value = '';

            $('#wrongPassword').style.display = 'none';
        })
        .catch((err) => {
            console.log(err.message);
            if(('Firebase: Error (auth/wrong-password).') == err.message || ('Firebase: Error (auth/user-not-found).') == err.message) {

                $('#wrongPassword').style.display = 'block';
                $('#loginEmail').value = '';
                $('#loginPswd').value = '';
            }
             

        });

        event.preventDefault();
    }

    $('#signOut').onclick = function() {

        logout();

    }

    //Search Engine Functionality
    $('#startEngineBtn').onclick = function() {

        listAllGenreOptions();

        $('.searchEngine').style.display = 'none';
        $('.PopularMoviesDiv').style.display = 'none';
        $('.genreOptions').style.display = 'block';
        $('.yearOptions').style.display = 'none';
        //$('.main').style.overflow = 'scroll';
    }

    //Genre Selections functionality

    $('.genreList').onclick = () => {

        $('#backBtnGenre').style.opacity = '100%';
        $('#backBtnGenre').style.pointerEvents = 'auto';

        $('#nextBtnGenre').style.opacity = '100%';
        $('#nextBtnGenre').style.pointerEvents = 'auto';
    }

    $('#backBtnGenre').onclick = ifBackButtonClickedGenre;

    $('#nextBtnGenre').onclick = ifNextButtonClickedGenre;

    //Year Selections Functionality

    $('.listOfYears').onclick = () => {

        $('#backBtnYears').style.opacity = '100%';
        $('#backBtnYears').style.pointerEvents = 'auto';

        $('#nextBtnYears').style.opacity = '100%';
        $('#nextBtnYears').style.pointerEvents = 'auto';

    }

    $('#backBtnYears').onclick = ifBackButtonClickedYear;

        //Selected year
        $('#surpriseDateRange').onclick = ifSurpriseDateRange;
        $('#last2years').onclick = iflast2years;
        $('#last3years').onclick = iflast3years;
        $('#last5years').onclick = iflast5years;
        $('#last10years').onclick = iflast10years;
        $('#last20years').onclick = iflast20years;

    $('#nextBtnYears').onclick = recommendMovie;

    $('#overviewLink').onclick = () => {
        $('.overviewDiv').style.display = 'block';//show overview to close similar films
        $('.reviewBox').style.display = 'block';//ensure review box is in display
        $('#poster').style.display = 'block';
        $('.similarMoviesDiv').style.display = 'none';
        $('#moreLikeThis').style.color = '#6e6e6e';//ensure link is greyed to indicate deselection
        $('#moreLikeThis').style.opacity = 0.5;
        $('#overviewLink').style.color = '#fff';//ensure link is white to indicate selection
        $('#overviewLink').style.opacity = 1;//reset link opacity to indicate selection
        $('.similarMoviesDiv').innerHTML = ""; //Ensure that list of similar films don't duplicate upon new login/sign up or refresh
    }

    $('#moreLikeThis').onclick = () => {
        
        fetchSimilarMovies();

        $('.overviewDiv').style.display = 'none';//close overview to display similar films
        $('#poster').style.display = 'none';
        $('.reviewBox').style.display = 'none';//ensure review box is no longer in display
        $('.similarMoviesDiv').style.display = 'flex';
    
    }
  
    $(".stars").onclick = starRatingOnclick();

    $('#reviewFormSubmit').onclick = ( event ) => {

        addReview( $('#newReview').value , filmIdRetrieved , filmNameRetrieved, userEmail )
        .then(() => {
            $('#newReview').value = '';
            alert('review submitted successfully');
        })
        .catch( err => console.log(err.message ));

        event.preventDefault();
    }

    $('#saveMovie').onclick = () => {
        addFilm(filmIdRetrieved, filmNameRetrieved, filmPosterRetrieved, userEmail)
        .then(() => alert("movie saved!"));
    }

    $('#NowPlayingLink').onclick = () => {

        $('.NowPlayingMoviesDiv').innerHTML = '';//reset the now playing movies div so there is no duplication

        fetchNowPlayingMovies();
            
        $('.WelcomeContent').style.display = 'none';
        $('.recommendationsEngine').style.display = 'none';
        $('.recommendedFilm').style.display = 'none';
        $('.PopularMoviesDiv').style.display = 'none';
        $('.TopRatedMoviesDiv').style.display = 'none';
        $('.Home').style.display = 'none';
        // $('.nowPlayingHeading').style.display = 'block';
        $('.NowPlayingMoviesDiv').style.display = 'grid';

        

    }

    $('#PopularMoviesLink').onclick = () => {

        $('.PopularMoviesDiv').innerHTML = '';//reset the popular movies div so there is no duplication

        fetchPopularMovies();

        $('.WelcomeContent').style.display = 'none';
        $('.recommendationsEngine').style.display = 'none';
        $('.recommendedFilm').style.display = 'none';
        $('.NowPlayingMoviesDiv').style.display = 'none';
        $('.TopRatedMoviesDiv').style.display = 'none';
        $('.Home').style.display = 'none';
        // $('.nowPlayingHeading').style.display = 'block';
        $('.PopularMoviesDiv').style.display = 'grid';
    }

    $('#TopRatedMoviesLink').onclick = () => {
        
        $('.TopRatedMoviesDiv').innerHTML = '';//reset the now top rated movies div so there is no duplication

        fetchTopRatedMovies();

        $('.WelcomeContent').style.display = 'none';
        $('.recommendationsEngine').style.display = 'none';
        $('.recommendedFilm').style.display = 'none';
        $('.NowPlayingMoviesDiv').style.display = 'none';
        $('.TopRatedMoviesDiv').style.display = 'grid';
        $('.Home').style.display = 'none';
        // $('.nowPlayingHeading').style.display = 'block';
        $('.PopularMoviesDiv').style.display = 'none';

    }

}



function alterScreenDisplayWhenSignedOut() {

    $('.WelcomeContent').style.display = 'block';
    $('#signOut').style.display = 'none';
    $('.searchEngine').style.display = 'none';
    $('.genreOptions').style.display = 'none';
    $('.genreList').innerHTML = ""; //Ensure that list of genres don't duplicate upon new login/sign up
    $('.yearOptions').style.display = 'none';//hide year options
    $('.recommendedFilm').style.display = 'none';//hide recommended film div after sign out
    $('.Home').style.display = 'none';
    userEmail = '';//reset userEmail
    stolenDisplayName = '';
    $('.PopularMoviesDiv').style.display = 'none';
    $('.TopRatedMoviesDiv').style.display = 'none';
    $('.NowPlayingMoviesDiv').style.display = 'none';
}

function alterScreenDisplayWhenSignedIn() {

    $('.WelcomeContent').style.display = 'none';
    $('#signOut').style.display = 'block';
    $('.recommendationsEngine').style.display = 'block';
    $('.searchEngine').style.display = 'block';

}
