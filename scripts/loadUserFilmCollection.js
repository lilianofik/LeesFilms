'use strict'   

function appendFilmColPoster( poster , filmId ) {

    if( poster )  {
        var posterPath = poster;

        var div = document.createElement('div');
        div.className = 'savedFilmDiv';

        var posterImage = `https://image.tmdb.org/t/p/original/${posterPath}`;
        var img = document.createElement('img');
        img.src = posterImage;
        img.className = 'userFilmColPosterId';

        var deleteBtn = document.createElement('img');

        var imagePath = `imagesUsed/trashCanPick.png`;

        deleteBtn.src = imagePath;
        deleteBtn.className = 'trashUserElement';

        deleteBtn.addEventListener('click', event => {

            deleteUserFilm( filmId );

            deleteBtn.remove();
            img.remove();
          });

        div.appendChild(img);
        div.appendChild(deleteBtn);

        $('.userFilmCol').appendChild(div);
    }

        // var h2 = document.createElement('h2');
        // h2.innerText = title;
        // $('.noPoster').appendChild(h2);
    

}

function appendUserReview( filmName, review , filmId ) {

        var div = document.createElement('div');
        div.className = 'savedReviewDiv';

        var p = document.createElement('p');
        p.innerText = filmName + ': ' + review;
        p.id = 'userReview';

        var deleteBtn = document.createElement('img');

        var imagePath = `imagesUsed/trashCanPick.png`;

        deleteBtn.src = imagePath;

        deleteBtn.className = 'trashUserElement';
 
        deleteBtn.addEventListener('click', event => {

            deleteUserReview( filmId );

            deleteBtn.remove();
            p.remove();
          });

        div.appendChild(p);
        div.appendChild(deleteBtn);

        $('.userReviews').appendChild(div);
    
}

function appendUserRating( filmName, rating , filmId ) {

    var div = document.createElement('div');
        div.className = 'savedRatingsDiv';

    var p = document.createElement('p');
    p.innerText = filmName + ': ' + rating + ' stars';
    p.id = 'userRating';

    var deleteBtn = document.createElement('img');
    
    var imagePath = `imagesUsed/trashCanPick.png`;

    deleteBtn.src = imagePath;

    deleteBtn.className = 'trashUserElement';

    deleteBtn.addEventListener('click', event => {

        deleteUserRatings( filmId );

        deleteBtn.remove();
        p.remove();
      });

    div.appendChild(p);
    div.appendChild(deleteBtn);


    $('.userRatings').appendChild(div);

}