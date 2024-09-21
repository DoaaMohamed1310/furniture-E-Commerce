let btnRegister = document.querySelector('.register');
let userName = document.querySelector('.user');
let email = document.querySelector('.email');
let phone = document.querySelector('.phone');
let password = document.querySelector('.password');
let conPassword = document.querySelector('.conPassword');
let errUser = document.querySelector('.erruser')
let errEmail=document.querySelector('.errEmail')
let errPhone = document.querySelector('.errPhone')
let errPassword = document.querySelector('.errPassword')
let errConPass=document.querySelector('.errConPass')
let usersList = [];
if (localStorage.getItem('user') != null) {
    usersList=JSON.parse(window.localStorage.getItem('user'))
}

// valid username
userName.addEventListener('blur', () => {
    let regx = /^[0-9a-zA-Z\-]+$/
    if (regx.test(userName.value) == true) {
        errUser.classList.add('d-none')
        userName.classList.add('is-valid')
        userName.classList.remove('is-invalid')
    } else {
        errUser.classList.remove('d-none')
        userName.classList.remove('is-valid')
        userName.classList.add('is-invalid')
    }
})
// valid email
email.addEventListener('blur', () => {
    let regx = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$$/
    if (regx.test(email.value) == true) {
        errEmail.classList.add('d-none')
        email.classList.add('is-valid')
        email.classList.remove('is-invalid')
        console.log(email.value);
    } else {
        errEmail.classList.remove('d-none')
        email.classList.remove('is-valid')
        email.classList.add('is-invalid')
    }
})
// valid phone
phone.addEventListener('blur', () => {
    let regx = /^01[0125]-?[0-9]{4}-?[0-9]{4}$/
    if (regx.test(phone.value) == true) {
        errPhone.classList.add('d-none')
        phone.classList.add('is-valid')
        phone.classList.remove('is-invalid')
    } else {
        errPhone.classList.remove('d-none')
        phone.classList.remove('is-valid')
        phone.classList.add('is-invalid')
    }
})
// valid password
password.addEventListener('blur', () => {
    let regx = /^(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
    if (regx.test(password.value) == true) {
        errPassword.classList.add('d-none')
        password.classList.add('is-valid')
        password.classList.remove('is-invalid')
    } else {
        errPassword.classList.remove('d-none')
        password.classList.remove('is-valid')
        password.classList.add('is-invalid')
    }
})
// valid confirm password
conPassword.addEventListener('blur', () => {
    if (conPassword.value==password.value) {
        errConPass.classList.add('d-none')
        conPassword.classList.add('is-valid')
        conPassword.classList.remove('is-invalid')
    } else {
        errConPass.classList.remove('d-none')
        conPassword.classList.remove('is-valid')
        conPassword.classList.add('is-invalid')
    }
})
btnRegister.addEventListener('click', (e) => {
    if (userName.value !=='' && email.value !=='' && phone.value !=='' && password.value !=='' && conPassword.value !=='' && errUser.classList.contains('d-none')==true && errEmail.classList.contains('d-none')==true && errPhone.classList.contains('d-none')==true && errPassword.classList.contains('d-none')==true && errConPass.classList.contains('d-none')==true) {
        let users = {
            id:Date.now(),
            usernmae: userName.value,
            email: email.value,
            phone: phone.value,
            password: password.value,
        }
        // add user in list users
        usersList.push(users)
        // add to local storge
        addToLocalStorge(usersList)
        // form action to login
        document.querySelector('form').action='../login.html'
        
    } else {
        e.preventDefault();
        
    }
})

// add list in the localStorage
function addToLocalStorge(list) {
    window.localStorage.setItem('user',JSON.stringify(list))
}
