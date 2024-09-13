const removeBtn = document.querySelectorAll('.remove-btn')


removeBtn.forEach(e => {
    e.addEventListener('click',()=>{
        e.parentElement.parentElement.style.display='none'
        console.log( e.parentElement.parentElement)
    })
});