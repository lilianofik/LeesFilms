'use strict'                           

const baseUrl = 'https://api.themoviedb.org/3/';//base url for rest API

var movieGenreObjectList = {};
var genreSelections = [];
var finalSelections = {};

const currentYear = new Date().getFullYear();//to calculate the different movie recoms dynamically per chosen date ranges

function listAllGenreOptions() {
  
    movieGenreObjectList = {};
    genreSelections = [];
    finalSelections = {};

    // $('#genreLimit').style.display = 'none';
    // $('.genreList').style.pointerEvents = 'auto';

    const fullUrl = baseUrl + 'genre/movie/list?api_key=' + APIKEY;

    fetch(fullUrl)
    .then(response => response.json())
    .then(data => {

        data.genres.forEach(doc => 
            {
                forEachGenreOption( doc ) 
            }

            );

    });
  
  }

  function forEachGenreOption( doc ) {

    var idOfGenre = doc.id;
    var nameOfGenre = doc.name;

    movieGenreObjectList[nameOfGenre] = idOfGenre; //create objects of genres mapped to their ids(keys)

    var li = document.createElement('li');

    li.innerText = nameOfGenre;

    $('.genreList').appendChild(li);

    li.onclick = selectedGenre;
  }

  function selectedGenre( event ) {

    if(this.classList.contains('selectedOption')) {
      this.classList.remove('selectedOption');
      unselectGenre ( this.innerText );
    }

    else {

      genreSelections.push(this.innerText);
      this.classList.add('selectedOption');

      // if(!(genreSelections.length >= 3)) {
      //   genreSelections.push(this.innerText);
      //   this.classList.add('selectedOption');

      //   $('#genreLimit').style.display = 'none';
      //   $('.genreList').style.pointerEvents = 'auto';
      // } else {
      //   $('#genreLimit').style.display = 'block';
      //   $('.genreList').style.pointerEvents = 'none';

      //   // $('.genreList').classList.remove('selectedOption');
      // }
      
    }
    
  }

  function unselectGenre ( selectedOne ) {

    for( var i = 0; i < genreSelections.length; i++){ 

        if ( genreSelections[i] === selectedOne) { 
      
          genreSelections.splice(i, 1); 
      }

    }

  }

  //Handle Genre Selection Functionality
  function ifBackButtonClickedGenre(){

    $('#backBtnGenre').style.opacity = '50%';
    $('#backBtnGenre').style.pointerEvents = 'none';

    $('#nextBtnGenre').style.opacity = '50%';
    $('#nextBtnGenre').style.pointerEvents = 'none';

    $('.genreOptions').style.display = 'none';
    $('.searchEngine').style.display = 'block';
    //$('.main').style.overflow = 'hidden'; //hide the overflow when you return to search engine
    $('.genreList').innerHTML = ""; //Ensure that list of genres don't duplicate upon new login/sign up
    genreSelections = []; //clear genre selections to allow user make new selections
    //$('#genreLimit').style.display = 'none';//Ensure components regarding genre limit don't resurface
    $('.genreList').style.pointerEvents = 'auto';
  }

  function ifNextButtonClickedGenre(){

    $('#backBtnYears').style.opacity = '50%';
    $('#backBtnYears').style.pointerEvents = 'none';

    $('#nextBtnYears').style.opacity = '50%';
    $('#nextBtnYears').style.pointerEvents = 'none';

    $('.genreOptions').style.display = 'none';
    $('.yearOptions').style.display = 'block';
    //$('.main').style.overflow = 'hidden'; //hide the overflow when you return to search engine
    $('.genreList').innerHTML = ""; //Ensure that list of genres don't duplicate upon new login/sign up
    //$('#genreLimit').style.display = 'none';//Just to ensure no errors
    $('.genreList').style.pointerEvents = 'auto';

    finalSelections.pickedGenres = genreSelections;//append chosen genres to final selections object
  }

//Handle Year Selection Functionality
function ifBackButtonClickedYear(){

    removePrevSelectedYear();

    //reset year buttons to be greyed out
    $('#backBtnYears').style.opacity = '50%';
    $('#backBtnYears').style.pointerEvents = 'none';

    $('#nextBtnYears').style.opacity = '50%';
    $('#nextBtnYears').style.pointerEvents = 'none';

    //reset genre buttons to be greyed out
    $('#backBtnGenre').style.opacity = '50%';
    $('#backBtnGenre').style.pointerEvents = 'none';

    $('#nextBtnGenre').style.opacity = '50%';
    $('#nextBtnGenre').style.pointerEvents = 'none';

    $('.genreOptions').style.display = 'block';
    $('.yearOptions').style.display = 'none';
    //$('.main').style.overflow = 'scroll'; //show the overflow when you return to search engine
    //$('.genreList').innerHTML = ""; //Ensure that list of genres don't duplicate upon new login/sign up
    genreSelections = []; //clear genre selections to allow user make new selections
    listAllGenreOptions(); //Load genre list again
    delete finalSelections.pickedGenres; //clear chosen genres from final selections object to allow them to reselect
    delete finalSelections.year; //clear chosen year from final selections object to allow them to reselect
  }

  function removePrevSelectedYear() {

    var previouslySelected = $('.selectedOption');

    if(previouslySelected) {
        previouslySelected.classList.remove("selectedOption");
    }

  }

  function emptyGenreList() {
    genreSelections = [];
  }

  function refactorGenreList() {

    $('.genreList').style.pointerEvents = 'auto';

        $$(".selectedOption").forEach((li) => {

            li.classList.remove('selectedOption');
    
        });

  }
 
//Assigning specific selected year to final selections object
function ifSurpriseDateRange() {

    removePrevSelectedYear();

    this.classList.add("selectedOption");

    finalSelections.year = Math.floor(Math.random() * (currentYear - (currentYear - 20)) + 2000);
    
}

function iflast2years( ) {

    removePrevSelectedYear();

    this.classList.add("selectedOption");

    finalSelections.year = currentYear - 1;
    
}

function iflast3years( ) {

    removePrevSelectedYear();

    this.classList.add("selectedOption");

    finalSelections.year = currentYear - 3;
}

function iflast5years( ) {

    removePrevSelectedYear();

    this.classList.add("selectedOption");

    finalSelections.year = currentYear - 5;
}

function iflast10years( ) {

    removePrevSelectedYear();

    this.classList.add("selectedOption");

    finalSelections.year = currentYear - 10;
}

function iflast20years( ) {

    removePrevSelectedYear();

    this.classList.add("selectedOption");

    finalSelections.year = currentYear - 20;
}

//Recommend a movie

function recommendMovie() {

    var appendedGenres = '';

    var arrayOfGenres = finalSelections.pickedGenres;
//3 -> 0, 1, 2
    for(var i = 0; i < arrayOfGenres.length; i++) {

        //console.log(movieGenreObjectList[arrayOfGenres[i]]);

        var currentMovieID = movieGenreObjectList[arrayOfGenres[i]];

        if(i <= arrayOfGenres.length - 2) {

            var newId = currentMovieID + ',';
            appendedGenres += newId;
        }

        else appendedGenres += currentMovieID;

    }

    var chosenYear = finalSelections.year;

    const dicoverUrl = baseUrl + 'discover/movie?api_key=' + APIKEY + '&language=en-US&sort_by=vote_average.desc&page=1&primary_release_year=' + chosenYear + '&with_genres=' + appendedGenres;

    fetchMovieId( dicoverUrl );

}

