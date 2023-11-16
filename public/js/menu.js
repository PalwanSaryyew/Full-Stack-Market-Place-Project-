const menuButton = document.getElementById('menuButton')
const asideSection = document.getElementById('asideSection')
const nav = document.querySelector('aside')

menuButton.addEventListener('click', ()=>{
    nav.classList.toggle('active')
    asideSection.classList.toggle('active')
})
asideSection.addEventListener('click',()=>{
    nav.classList.toggle('active')
    asideSection.classList.toggle('active')
})