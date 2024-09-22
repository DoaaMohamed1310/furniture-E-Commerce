// if user not found go login
let user = JSON.parse(localStorage.getItem('loginUser'))
if (user==null) {
    window.location.href='index.html'
}
// massage welcome user
let welcomeUser = document.querySelector('nav .wel')
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

// logout function
function logOut() {
    localStorage.removeItem('loginUser')
    window.location.href='index.html'
}

// add items in the page cart
let cartItems = document.querySelector('.cartDesc')
let items = JSON.parse(localStorage.getItem('cartItems'))
// cart find or not
function cartFind() {
    if (JSON.parse(localStorage.getItem('cartItems')).length !=0) {
        document.querySelector('.cartItem').classList.remove('d-none')
        document.querySelector('.notFound').classList.add('d-none')
    } else {
        document.querySelector('.cartItem').classList.add('d-none')
        document.querySelector('.notFound').classList.remove('d-none')
    }
}
cartFind();

displayItems(items);
function displayItems(items) {
    let box = ''
    items.forEach(element => {
        box +=`<div class="row  align-items-center border-bottom py-3 mb-5">
                    <div class="col-md-10 col-10">
                                        <div class="row align-items-center">
                
                                            <div class="col-md-3 col-4">
                                                <img src="${element.image}" alt="" class="w-100 rounded-2">
                                            </div>
                                            <div class="col-md-9 col-8">
                                                <h3>${element.name}</h3>
                                                <p class="text-muted">${element.description}</p>
                                                <span class="d-block mb-3 text-danger fw-bold fs-4">${element.price} EGY</span>
                                                <button class="btn btn-danger" onclick="deleteItem(${element.id})"><i class="fa-solid fa-trash"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-2 col-2 p-0 count">
                                        <span class="btn btn-success btn-sm fw-bold " onclick="addCount(${element.id},${element.count})">
                                            <i class="fa-solid fa-plus count "></i>
                                        </span>
                                        <span class="p-2">
                                            ${element.count}
                                        </span>
                                        <span class="btn btn-danger btn-sm fw-bold " onclick="minusCount(${element.id},${element.count})">
                                            <i class="fa-solid fa-minus "></i>
                                        </span>
                                    </div>
                </div>`
    });
    cartItems.innerHTML = box;
}
// funcation to delete item from cart
function deleteItem(id) {
    let lisItem= JSON.parse(localStorage.getItem('cartItems')).filter((ele) => {
        return ele.id !== id
    })
    localStorage.setItem('cartItems', JSON.stringify(lisItem))
    displayItems(lisItem);
    totalPrice()
    numberCart()
}
// funcation to Add count
function addCount(id, count) {
    let item=JSON.parse(localStorage.getItem('cartItems'))
    for (let i = 0; i < item.length; i++) {
        if (item[i].id === id) {
            count++
            item[i].count=count
        }
    }
    localStorage.setItem('cartItems', JSON.stringify(item))
    displayItems(item)
    totalPrice()

}

// funcation to minus count
function minusCount(id, count) {
    let item = JSON.parse(localStorage.getItem('cartItems'));
    for (let i = 0; i < item.length; i++) {
        if (item[i].id === id) {
            count--
            item[i].count = count
        }
    }
    localStorage.setItem('cartItems', JSON.stringify(item))
    displayItems(item)
    if (count == 0) {
            deleteItem(id)
    }
    totalPrice()

}
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