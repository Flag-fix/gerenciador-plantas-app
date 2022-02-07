import firebase from 'firebase/app';
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAE7diYW9W-l5HLC65r0F5Cr2Ygnf1iHYE",
    authDomain: "gerenciador-plantas.firebaseapp.com",
    projectId: "gerenciador-plantas",
    storageBucket: "gerenciador-plantas.appspot.com",
    messagingSenderId: "779093632048",
    appId: "1:779093632048:web:19e9edbe49eff812ec39f5"
  };

  if(firebase.apps.length === 0){
      Firebase = firebase.initializeApp(firebaseConfig);
  }

  export default Firebase;
