import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js"
import { getFirestore, collection, getDocs,setDoc,doc,onSnapshot} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js"

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

let codbar = document.querySelector('#barcod')
let nome = document.querySelector('#nome')
let grade = document.querySelector('#grade')
let preco = document.querySelector('#preco')
let quantidade = document.querySelector('#quantidade')
let img = document.querySelector('#img')
let colecao = document.querySelector('#colecao')
let btn = document.querySelector('#btn')


onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
  
      btn.addEventListener('click',async ()=>{
        let obj = { 
            cod: codbar.value,
            nome: nome.value,
            grade: grade.value,
            preco: preco.value,
            quantidade: quantidade.value,
            img: img.value,
            colecao: colecao.value
        }

    
       await setDoc(doc(db, obj.colecao, obj.cod), {
            cod: codbar.value,
            nome: nome.value,
            grade: grade.value,
            preco: preco.value,
            quantidade: quantidade.value,
            img: img.value,
            colecao: colecao.value
          });
        
          alert(`Item ${obj.nome} Adicionado na Coleção ${obj.colecao}`)
          location.reload()
    })
    
      // userinfo(user.uid)
      const unsub = onSnapshot(doc(db, "users", user.uid), (doc) => {
        const data = doc.data()

        
      });
      // ...
    } else {
      // User is signed out
      // ...
    }
  
  });








