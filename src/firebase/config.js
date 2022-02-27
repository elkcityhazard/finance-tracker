import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAkjnpMrc3gRh74ekWBsomhshWyMSp80eY",
  authDomain: "finance-tracker-1cf89.firebaseapp.com",
  projectId: "finance-tracker-1cf89",
  storageBucket: "finance-tracker-1cf89.appspot.com",
  messagingSenderId: "8643240547",
  appId: "1:8643240547:web:a05e0e3a7cd581782f4e56",
  measurementId: "G-6VS7J4KY4V"
};

// init firebase

firebase.initializeApp(firebaseConfig)


// init service

const projectFirestore = firebase.firestore();

const projectAuth = firebase.auth();

//  Timestamp

const timestamp = firebase.firestore.Timestamp

export { projectFirestore, projectAuth, timestamp } 