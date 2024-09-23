let user = JSON.parse(localStorage.getItem('loginUser'))
// if user not found go login
if (user===null) {
    window.location.href='index.html'
}
let welcomeUser = document.querySelector('nav .wel')
// massage welcome user
welcomeUser.innerHTML = user[0].usernmae.slice(0, 4) + ' 👋'
document.onreadystatechange = function () {
    if (document.readyState !== "complete") {
        document.querySelector("body").style.visibility = "hidden";
        document.querySelector("#loader").style.visibility = "visible";
    } else {
        document.querySelector("#loader").style.display = "none";
        document.querySelector("body").style.visibility = "visible";
    }
};
window.onscroll = () => {
    if (scrollY > 500) {
        document.querySelector('nav').classList.add('position-fixed')
        document.querySelector('.up').classList.remove('opacity-0')
    } else {
        document.querySelector('nav').classList.remove('position-fixed')
        document.querySelector('.up').classList.add('opacity-0')
    }
}
document.querySelector('.up').onclick = () => {
    window.scrollTo({top:0})
}
// save cart items in localStorage
let cartList = []
if (localStorage.getItem('cartItems') != null) {
    cartList=JSON.parse(window.localStorage.getItem('cartItems'))
}


// logout function
function logOut() {
    localStorage.removeItem('loginUser')
    window.location.href='index.html'
}
// number in the Cart
function numberCart() {
    let numberItemCart = document.querySelector('.numCart')
    let cartitem = JSON.parse(localStorage.getItem('cartItems'))
    if (cartitem.length == 0) {
        numberItemCart.classList.add('d-none')
    } else {
        numberItemCart.classList.remove('d-none')
        numberItemCart.innerHTML=cartitem.length
        
    }
}
numberCart()
// total price
function totalPrice() {
    let totalPrice = document.querySelector('.total')
    let total = JSON.parse(localStorage.getItem('cartItems'))
    
    if (total.length!==0) {
        let list=[]
        for (let i = 0; i < total.length; i++) {
            let allprice=total[i].price*total[i].count
            list.push(allprice)
        }
        let price= list.reduce((acc, current) => { return acc + current; })
        totalPrice.innerHTML = price + ' EGY';
    } else {
        cartFind();
    }
}
totalPrice();
document.querySelector('.name').innerHTML=user[0].usernmae
