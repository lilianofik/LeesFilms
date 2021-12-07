// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth, createUserWithEmailAndPassword , signInWithEmailAndPassword , onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-auth.js";

import { getFirestore, collection, addDoc, setDoc, doc, getDocs, deleteDoc, serverTimestamp , query, where } 
from "https://www.gstatic.com/firebasejs/9.3.0/firebase-firestore.js";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB1V3m0qTp19KtAyMzaJSbCF8cvIvKywoc",
  authDomain: "leesfilms-a05d9.firebaseapp.com",
  projectId: "leesfilms-a05d9",
  storageBucket: "leesfilms-a05d9.appspot.com",
  messagingSenderId: "175285094201",
  appId: "1:175285094201:web:99c226f8aaf70ae5d70ae8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);//initialize fireStore

// to get reference to collection called "ratings":
const ratingsCollection = collection(db, "ratings");

//reviews collection
const reviewsCollection = collection(db, "reviews");

//film collection
const filmCollection = collection(db, "films");


window.signup = function(email, password) {//create new user

  return createUserWithEmailAndPassword(auth, email, password);
  // .then((userCredential) => {
  //   // Signed in 
  //   const user = userCredential.user;
  //   // ...
  // })
  // .catch((error) => {
  //   const errorCode = error.code;
  //   const errorMessage = error.message;

  //   console.log(errorMessage);
  //   // ..
  // });

}

window.login = function(email, password) { //login user

    return signInWithEmailAndPassword(auth, email, password);
  // .then((userCredential) => {
  //   // Signed in 
  //   const user = userCredential.user;
  //   alert('successful login');
  //   // ...
  // })
  // .catch((error) => {
  //   const errorCode = error.code;
  //   const errorMessage = error.message;
  //   console.log(errorMessage);
  // });

}

window.addDisplayName = function ( displayName , user ) {

  updateProfile(user, {
    displayName
  }).then(() => {
    // Profile updated!
    // ...
  }).catch((error) => {
    // An error occurred
    // ...
    alert(error.message);
  });

}



window.logout = function(){
  auth.signOut();
}


window.onLogin = function(f) {

  onAuthStateChanged(auth, (user) => {
  
    f( user );
  
  });

}

window.addRating = function( rating , filmIdRetrieved , filmNameRetrieved , userEmail ) {//add ratings to firestore db

  return setDoc(doc(db, "ratings", filmIdRetrieved.toString()), { rating, movieId: filmIdRetrieved , filmName: filmNameRetrieved, userEmail } );
}

window.addReview = function( review , filmIdRetrieved , filmNameRetrieved, userEmail ) {//add ratings to firestore db

  return setDoc(doc(db, "reviews", filmIdRetrieved.toString()), { review, movieId: filmIdRetrieved , filmName: filmNameRetrieved, userEmail } );
}

window.addFilm = function( filmIdRetrieved , filmNameRetrieved, poster, userEmail ) {//add ratings to firestore db

//setDoc(doc(db, "films", filmIdRetrieved.toString()), { movieId: filmIdRetrieved , filmName: filmNameRetrieved, poster, userEmail } );

 // return addDoc(filmCollection, { movieId: filmIdRetrieved , filmName: filmNameRetrieved, poster, userEmail });

 return setDoc(doc(db, "films", filmIdRetrieved.toString()), { movieId: filmIdRetrieved , filmName: filmNameRetrieved, poster, userEmail } );
}

 window.fetchFilmCollection = async function( userEmail ) {

 const filmCol = query(filmCollection, where("userEmail", "==", userEmail));

 const snap = await getDocs(filmCol);

    snap.forEach((doc) => {

        var retrievedPosterSnap = doc.data().poster;
        //var retrievedTitleSnap = doc.data().filmName;
        // if(retrievedPosterSnap != null || retrievedPosterSnap != undefined || retrievedPosterSnap != "") 
        // appendFilmColPoster( retrievedPosterSnap , retrievedTitleSnap);
        appendFilmColPoster( retrievedPosterSnap , doc.id);
    });


 }

 window.fetchReviewsCollection = async function( userEmail ) {

  const reviewsCol = query(reviewsCollection, where("userEmail", "==", userEmail));
 
  const snap = await getDocs(reviewsCol);
 
     snap.forEach((doc) => {
        
      appendUserReview(doc.data().filmName, doc.data().review, doc.id );
      
     });
 
 
  }

  window.fetchRatingsCollection = async function( userEmail ) {

    const ratingsCol = query(ratingsCollection, where("userEmail", "==", userEmail));
   
    const snap = await getDocs(ratingsCol);
   
       snap.forEach((doc) => {
           appendUserRating(doc.data().filmName, doc.data().rating , doc.id );
       });
   
   
    }

  window.deleteUserFilm = function ( filmId ) {

    return deleteDoc(doc(db, "films", filmId)); 

  }

  window.deleteUserReview = function ( filmId ) {

    return deleteDoc(doc(db, "reviews", filmId)); 

  }

  window.deleteUserRatings = function ( filmId ) {

    return deleteDoc(doc(db, "ratings", filmId)); 

  }