//distribuir as propriedades do objeto pela pagina 
let item = JSON.parse(localStorage.item);
document.querySelector('.item_modal_img').src = item.img;
document.querySelector('.item_modal_nome').innerHTML = item.nome;
document.querySelector('.item_modal_preco').innerHTML = `R$ ${item.preco}`;
let gtam = item.grade;//distribuir as propriedades do objeto pela pagina 

//obter grade do item selecionado pelo usuário
let tamanho_item = ''
let grade_item = (x) => {
    tamanho_item = x
}//obter grade do item selecionado pelo usuário

//seleção de tamanho do item
for (const element in gtam) {
    let btn = document.createElement('button')
    btn.innerHTML = gtam[element]
    document.querySelector('.item_modal_grade').append(btn)
    btn.className += 'btn_grade btn btn-dark mx-1 fw-medium'
    
    btn.addEventListener('click', () => {
        grade_item(gtam[element])
        btn_padrão()
        btn.classList.remove('btn-dark')
        btn.classList.add('border-dark')
    })
}
function btn_padrão(){
    let btns = document.querySelectorAll('.btn_grade')
    btns.forEach(e=>{
        e.classList.add('btn-dark')
    } )
}//seleção de tamanho do item

//fechar modal de item
let voltar_btn = document.querySelector('.voltar_btn').addEventListener('click', () => {
    history.back()
})//fechar modal de item

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
 
//adicionar item na sacola e fechar modal
let adicionar_item = document.querySelector('.adicionar_item').addEventListener('click', () => {
    let obj = {
        nome: item.nome,
        preco: item.preco,
        img: item.img,
        qtd: 1,
    }

    if (gtam.length == 1) {
        obj.grade = gtam[0]
        addSacola(obj)
        history.back()
    } else if (tamanho_item == "") {
        alert('Selecione um tamanho')
    } else {
        obj.grade = tamanho_item;
        addSacola(obj)
        console.log(obj)
        history.back()
    }
})//adicionar item na sacola e fechar modal


