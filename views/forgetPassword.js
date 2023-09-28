document.getElementById('submit').addEventListener("click", passwordForget)

async function passwordForget(event) {
    event.preventDefault()
    const email = document.getElementById('email').value;
    console.log(email)

    const obj = {
        email: email
    }

    const res = await axios.post("http://localhost:4000/password/forgotpassword", obj)
   
    console.log(res)
    alert('PassWord resent link sent on registered Email')
    window.location.href = "login.html"

}
