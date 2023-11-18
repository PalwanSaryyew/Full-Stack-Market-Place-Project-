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