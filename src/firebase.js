import firebase from 'firebase'

  var config = {
    apiKey: "AIzaSyD6oBMfYGakXgKC96FNqWvwB-lgvF_Hq8w",
    authDomain: "formfirebase-87a98.firebaseapp.com",
    databaseURL: "https://formfirebase-87a98.firebaseio.com",
    projectId: "formfirebase-87a98",
    storageBucket: "formfirebase-87a98.appspot.com",
    messagingSenderId: "1050066394631",
    appId: "1:1050066394631:web:c5df36d0250b71ea4594a2"
  };
  firebase.initializeApp(config);
  
  export default firebase;