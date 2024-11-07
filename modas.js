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

let item_modal = (x) => {
    
    document.querySelector('.item_modal').style.left = '0'
    document.querySelector('.item_modal_img').src = x.img
    document.querySelector('.item_modal_nome').innerHTML = x.nome
    document.querySelector('.item_modal_preco').innerHTML = x.preco

    let gtam = x.grade
   
    // gtam.forEach((e) =>{
        
    //     let clone_btn = document.querySelector('.modelo_btn').cloneNode(true)
    //     document.querySelector('.item_modal_grade').append(clone_btn)
    //     clone_btn.querySelector('.btn_grade').value = e[0]
    //     console.log(e)
    // })

    for (const element in gtam) {
        console.log(`ola ${gtam[element]}`)
                let clone_btn = document.querySelector('.modelo_btn').cloneNode(true)
                document.querySelector('.item_modal_grade').append(clone_btn)
                clone_btn.querySelector('.btn_grade').value = gtam[element]
    }
}


const querySnapshot = await getDocs(collection(db, "NACIONAL"));
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


let toastFunction = () => {
    let toast = document.querySelector('.t-oast')
    toast.style.visibility = 'visible'

    setTimeout(() => {
        toast.style.visibility = 'hidden'
    }, 1500);
}

// const addSacolaBtn = document.querySelectorAll('.addBtn2')
// addSacolaBtn.forEach(e=>
//     e.addEventListener('click',()=>{
//         let a = e.parentElement.parentElement.parentElement
//         document.querySelector('.item_modal').style.left='0'
//         document.querySelector('.item_modal_img').src = a.querySelector('.item-img').src
//         document.querySelector('.item_modal_nome').innerHTML = a.querySelector('.item-nome').innerHTML
//         document.querySelector('.item_modal_preco').innerHTML = a.querySelector('.item-preco').innerHTML

//     })  
// )


// const addSacolaBtn = document.querySelectorAll('.addBtn2')

// for (let i = 0; i < addSacolaBtn.length; i++) {

//     const element = addSacolaBtn[i];
//     element.addEventListener('click', () => {
//         // const itemNome = element.parentElement.parentElement.querySelector('.item-nome').innerText
//         // const itemPreco = element.parentElement.parentElement.querySelector('.item-preco').innerText
//         // const itemImg = element.parentElement.parentElement.parentElement.querySelector('.item-img').src
//         // let qtd = 1

//         // let item = {
//         //     nome: itemNome,
//         //     preco: itemPreco,
//         //     img: itemImg,
//         //     qtd: qtd
//         // }

//         // toastFunction()
//         // addSacola(item)
//     })

// };


let sacola = []
const addSacola = (x) => {

    if (localStorage.arrItens) {
        sacola = JSON.parse(localStorage.getItem('arrItens'))
    }

    let novoItem = x
    sacola.push(novoItem)
    localStorage.arrItens = JSON.stringify(sacola)
    //função que adiciona os itens no localStorage para ser resgatados na página da Sacola.
}


// Efeito Modal nas Imagens
let imgs = document.querySelectorAll('.item-img')
imgs.forEach(e =>
    e.addEventListener('click', () => {
        // document.querySelector('.img_modal').style.right = '0'
        document.querySelector('.img_modal').style.scale = '1'
        document.querySelector('.img_zoom').src = e.src
    }))

let zoom = document.querySelectorAll('.zoom')
zoom.forEach(e =>
    e.addEventListener('click', () => {
        document.querySelector('.img_modal').style.scale = '1'
        document.querySelector('.img_zoom').src = e.parentElement.querySelector('.item-img').src
    }))

let x = document.querySelectorAll('.x')
x.forEach(e =>
    e.addEventListener('click', () => {
        document.querySelector('.img_modal').style.scale = '0'
    }))
// Efeito Modal nas Imagens
