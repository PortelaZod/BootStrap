
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js"
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


window.onload = ()=>{
    document.querySelector('.card-oculto').style.display = 'none'
    document.querySelector('.area-sacola').style.display = 'unset'
    document.querySelector('.areaValor').style.visibility ='visible'
} 

let itens = JSON.parse(localStorage.getItem('arrItens'))

if(itens == ''){
    document.querySelector('.vazio').style.display='flex'
    document.querySelector('.vazio p').innerHTML = 'Nenhum item adicionado'
    document.querySelector('.areaValor').style.visibility ='hidden'
    
}else{
    itens.forEach(e => {

        let itemCardSacola = document.querySelector('.item-card-sacola').cloneNode(true)
        const areaSacola = document.querySelector('.area-sacola').append(itemCardSacola)
        itemCardSacola.querySelector('.item-img-sacola').src = e.img
        itemCardSacola.querySelector('.item-nome-sacola').innerText = e.nome
        itemCardSacola.querySelector('.item-preco-sacola').innerHTML = e.preco
        itemCardSacola.querySelector('.item-qtd-sacola').value = e.qtd
    
        //atualizar valor de quantidade do item
        let qtdInput = itemCardSacola.querySelector('.item-qtd-sacola')
        qtdInput.addEventListener('blur', () => {
            e.qtd = qtdInput.value
            let arrFilter = itens.filter(item=> item != e)
            arrFilter.push(e)
            localStorage.arrItens = JSON.stringify(arrFilter)
            location.reload()
        })
        //atualizar valor de quantidade do item
    
    
        //remover item Sacola
        itemCardSacola.querySelector('.item-remover-sacola').addEventListener('click', () => {
            let arrFilter = itens.filter(item=> item != e)
            localStorage.arrItens = JSON.stringify(arrFilter)
            location.reload()
        })
        //remover item Sacola
    
        
    });
    
    
    
    //valor soma total dos Itens na Sacola
    let total = []
    let valores = JSON.parse(localStorage.getItem('arrItens'))
    valores.forEach(e => {
    
        total.push(e.preco.replace('R$','') *e.qtd);
        let somatotal = total.reduce((i, o) => i + o)
        let areaValorTotal = document.querySelector('.valor-total').innerHTML = `Total (${total.length} Itens) R$ ${somatotal.toFixed(2)}`;
    });
    //valor soma total dos Itens na Sacola
    

    let finalizar = document.querySelector('.enviarPedido').addEventListener('click',()=>{

        onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/auth.user
              const uid = user.uid;
              // ...
              const unsub = onSnapshot(doc(db, "users", user.uid), (doc) => {
                const data = doc.data()

                let InfoCliente = {
                    data: Date(),
                    nome: `${data.nome} ${data.sobrenome}`,
                    endereço: data.endereço,
                    bairro: data.bairro,
                    cep: data.cep,
                    email: data.email,
                    tel: data.tel
                }

                let pedido = itens

                let total = itens.map(i=> parseFloat(i.preco.replace('R$',''))*i.qtd*1)
                let total2 = total.reduce((i, e)=> i + e)
                let all = [InfoCliente,pedido,total2.toFixed(2)]
                console.log(all)
                localStorage.pedioall = JSON.stringify(all)
              });

            } else {
                let url = './login.html'
                window.location= url
            }
          });
    })
}

