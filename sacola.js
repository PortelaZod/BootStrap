import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getFirestore, doc,collection, getDocs,deleteDoc,addDoc } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js"

const firebaseConfig = {
    apiKey: "AIzaSyA5OgFn-7QRpthDJcz32GmHcBOLDDqtx6Y",
    authDomain: "teste-com-firebase-c28bd.firebaseapp.com",
    projectId: "teste-com-firebase-c28bd",
    storageBucket: "teste-com-firebase-c28bd.appspot.com",
    messagingSenderId: "379473818522",
    appId: "1:379473818522:web:18a3c607f112447dc08023"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);




// const removerItem = (e) => {
//     await deleteDoc(doc(db, "sacola", ''));
// }


const querySnapshot = await getDocs(collection(db, "sacola"));
querySnapshot.forEach((doc) => {
    const item = doc.data()
    const tabelasacola = document.querySelector('.tabela-sacola').cloneNode(true)
    const areaSacola = document.querySelector('.area-sacola').appendChild(tabelasacola)
    tabelasacola.querySelector('.item-sacola-img').src = item.img
    tabelasacola.querySelector('.item-sacola-preco').innerHTML = item.preco
});
