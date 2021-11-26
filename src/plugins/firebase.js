import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDW6pl_XR4P7yFeYx8omHSqiQNDMTwU-qM",
    authDomain: "todo-list-vue-2989f.firebaseapp.com",
    projectId: "todo-list-vue-2989f",
    storageBucket: "todo-list-vue-2989f.appspot.com",
    messagingSenderId: "1038814713425",
    appId: "1:1038814713425:web:5920f02c15694455b80a70"
  };

  firebase.initializeApp(firebaseConfig)

  const db = firebase.firestore()
  const auth = firebase.auth()
  const googleProvider =  new firebase.auth.GoogleAuthProvider()

  const profileCollection = db.collection('profile')
  const tasksCollection = db.collection('tasks')

  export {
      db, auth, profileCollection, tasksCollection, googleProvider
  }