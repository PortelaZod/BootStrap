window.addEventListener('load', () => {
    document.querySelector('.card-oculto').style.display = 'none'
    document.querySelector('.itens-area').style.display = 'grid'
})

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js"

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

//obter grade do item selecionado pelo usuário
let tamanho_item = ''
let grade_item = (x)=>{
    tamanho_item = x
}
//obter grade do item selecionado pelo usuário

//abre modal que mostra os dados do item clicado
let item_modal = (x) => {
    document.querySelector('.item_modal').style.left = '0'
    document.querySelector('.item_modal_img').src = x.img
    document.querySelector('.item_modal_nome').innerHTML = x.nome
    document.querySelector('.item_modal_preco').innerHTML = `R$ ${x.preco}`
    let gtam = x.grade

    //seleção de tamanho do item
    for (const element in gtam) {
                let clone_btn = document.querySelector('.modelo_btn').cloneNode(true)
                document.querySelector('.item_modal_grade').append(clone_btn)
                clone_btn.querySelector('.btn_grade').value = gtam[element]
                clone_btn.querySelector('.btn_grade').addEventListener('click',()=>{
                    grade_item(gtam[element])
                })
    }//seleção de tamanho do item

    //fechar modal de item
    let voltar_btn = document.querySelector('.voltar_btn').addEventListener('click',()=>{
        location.reload()
    })//fechar modal de item

    //adicionar item na sacola e fechar modal
    let adicionar_item = document.querySelector('.adicionar_item').addEventListener('click',()=>{
                let item = {
                    nome: x.nome,
                    preco: x.preco,
                    img: x.img,
                    qtd: 1,
                }

                if(gtam.length == 1){
                    item.grade = gtam[0]
                    addSacola(item)
                    location.reload()
                }else if(tamanho_item == ""){
                    alert('Selecione um tamanho')
                }else{
                    item.grade = tamanho_item;
                    addSacola(item)
                    location.reload()
                }

    })//adicionar item na sacola e fechar modal

}//abre modal que mostra os dados do item clicado


 //função que adiciona os itens no localStorage para ser resgatados na página da Sacola.
let sacola = []
const addSacola = (x) => {

    if (localStorage.arrItens) {
        sacola = JSON.parse(localStorage.getItem('arrItens'))
    }

    let novoItem = x
    sacola.push(novoItem)
    localStorage.arrItens = JSON.stringify(sacola)
} //função que adiciona os itens no localStorage para ser resgatados na página da Sacola.

const querySnapshot = await getDocs(collection(db, "IMPORTADAS_PERUANAS"));
querySnapshot.forEach((doc) => {
    const item = doc.data()
    const itemPlaceholder = document.querySelector('.itemPlaceholder').cloneNode(true)
    const itemArea = document.querySelector('.itens-area').append(itemPlaceholder)
    itemPlaceholder.querySelector('.item-img').src = item.img
    itemPlaceholder.querySelector('.item-nome').innerHTML = item.nome
    itemPlaceholder.querySelector('.item-preco').innerHTML = `R$ ${item.preco}`
    // itemPlaceholder.querySelector('.cod_item').innerHTML = `#${item.cod}`
    let grade = `${item.grade}`
    itemPlaceholder.querySelector('.tamanho_item').innerHTML = grade.replaceAll(',', ' | ')

    itemPlaceholder.querySelector('.addBtn2').addEventListener('click',()=>{
        item_modal(item)
    })
});

// Efeito Modal nas Imagens
let imgs = document.querySelectorAll('.item-img')
imgs.forEach(e =>
    e.addEventListener('click', () => {
        // document.querySelector('.img_modal').style.right = '0'
        document.querySelector('.img_modal').style.scale = '1'
        document.querySelector('.img_zoom').src = e.src
    }))// Efeito Modal nas Imagens

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


