const registerForm = document.querySelector('#registerWindow')

registerForm.addEventListener('submit', async e=>{
    e.preventDefault();

    const is_admin = registerForm.is_admin.value
    const email = registerForm.email.value
    const phone = registerForm.phone.value
    const password = registerForm.password.value
    const country = registerForm.country.value
    const city = registerForm.city.value
    const street = registerForm.street.value
    const apartment = registerForm.apartment.value
    const zip = registerForm.zip.value
    const name = registerForm.name.value

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
            location.assign("http://localhost:3050/api/v1/orders/"+data.insertId)
          })
      } catch (error) {
        console.log(error);
      }
})