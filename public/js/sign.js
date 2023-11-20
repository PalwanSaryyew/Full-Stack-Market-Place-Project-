const loginWindow = document.getElementById("loginWindow");
const registerWindow = document.getElementById("registerWindow");
const isAdmin = document.getElementById("is_admin");
const isAdminInputs = document.querySelectorAll('.isAdminInputs')

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

registerWindow.addEventListener('submit', async e=>{
    e.preventDefault();

    const is_admin = registerWindow.is_admin.value
    const email = registerWindow.email.value
    const phone = registerWindow.phone.value
    const password = registerWindow.password.value
    const country = registerWindow.country.value
    const city = registerWindow.city.value
    const street = registerWindow.street.value
    const apartment = registerWindow.apartment.value
    const zip = registerWindow.zip.value
    const name = registerWindow.name.value

    try {
        fetch('http://localhost:3050/users', {
          method: 'POST',
          body: JSON.stringify({
            is_admin,
            email,
            phone,
            password,
            country,
            city,
            phone,
            street,
            apartment,
            zip,
            name
          }),
          headers: { "Content-Type": "application/json" }
        }).then(response=> response.json())
          .then(data=>{
            loginWindow.user.value=email
            loginWindow.password.value=password
            loginOrRegister()
          })
      } catch (error) {
        console.log(error);
      }
})

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
          
          const successMessageElement = document.createElement("div");
          successMessageElement.setAttribute("id", "loginsuccessmessage");
          successMessageElement.innerHTML = `<div class='text-white animate-newMessage shadow-2xl rounded-md max-h-0 max-w-0 p-0 mt-0 whitespace-nowrap overflow-hidden bg-green-500'>Login üstünlikli</div>`;
          messagesContainer.appendChild(successMessageElement);
          setTimeout(() => {
            const currentUrl = window.location.href;
            window.location.href = currentUrl;
          }, 3000);
        })
        .catch((error) => {
          const MessageElement = document.createElement("div");
          MessageElement.setAttribute("id", "loginerrormessage");
          MessageElement.innerHTML = `<div class='text-white animate-newMessage shadow-2xl rounded-md max-h-0 max-w-0 p-0 mt-0 whitespace-nowrap overflow-hidden bg-red-500'>${error}</div>`;
          messagesContainer.appendChild(MessageElement);
        });

})