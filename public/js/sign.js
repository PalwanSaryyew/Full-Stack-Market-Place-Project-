const loginWindow = document.getElementById("loginWindow");
const registerWindow = document.getElementById("registerWindow");
const isAdmin = document.getElementById("is_admin");
const isAdminInputs = document.querySelectorAll('.isAdminInputs')
const signSection = document.querySelector('#signSection')


function loginOrRegister() {
  const transformLogin = loginWindow.style.transform.split(",")[0].split("(")[1].split(")")[0];
  const transformRegister = registerWindow.style.transform.split(",")[0].split("(")[1].split(")")[0];
  const degreeLogin = Number(transformLogin.substring(0, transformLogin.length - 3));
  const degreeRegister = Number(transformRegister.substring(0, transformRegister.length - 3));
  loginWindow.style.transform=`rotateY(${degreeLogin+180}deg`;
  registerWindow.style.transform=`rotateY(${degreeRegister+180}deg`;
}

isAdmin.addEventListener('change',()=>{
    isAdminInputs.forEach(input=>{
        input.classList.toggle('hidden')
    })
})

const signWindowClose = ()=>{
  signSection.classList.toggle('hidden')
  signSection.classList.toggle('grid')
}

let messageCount = 0;
// register process
registerWindow.addEventListener('submit', async e => {
  e.preventDefault();
  
  const phone_number = registerWindow.phone.value
  const password = registerWindow.password.value
  const username = registerWindow.name.value
  const validation_code = registerWindow.validation_code.value


  fetch('http://localhost:3050/users', {
    method: 'POST',
    body: JSON.stringify({
      phone_number,
      password,
      username,
      validation_code
    }),
    headers: { "Content-Type": "application/json" }
  })
    .then(response => response.json())
    .then(data => {
      if (data.message){
        const messageElement = document.createElement("div");
        messageElement.setAttribute('id', 'messageElemet'+messageCount)
        messageCount++
        messageElement.innerHTML=`<div id="newMessageElemet${messageCount}" class="messageElement ${data.success ? 'bg-green-500' : 'bg-red-500'}">${data.message}</div>`
        messagesContainer.appendChild(messageElement)
      }
      if (data.showCodeValidationInput) {
        showCodeValidationInput()
      } else if (data.success) { 
        loginWindow.user.value = username
        loginWindow.password.value = password
        loginOrRegister()
      }
      
    })
    .catch((error) => {
      console.log(error);
      const messageElement = document.createElement("div");
      messageElement.setAttribute('id', 'messageElemet' + messageCount)
      messageCount++
      messageElement.innerHTML = `<div id="newMessageElemet${messageCount}" class="messageElement bg-red-500">${error.message}</div>`
      messagesContainer.appendChild(messageElement)
    })
})

// login process
loginWindow.addEventListener('submit', async e=>{
  e.preventDefault();

  const user = loginWindow.user.value
  const password = loginWindow.password.value

  fetch("http://localhost:3050/users/login", {
    method: "POST",
    body: JSON.stringify({
      user,
      password,
    }),
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message) {
        const messageElement = document.createElement("div");
        messageElement.setAttribute('id', 'messageElemet'+messageCount)
        messageCount++
        messageElement.innerHTML=`<div id="newMessageElemet${messageCount}" class="${data.success ? 'bg-green-500' : 'bg-red-500'} messageElement">${data.message}</div>`
        messagesContainer.appendChild(messageElement)
      }
      if (data.success) {
        setTimeout(() => {
          const currentUrl = window.location.href;
          window.location.href = currentUrl;
        }, 3000);
      }


    })
    .catch((error) => {
      const messageElement = document.createElement("div");
      messageElement.setAttribute('id', 'messageElemet' + messageCount)
      messageCount++
      messageElement.innerHTML = `<div id="newMessageElemet${messageCount}" class="messageElement bg-red-500">${error.message}</div>`
      messagesContainer.appendChild(messageElement)
    });

})

function showCodeValidationInput(){
  document.getElementById('codeValidationInput').classList.remove('hidden')
}
