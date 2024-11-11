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

let area_pedidos = document.querySelector('.area_pedidos')
const querySnapshot = await getDocs(collection(db, "PEDIDOS"));
querySnapshot.forEach(async (doc) => {
    const data = doc.data()
    let itens = data.itens
    let card_pedido = document.querySelector('.pedido').cloneNode(true)
    area_pedidos.append(card_pedido)
    card_pedido.querySelector('.num-pedido').innerHTML = `Pedido: #${data.pedido}`
    card_pedido.querySelector('.data_pedido').innerHTML = `Data: ${data.data}`
    card_pedido.querySelector('.nome-cliente').innerHTML = `Nome do cliente: ${data.nome}`
    card_pedido.querySelector('.tel-cliente').innerHTML = `Whats: ${data.tel}`
    card_pedido.querySelector('.endereco').innerHTML = `Endereço: ${data.endereco}`
    card_pedido.querySelector('.valor-pedido').innerHTML = `Total do Pedido: R$ ${data.valor}`
    
    //funções para finalizar ou cancelar pedidos
    card_pedido.querySelector('.finalizar').addEventListener('click',()=>{
        alert(`pedido ${data.pedido} Finalizado`)
    })
    card_pedido.querySelector('.cancelar').addEventListener('click',()=>{
        alert(`pedido ${data.pedido} Cancelado`)

    })//funções para finalizar ou cancelar pedidos


    let qtds = data.itens.map(e=> e.qtd*1)
    let qtds_somadas = qtds.reduce((x,y)=> x+y)
        card_pedido.querySelector('.qtd_itens').innerHTML = `Quantidade de Items: ${qtds_somadas}`
    
    itens.forEach(element => {
        let {nome,preco,qtd,grade,img} = element
        let itens_arr = `${nome} | Valor Unitário: R$ ${preco} | Unidades: ${qtd} | Tamanho: ${grade}`
        let area_itens_pedido_modelo = document.querySelector('.area_itens_pedido_modelo').cloneNode(true)
        card_pedido.querySelector('.item').append(area_itens_pedido_modelo)
        area_itens_pedido_modelo.innerHTML = itens_arr
        area_itens_pedido_modelo.addEventListener('click',()=>{
            document.querySelector('.item_img').src = img
        })
    });

    card_pedido.querySelector('.whats').addEventListener('click',()=>{
        var telefone = `55${data.tel}`;
        var mensagem = '';
        var url = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;
        window.open(url, '_blank');
    })
    
});