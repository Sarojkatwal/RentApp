import * as firebase from 'firebase'

import '@firebase/storage'
import '@firebase/auth'
import '@firebase/firestore'
var firebaseConfig = {
  apiKey: "AIzaSyBnN0mOplUu5n6XqxDfhldI9OQwPsmHBNQ",
  authDomain: "minor-e33c9.firebaseapp.com",
  databaseURL: "https://minor-e33c9.firebaseio.com",
  projectId: "minor-e33c9",
  storageBucket: "minor-e33c9.appspot.com",
  messagingSenderId: "282324019539",
  appId: "1:282324019539:web:1595affaa428cef8a459a6",
  measurementId: "G-GF7DYLBYJ0"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

 

export default firebase;
