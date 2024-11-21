import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getFirestore, collection, getDocs,query,where } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js"

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
const q = query(collection(db, "grife_chic"), where("colecao", "==", 'IMPORTADAS_40.01'));
const querySnapshot = await getDocs(q);
// const querySnapshot = await getDocs(collection(db, "grife_chic"));
querySnapshot.forEach((doc) => {
    const item = doc.data()
    const itemPlaceholder = document.querySelector('.itemPlaceholder').cloneNode(true)
    const itemArea = document.querySelector('.itens-area').append(itemPlaceholder)
    itemPlaceholder.querySelector('.item-img').src = item.img
    itemPlaceholder.querySelector('.item-nome').innerHTML = item.name
    itemPlaceholder.querySelector('.item-preco').innerHTML = `R$ ${item.preco}`
    // itemPlaceholder.querySelector('.cod_item').innerHTML = `#${item.cod}`
    let grade = `${item.grade}`
    itemPlaceholder.querySelector('.tamanho_item').innerHTML = grade.replaceAll(',', ' | ')

    //adiciona o item no localStorage pra ser resgatado na aba sacola 
    itemPlaceholder.querySelector('.addBtn2').addEventListener('click',()=>{
        localStorage.item = JSON.stringify(item)
        location.href = './item.html'
    })//adiciona o item no localStorage pra ser resgatado na aba sacola
});

// Efeito Modal nas Imagens
let imgs = document.querySelectorAll('.item-img')
imgs.forEach(e =>
    e.addEventListener('click', () => {
        // document.querySelector('.img_modal').style.right = '0'
        document.querySelector('.img_modal').style.scale = '1'
        document.querySelector('.img_zoom').src = e.src
    }))// Efeito Modal nas Imagens

//card que se oculta a ser carregado o item
imgs.forEach(e=>
    e.addEventListener('load',()=>{
    e.parentElement.querySelector('.placeholder_oculto').style.display='none'
    e.parentElement.querySelector('.pos_carregado').style.display='flex'
    e.parentElement.querySelector('.nome_placeholder_oculto').style.display='none'
    e.parentElement.querySelector('.nome_pos_carregado').style.display='flex'
    e.parentElement.querySelector('.preco_placeholder_oculto').style.display='none'
    e.parentElement.querySelector('.preco_pos_carregado').style.display='flex'
    e.parentElement.querySelector('.tam_placeholder_oculto').style.display='none'
    e.parentElement.querySelector('.tam_pos_carregado').style.display='flex'
    e.parentElement.querySelector('.container_pos_carregado').style.display='flex'
    })
)//card que se oculta a ser carregado o item

//zoom na img do item
let zoom = document.querySelectorAll('.zoom')
zoom.forEach(e =>
    e.addEventListener('click', () => {
        document.querySelector('.img_modal').style.scale = '1'
        document.querySelector('.img_zoom').src = e.parentElement.querySelector('.item-img').src
    }))//zoom na img do item

// fechar zoom Modal nas Imagens
let x = document.querySelectorAll('.x')
x.forEach(e =>
    e.addEventListener('click', () => {
        document.querySelector('.img_modal').style.scale = '0'
    }))// fechar zoom Modal nas Imagens
// Efeito Modal nas Imagens

document.addEventListener('DOMContentLoaded',()=>{
    setTimeout(() => {
        document.querySelector('.carregando').style.display='none'
    }, 1000);
    
})