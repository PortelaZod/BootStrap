
window.onload = ()=>{
    document.querySelector('.card-oculto').style.display = 'none'
    document.querySelector('.area-sacola').style.display = 'unset'
} 

let itens = JSON.parse(localStorage.getItem('arrItens'))

if(itens == ''){
    document.querySelector('.areaValor').style.visibility ='hidden'
    document.querySelector('.vazio').style.display='flex'
    document.querySelector('.vazio p').innerHTML = 'Nenhum item adicionado'
    
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
    
    
}
