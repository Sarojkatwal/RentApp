import * as firebase from "firebase";
import '@firebase/storage'
import '@firebase/auth'
import '@firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBsZMXf_7MYgomP3cg2OCvqZVhnAVGVilI",
  authDomain: "reactapp-436d1.firebaseapp.com",
  databaseURL: "https://reactapp-436d1.firebaseio.com",
  projectId: "reactapp-436d1",
  storageBucket: "reactapp-436d1.appspot.com",
  messagingSenderId: "93379620060",
  appId: "1:93379620060:web:0417025bbbcfaa2be8d819",
  measurementId: "G-EJW31215XD",
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export default firebase;

