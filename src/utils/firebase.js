import firebase from 'firebase/app'
//import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCbp6HaHLsaZDPZwAsd2Mo7Bzd46pRW8iw",
  authDomain: "fir-app-d3bfb.firebaseapp.com",
  projectId: "fir-app-d3bfb",
  storageBucket: "fir-app-d3bfb.appspot.com",
  messagingSenderId: "887728064424",
  appId: "1:887728064424:web:c33a549d1542f17c967f9d"
};

  export default firebase.initializeApp(firebaseConfig)