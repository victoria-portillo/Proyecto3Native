import app from "firebase/app"
import firebase from  "firebase"


const firebaseConfig = {
  apiKey: "AIzaSyABEj_zpIEsR76QGmvFW_5Y4UIffCnjpbs",
  authDomain: "nativeproyecto-b6af3.firebaseapp.com",
  projectId: "nativeproyecto-b6af3",
  storageBucket: "nativeproyecto-b6af3.appspot.com",
  messagingSenderId: "143699526575",
  appId: "1:143699526575:web:a207aeed5b230c097b255a"
};


app.initializeApp(firebaseConfig);

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();