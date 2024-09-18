import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getFirestore, doc, setDoc, onSnapshot, collection, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js"

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


const querySnapshot = await getDocs(collection(db, "GrifeChic"));
querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
    const item = doc.data()
    const itemPlaceholder = document.querySelector('.itemPlaceholder').cloneNode(true)
    const itemArea = document.querySelector('.itens-area').append(itemPlaceholder)
    itemPlaceholder.querySelector('.item-img').src = item.src
    itemPlaceholder.querySelector('.item-nome').innerHTML = item.nome
    itemPlaceholder.querySelector('.item-preco').innerHTML = `R$ ${item.preco}`



});


const addSacolaBtn = document.querySelectorAll('.addBtn2')

for (let i = 0; i < addSacolaBtn.length; i++) {

    const element = addSacolaBtn[i];
    element.addEventListener('click',()=>{
        const itemNome = element.parentElement.parentElement.querySelector('.item-nome').innerText
        const itemPreco = element.parentElement.parentElement.querySelector('.item-preco').innerText
        const itemImg = element.parentElement.parentElement.querySelector('.item-img').src
        const docRef = addDoc(collection(db, "sacola"), {
          nome: itemNome,
          preco: itemPreco,
          img: itemImg
        });
        alert('Adicionado')
    })
    
}