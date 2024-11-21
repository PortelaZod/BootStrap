import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js"
import { getFirestore, doc, setDoc, onSnapshot,collection,getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js"

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


const loginBtn = document.querySelector('.loginBtn-index')
const loginBtn2 = document.querySelector('.login_desktop')
const logOutBtn = document.querySelector('.logOutBtn')
const logOutBtn2 = document.querySelector('.logout_desktop')
const usuarioLogado = document.querySelector('.usuario-logado')
const perfilCliente = document.querySelector('.perfil-cliente')


//Enquanto Logado
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    loginBtn.style.display='none'
    loginBtn2.style.display='none'

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
    logOutBtn2.style.display='none'

  }

});
//Enquanto Logado

// LogOut
logOutBtn.addEventListener('click', () => {
  signOut(auth)
  location.reload()
})// LogOut

logOutBtn2.addEventListener('click', () => {
  signOut(auth)
  location.reload()
})// LogOut



let icone_sacola =  document.querySelector('.icone-sacola')
if(localStorage.arrItens == '[]'){
  icone_sacola.style.display='none'
}else if(localStorage.arrItens){
  icone_sacola.style.display='flex'
}else{
  icone_sacola.style.display='none'
}

// const NACIONAL = await getDocs(collection(db,'BERMUDAS_E_SHORTS'));
// NACIONAL.forEach(  doc => {
  
//   let itens = doc.data();

//   add_db(itens)
//   console.log(itens)

// });
// function add_db(x){

//   setDoc(doc(db, "grife_chic", x.cod), {
//     name: x.nome,
//     cod:x.cod,
//     grade:x.grade,
//     img:x.img,
//     preco:x.preco,
//     colecao:x.colecao,
//     quantidade:1,
//     plus: false
//   });
// }

