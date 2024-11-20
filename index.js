let main_cards = document.querySelectorAll('.main_card')

main_cards.forEach(e=>{
    e.addEventListener('touchstart',()=>{
        e.querySelector('.main_card_img').classList.add('scaleZ')
    })

    e.addEventListener('touchend',()=>{
        e.querySelector('.main_card_img').classList.remove('scaleZ')
    })
})

// zoom nas infos da pagina 
let entrega = document.querySelector('.entrega')
entrega.addEventListener('click',()=>{
    document.querySelector('.info-loja').classList.remove('info_zoom_out')
    document.querySelector('.info-loja').classList.add('info_zoom')
})

let fechar_zoom_info = document.querySelector('.fechar_zoom_info')
fechar_zoom_info.addEventListener('click',()=>{
    document.querySelector('.info-loja').classList.add('info_zoom_out')
    document.querySelector('.info-loja').classList.remove('info_zoom')
})

let troca = document.querySelector('.troca')
troca.addEventListener('click',()=>{
    document.querySelector('.info-loja_troca').classList.remove('info_zoom_out')
    document.querySelector('.info-loja_troca').classList.add('info_zoom')
})

let fechar_zoom_info_troca = document.querySelector('.fechar_zoom_info_troca')
fechar_zoom_info_troca.addEventListener('click',()=>{
    document.querySelector('.info-loja_troca').classList.add('info_zoom_out')
    document.querySelector('.info-loja_troca').classList.remove('info_zoom')
})// zoom nas infos da pagina 


