import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js"
import { getFirestore, doc, setDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js"

const firebaseConfig = {
  apiKey: "AIzaSyA5OgFn-7QRpthDJcz32GmHcBOLDDqtx6Y",
  authDomain: "teste-com-firebase-c28bd.firebaseapp.com",
  projectId: "teste-com-firebase-c28bd",
  storageBucket: "teste-com-firebase-c28bd.appspot.com",
  messagingSenderId: "379473818522",
  appId: "1:379473818522:web:18a3c607f112447dc08023"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

//Login forms
const loginEmail = document.querySelector('.loginEmail')
const loginPassword = document.querySelector('.loginPassword')
const loginBtn = document.querySelector('#loginBtn')


//logIn
const login = () => {
    let email = loginEmail.value;
    let password = loginPassword.value;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // history.back()
        location = './index.html'
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage)
      });
  }
  
  loginBtn.addEventListener('click',login)
  //logIn