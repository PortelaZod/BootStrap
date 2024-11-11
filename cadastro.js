import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js"
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


//Forms de Criação de conta
const nomeCadasdro = document.querySelector('.nomeCadasdro')
const sobrenomeCadastro = document.querySelector('.sobrenomeCadastro')
const telCadastro = document.querySelector('.telCadastro')
const emailCadastro = document.querySelector('.emailCadastro')
const passwordCadastro = document.querySelector('.passwordCadastro')
const passwordCadastroRpt = document.querySelector('.passwordCadastroRpt')
const enderecoCadastro = document.querySelector('.enderecoCadastro')
const bairroCadastro = document.querySelector('.bairroCadastro')
const cepCadastro = document.querySelector('.cepCadastro')
const btnCadastro = document.querySelector('.btnCadastro')

const usuarioCriado = document.querySelector('.usuarioCriado')
const formulariosDeCriacao = document.querySelector('.formulariosDeCriacao')
//Forms de Criação de conta


//Criar Usuário
const createNewUser = () => {
  let nome = nomeCadasdro.value;
  let sobrenome = sobrenomeCadastro.value;
  let tel = telCadastro.value;
  let userEmail = emailCadastro.value;
  let userpassword = passwordCadastro.value;
  let endereco = enderecoCadastro.value;
  let bairro = bairroCadastro.value;
  let cep = cepCadastro.value;

  createUserWithEmailAndPassword(auth, userEmail, userpassword)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;

      //dados usuário

      setDoc(doc(db, "users", user.uid), {
        nome: nome,
        sobrenome: sobrenome,
        tel: tel,
        email: userEmail,
        endereço: endereco,
        bairro: bairro,
        cep: cep,
      });


      //pós Criado
      formulariosDeCriacao.style.display='none'
      usuarioCriado.style.display='flex'
      console.log('Usuário criado com sucesso.')
      //...
      // ...


    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage)
      // ..
    });
}
btnCadastro.addEventListener('click',(e)=>{
  e.preventDefault()
  let nome = nomeCadasdro.value;
  let sobrenome = sobrenomeCadastro.value;
  let tel = telCadastro.value;
  let userEmail = emailCadastro.value;
  let userpassword = passwordCadastro.value;
  let userpasswordRpt = passwordCadastroRpt.value;
  let endereco = enderecoCadastro.value;
  let bairro = bairroCadastro.value;
  let cep = cepCadastro.value;

  if(nome == ''){
    alert('Campo Obrigatório Nome Vazio');
  }else if(tel == ''){
    alert('Telefone Obrigatório para o cadastro')
  }  else if(tel.length <11){
    alert('Telefone Precisa do Cod de Area exemplo : 92')
  }else if(tel.length >11){
    alert('Telefone incorreto')
  }else if(userpassword !== userpasswordRpt){
    alert('As senhas digitadas não conferem')
  }else{
  createNewUser()
  }

})
//Criar Usuário

