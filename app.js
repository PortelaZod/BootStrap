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
const db = getFirestore(app);

// //Creation Forms
// const creationEmail = document.querySelector('#creationEmail')
// const creationName = document.querySelector('#creationName')
// const creationTel = document.querySelector('#creationTel')
// const creationPassword = document.querySelector('#creationPassword')
// const creationBtn = document.querySelector('#creationBtn')

// //Login forms
// const loginEmail = document.querySelector('.loginEmail')
// const loginPassword = document.querySelector('.loginPassword')
// const loginBtn = document.querySelector('.loginBtn')

// //logout btn
// const logoutBtn = document.querySelector('#logoutBtn')

// //user Info
// const userName = document.querySelector('.userName')
// const userTel = document.querySelector('.userTel')
// const userEmail = document.querySelector('.userEmail')

//--------------------------------------------------------------------------------


const loginBtn = document.querySelector('.loginBtn-index')
const logOutBtn = document.querySelector('.logOutBtn')
const usuarioLogado = document.querySelector('.usuario-logado')
const perfilCliente = document.querySelector('.perfil-cliente')


//Enquanto Logado
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    loginBtn.style.display='none'

    // userinfo(user.uid)
    const unsub = onSnapshot(doc(db, "users", user.uid), (doc) => {
      const data = doc.data()
      usuarioLogado.innerHTML=`Olá ${data.nome}`
      perfilCliente.innerHTML=data.nome +' '+ data.sobrenome
    });
    // ...
  } else {
    // User is signed out
    // ...
    
    logOutBtn.style.display='none'

  }

});
//Enquanto Logado

// LogOut
logOutBtn.addEventListener('click', () => {
  signOut(auth)
  location.reload()
})
