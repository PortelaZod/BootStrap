let imgs = document.querySelectorAll('.item-img')

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
    console.log(e.parentElement)
    })
)

console.log(document.querySelectorAll('.item-img'))