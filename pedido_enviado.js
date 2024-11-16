let dados_pedido = JSON.parse(localStorage.npedido)
document.querySelector('.n_pedido').innerHTML = ` Pedido ${dados_pedido[0]} enviado`

function to_whats() {
    const numero = '5592982134524'; // Insira o número do destinatário com o código do país
    let mensagem = `Olá meu nome é ${dados_pedido[1]} e gostaria de confirmar meu pedido ${dados_pedido[0]}.`; // Mensagem a ser enviada
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
    location = url
}
let page = document.querySelector('.enviado')
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      to_whats()
    }, 2000);
})
