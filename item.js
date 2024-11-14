//obter grade do item selecionado pelo usuário
let tamanho_item = ''
let grade_item = (x) => {
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
        clone_btn.querySelector('.btn_grade').addEventListener('click', () => {
            grade_item(gtam[element])
        })
    }//seleção de tamanho do item

    //fechar modal de item
    let voltar_btn = document.querySelector('.voltar_btn').addEventListener('click', () => {
        location.reload()
    })//fechar modal de item

    //adicionar item na sacola e fechar modal
    let adicionar_item = document.querySelector('.adicionar_item').addEventListener('click', () => {
        let item = {
            nome: x.nome,
            preco: x.preco,
            img: x.img,
            qtd: 1,
        }

        if (gtam.length == 1) {
            item.grade = gtam[0]
            addSacola(item)
            location.reload()
        } else if (tamanho_item == "") {
            alert('Selecione um tamanho')
        } else {
            item.grade = tamanho_item;
            addSacola(item)
            location.reload()
        }

    })//adicionar item na sacola e fechar modal

}//abre modal que mostra os dados do item clicado


let item = JSON.parse(localStorage.item)
document.querySelector('.item_modal_img').src = item.img
document.querySelector('.item_modal_nome').innerHTML = item.nome
document.querySelector('.item_modal_preco').innerHTML = `R$ ${item.preco}`
let gtam = item.grade

//seleção de tamanho do item
for (const element in gtam) {
    let clone_btn = document.querySelector('.modelo_btn').cloneNode(true)
    document.querySelector('.item_modal_grade').append(clone_btn)
    clone_btn.querySelector('.btn_grade').value = gtam[element]
    clone_btn.querySelector('.btn_grade').addEventListener('click', () => {
        grade_item(gtam[element])
    })
}//seleção de tamanho do item

//fechar modal de item
let voltar_btn = document.querySelector('.voltar_btn').addEventListener('click', () => {
    history.back()
})//fechar modal de item