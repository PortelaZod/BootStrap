let main_cards = document.querySelectorAll('.main_card')

main_cards.forEach(e=>{
    e.addEventListener('touchstart',()=>{
        e.querySelector('.main_card_img').classList.add('scaleZ')
    })

    e.addEventListener('touchend',()=>{
        e.querySelector('.main_card_img').classList.remove('scaleZ')
    })
})

