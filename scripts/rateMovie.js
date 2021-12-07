'use strict'

function starRatingOnclick( ) {

    $$(".stars a").forEach((star, clickedIndex) => {

        star.addEventListener('click', event => {

            if( (clickedIndex + 1 < $$(".stars a").length) && $$('.stars a')[clickedIndex + 1].classList.contains('active')) {

                deactivateRating( clickedIndex );
            }

            for(var i = 0; i <= clickedIndex; ++i) {

                $$(".stars a")[i].classList.add("active");

            }

            //$(".stars").classList.add("disabled");

            addRating( clickedIndex +  1, filmIdRetrieved , filmNameRetrieved, userEmail );
            //do magic
          });

    });

}

function deactivateRating( clickedIndex ) {

    for(var i = clickedIndex + 1; i < $$(".stars a").length; ++i) {

        if($$(".stars a")[i].classList.contains("active")) $$(".stars a")[i].classList.remove("active");
    }
}
