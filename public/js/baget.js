
const bagetButton = document.getElementById("bagetButton"); // sebet dugmesi
const baget = document.getElementById("baget"); // sebet konteyniri
const bagetContainer = document.getElementById("bagetContainer"); // sebet konteyniri
const bagetSectionEmtyZone = document.getElementById("bagetSectionEmtyZone"); // sebet Section
const bagetSection = document.getElementById("bagetSection"); // sebet Section
const addToCartButtons = document.querySelectorAll(".btn-add-to-cart"); // sebede gosmak dugmeleri
const messagesContainer = document.getElementById('messagesContainer'); // bildirisler konteyneri
const totalPriceElement = document.getElementById('totalPrice');
const checkoutForm = document.getElementById('checkoutForm')
const checkoutButton = document.getElementById('checkoutButton')
const checkoutWindow = document.getElementById('checkoutWindow')
const checkoutWindowEmtyZone = document.getElementById('checkoutWindowEmtyZone')

checkoutButton.addEventListener("click", () => { // sebedi acmak yapmak
  checkoutWindow.classList.toggle("active");
  bagetContainer.classList.toggle("active");
  bagetSection.classList.toggle("active");
});

checkoutWindowEmtyZone.addEventListener('click',()=>{
  checkoutWindow.classList.toggle("active");
})

bagetButton.addEventListener("click", () => { // sebedi acmak yapmak
  bagetContainer.classList.toggle("active");
  bagetSection.classList.toggle("active");
});

bagetSectionEmtyZone.addEventListener('click', ()=>{
  bagetContainer.classList.toggle("active");
  bagetSection.classList.toggle("active");
})



function updateBaget(cart) { // hazirki sebedi beryar yada tazelap tazesini beryar
  if (cart === null || cart === undefined) {
    cart = JSON.parse(localStorage.getItem("baget")) ? JSON.parse(localStorage.getItem("baget")) :[];
  }
  localStorage.setItem("baget", JSON.stringify(cart));
  let newCart = JSON.parse(localStorage.getItem("baget"));
  return newCart;
}

function toBagetButtons() {
  let count = 0
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", async (event) => { // sebede gos dugmelerime basylanda
      let cart = await updateBaget()
      const targetElement = event.target;
      let id = targetElement.dataset.id;
      const inCart = cart.some((item) => item.product === id);
      if (inCart) { // eger haryt onden gosulan bolsa
        let successMessageElement = document.createElement('div')
        successMessageElement.setAttribute("id", count);
        successMessageElement.style.animation
        successMessageElement.innerHTML=`<div id='newMessage_${count}' class='text-white animate-newMessage shadow-2xl rounded-md max-h-0 max-w-0 p-0 mt-0 whitespace-nowrap overflow-hidden bg-red-500'>Bu Haryt Öň Hem Sebetde</div>`
        count++
        messagesContainer.appendChild(successMessageElement)
      } else { // on gosulmadyk bolsa
        cart.push({
          product: targetElement.dataset.id,
          name: targetElement.dataset.name,
          price: targetElement.dataset.price,
          image: targetElement.dataset.image,
          quantity: 1
        });
        let errorMessageElement = document.createElement('div')
        errorMessageElement.setAttribute("id", count);
        errorMessageElement.innerHTML=`<div id='newMessage_${count}' class='text-white animate-newMessage shadow-2xl rounded-md max-h-0 max-w-0 p-0 mt-0 whitespace-nowrap overflow-hidden bg-green-500'>Haryt sebede Goşuldy</div>`
        count++
        messagesContainer.appendChild(errorMessageElement)
        let newCart = await updateBaget(cart);
        buggetAppend(newCart);
      }
    });
  });
}

function buggetAppend(cart) {
  const totalPrice = inCartTotal()
  baget.innerHTML = "";
  cart.forEach((productInCart) => {
    const itemInCart = document.createElement("div");
    itemInCart.innerHTML = `
            <!-- product box -->
            <div class="shadow-2xl grid grid-cols-2 w-full h-24 bg-white rounded-lg overflow-hidden">
              <!-- col-1 -->
              <div class="grid grid-cols-2 justify-self-start">       
                <!-- product image -->
                <div class="h-24">
                    <img class="h-full w-auto" src="${productInCart.image}" alt="">
                </div>

                <div class="grid content-evenly">
                    <!-- product name -->
                    <div class="text-sm">
                        ${productInCart.name}
                    </div>
                    <!-- product price -->
                    <div>
                        <span class="text-red-500 font-black">${productInCart.price}</span><span class="">TMT</span>
                    </div>
                </div>
              </div>
              <!-- col-2 -->
              <div class="grid grid-cols-2 gap-x-2 justify-self-end">
                <!-- quantity -->
                <div class="self-center grid">
                    <span data-id="${productInCart.product}" class="quantity-increase-button select-none cursor-pointer bg-slate-300 h-8 w-8 rounded-full grid place-items-center font-bold">+</span>
                    <input data-id="${productInCart.product}" type="number" value="${productInCart.quantity}" min="1" id="quantity-input-${productInCart.product}" class="quantity-input w-8 text-center focus:outline-none focus:ring rounded-sm">
                    <span data-id="${productInCart.product}" class="quantity-reduction-button select-none cursor-pointer bg-slate-300 h-8 w-8 rounded-full grid place-items-center font-bold">-</span>
                </div>    
                <!-- trash box -->
                <button data-id="${productInCart.product}" class="baget-to-trash w-5 bg-gary-500">
                <img  src="/trash.svg" class="w-full" alt="">
                </button>  
              </div>  
            </div>
        `;
    baget.appendChild(itemInCart); // sebede haryt gosyar
  });

  const bagetToTrashButton = document.querySelectorAll(".baget-to-trash");
  bagetToTrashButton.forEach((button) => {
    button.addEventListener("click", async (event) => { // harydyn pozmak dugmesine basanda
      cart.splice(event.target.dataset.id, 1); // sebetden bellenen harydy ayyryar
      const newCart = await updateBaget(cart);
      buggetAppend(newCart);
    });
  });

  const quantityIncreaseButtons = document.querySelectorAll('.quantity-increase-button')
  quantityIncreaseButtons.forEach(button=>{
    button.addEventListener('click',event=>{
      const id = event.target.dataset.id
      let value = document.getElementById(`quantity-input-${id}`).value++
      const product = cart.find((item) => item.product === id);
      product.quantity = value+1;
      updateBaget(cart)
      inCartTotal()
    })
  })

  const quantityReductionButtons = document.querySelectorAll('.quantity-reduction-button')
  quantityReductionButtons.forEach(button=>{
    button.addEventListener('click', async event=>{
      const id = event.target.dataset.id
      let quantity = document.getElementById(`quantity-input-${id}`)
      if(quantity.value<2){
        quantity.value = 1
      } else {
        quantity.value--
      }
      const product = cart.find((item) => item.product === id);
      product.quantity = quantity.value;  
      updateBaget(cart)
      inCartTotal()
    })
  })

  const quantityInput = document.querySelectorAll('.quantity-input')
  quantityInput.forEach(input=>{
    input.addEventListener('input', (event)=>{
      const id = event.target.dataset.id
      let value =  event.target.value
      value < 1 ? value=1 : value=value
      const product = cart.find((item) => item.product === id);
      product.quantity = value;
      updateBaget(cart)
      inCartTotal()
    })
  })

}

function inCartTotal() {
  const cart = updateBaget()
  const totalPrice = cart.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);
  totalPriceElement.innerText = 'Jemi Baha: ' + totalPrice;
}

checkoutForm.addEventListener('submit', async e=>{
  e.preventDefault();

  const country = checkoutForm.country.value
  const shipping_address1 = checkoutForm.shipping_address1.value
  const shipping_address2 = checkoutForm.shipping_address2.value
  const city = checkoutForm.city.value
  const zip = checkoutForm.zip.value                           
  const phone = checkoutForm.phone.value                    
  const user = checkoutForm.user.value    
  const cart = await updateBaget()
  
  try {
    fetch('http://localhost:3050/api/v1/orders', {
      method: 'POST',
      body: JSON.stringify({
        order_items:cart,
        country,
        shipping_address1,
        shipping_address2,
        city,
        zip,
        phone,
        user
      }),
      headers: { "Content-Type": "application/json" }
    }).then(response=> response.json())
      .then(data=>{
        location.assign("http://localhost:3050/api/v1/orders/"+data.insertId)
      })
  } catch (error) {
    console.log(error);
  }
})


document.addEventListener("DOMContentLoaded", async () => { // sahypa doly yuklenenden son 
  const cart = await updateBaget() // hazirki sebedi al
  toBagetButtons(); // sebede gosmak dugmelerinin yerine yetirmeli isleri
  buggetAppend(cart); // sebedi doret
  inCartTotal()
});
