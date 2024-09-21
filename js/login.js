let btnLogin = document.querySelector('.login');
let email = document.querySelector('.email');
let password = document.querySelector('.password');
let err = document.querySelector('.err')

btnLogin.addEventListener('click', (e) => {
    let userList = JSON.parse(localStorage.getItem('user'))
    let client = userList.filter((ele) => { return ele.email == email.value && ele.password == password.value })
    if (client.length > 0) {
        err.classList.add('d-none')
        document.querySelector('form').action = '../home.html'
        localStorage.setItem('loginUser',JSON.stringify(client))
        
    } else {
        e.preventDefault()
        err.classList.remove('d-none')
    }
})