
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js"
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


window.onload = () => {
    document.querySelector('.card-oculto').style.display = 'none'
}

let itens = JSON.parse(localStorage.getItem('arrItens'))

if (itens == '') {
    document.querySelector('.vazio').style.display = 'flex'
    document.querySelector('.areaValor').style.visibility = 'hidden'

} else {

    document.querySelector('.vazio').style.display = 'none'
    document.querySelector('.areaValor').style.visibility = 'visible'
    document.querySelector('.area-sacola').style.display = 'unset'
    itens.forEach(e => {

        let itemCardSacola = document.querySelector('.item-card-sacola').cloneNode(true)
        const areaSacola = document.querySelector('.area-sacola').append(itemCardSacola)
        itemCardSacola.querySelector('.item-img-sacola').src = e.img
        itemCardSacola.querySelector('.item-nome-sacola').innerText = e.nome
        itemCardSacola.querySelector('.item-preco-sacola').innerHTML = `R$ ${e.preco}`
        itemCardSacola.querySelector('.item-qtd-sacola').value = e.qtd
        itemCardSacola.querySelector('.grade_item').innerHTML = `Tam: ${e.grade}`

        //atualizar valor de quantidade do item
        let qtdInput = itemCardSacola.querySelector('.item-qtd-sacola')
        qtdInput.addEventListener('blur', () => {
            e.qtd = qtdInput.value
            let arrFilter = itens.filter(item => item != e)
            arrFilter.push(e)
            localStorage.arrItens = JSON.stringify(arrFilter)
            location.reload()
        })//atualizar valor de quantidade do item

        //remover item Sacola
        itemCardSacola.querySelector('.item-remover-sacola').addEventListener('click', () => {
            let arrFilter = itens.filter(item => item != e)
            localStorage.arrItens = JSON.stringify(arrFilter)
            location.reload()
        })//remover item Sacola

    });



    //valor soma total dos Itens na Sacola
    let total = []
    let valores = JSON.parse(localStorage.getItem('arrItens'))
    valores.forEach(e => {

        total.push(e.preco.replace('R$', '') * e.qtd);
        let qtds = valores.map(x => x.qtd * 1)
        let total_quantidades = qtds.reduce((x, y) => x + y)
        let somatotal = total.reduce((i, o) => i + o)
        let areaValorTotal = document.querySelector('.valor-total').innerHTML = `Total (${total_quantidades} Itens) R$ ${somatotal.toFixed(2)}`;
    });//valor soma total dos Itens na Sacola



    let finalizar = document.querySelector('.enviarPedido').addEventListener('click', () => {

        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/auth.user
                const uid = user.uid;
                // ...
                const unsub = onSnapshot(doc(db, "users", user.uid), (doc) => {
                    const data = doc.data()
                    let info_data = new Date()

                    // Formatar a data para o fuso horário "America/Sao_Paulo"
                    let formato = new Intl.DateTimeFormat("pt-BR", {
                        timeZone: "America/Sao_Paulo",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        second: "numeric",
                        hour12: false  // para formato 24 horas
                    });

                    let InfoCliente = {
                        data : `${formato.format(info_data)} (Horário Padrão de Brasília)`,
                        nome: `${data.nome} ${data.sobrenome}`,
                        endereço: data.endereço,
                        bairro: data.bairro,
                        cep: data.cep,
                        email: data.email,
                        tel: data.tel,
                    }

                    let pedido = itens
                    let numeroPedido = `${Math.floor(Math.random() * 9999) + 1000}`

                    let total = itens.map(i => parseFloat(i.preco.replace('R$', '')) * i.qtd * 1)
                    let somaTotal = total.reduce((i, e) => i + e)
                    let all = [InfoCliente, pedido, somaTotal.toFixed(2), numeroPedido]

                    // whats
                    const numero = '5592982134524'; // Insira o número do destinatário com o código do país
                    let mensagem = `Olá meu nome é ${InfoCliente.nome} e gostaria de confirmar meu pedido ${numeroPedido}.`; // Mensagem a ser enviada
                    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
                    window.open(url, '_blank');
                    //whats

                    enviarPedido(all)

                });

            } else {
                let url = './login.html'
                window.location = url
            }
        });
    })
}

let enviarPedido = async (e) => {

    await setDoc(doc(db, "PEDIDOS", e[3]), {
        pedido: e[3],
        valor: e[2],
        nome: e[0].nome,
        tel: e[0].tel,
        endereco: `${e[0].endereço}, ${e[0].bairro}, ${e[0].cep}`,
        email: e[0].email,
        data: e[0].data,
        itens: e[1],
        qtd: e[1].length
    });
}
