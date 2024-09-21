document.onreadystatechange = function() {
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

let welcomeUser = document.querySelector('nav .wel')
// massage welcome user
let user = JSON.parse(localStorage.getItem('loginUser'))
welcomeUser.innerHTML = user[0].usernmae.slice(0, 4) + ' 👋' 
// save cart items in localStorage
let cartList = []
if (localStorage.getItem('cartItems') != null) {
    cartList=JSON.parse(window.localStorage.getItem('cartItems'))
}
// if user not found go login
if (user==null) {
    window.location.href='./../index.html'
}

// logout function
function logOut() {
    localStorage.removeItem('loginUser')
    window.location.href='./../index.html'
}

// list product 
// Sample array of product objects
const furniture = [
    {
        id: 1,
        name: "Stylish Sofa",
        image: "https://m.media-amazon.com/images/I/41Q0nb3eorL._SS400_.jpg",
        description: "A comfortable and stylish sofa for your living room.",
        count: 1,
        price: 499.99
    },
    {
        id:2,
        name: "Modern Coffee Table",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtvXkNhBLkqFj50Uo1P866mv27lWt53tFAaQ&s",
        description: "A sleek coffee table that complements any decor.",
        count: 1,
        price: 199.99
    },
    {
        id: 3,
        name: "Elegant Dining Chair",
        image: "https://www.danetti.com/cdn/shop/files/HeathChampVelvetDiningChairLone.jpg?v=1683797179",
        description: "A beautifully designed chair for your dining area.",
        count: 1,
        price: 89.99
    },
    {
        id: 4,
        name: "Classic Bookshelf",
        image: "https://shop.gkwretail.com/cdn/shop/products/BookshelfClassicCherryfinish3-TierOpenShelfBookcase.jpg?v=1631365843",
        description: "A spacious bookshelf to store your favorite books.",
        count: 1,
        price: 299.99
    },
    {    
        id:5,
        name: "Cozy Armchair",
        image: "https://i5.walmartimages.com/seo/Holaki-Oversize-Accent-Chair-Cozy-Armchair-for-Apartment-Living-Room-Bedroom-Corner-Home-Furniture-Single-Black_c6e13a1a-08b2-44e7-92aa-4fe94f9a5dd6.e28f8d5b391e380d62156a019d878eb7.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF",
        description: "An armchair perfect for reading and relaxing.",
        count: 1,
        price: 249.99
    },
    {    
        id:6,
        name: "Stylish Bed Frame",
        image: "https://i5.walmartimages.com/seo/Homfa-King-Size-Bed-Modern-Upholstered-Platform-Bed-Frame-with-Adjustable-Headboard-for-Bedroom-Beige_1c44b0fa-cb1f-417d-b30a-2a3a7d09c6fb.21073bc894f5ba08337d42767db2dc1e.jpeg",
        description: "A modern bed frame that adds elegance to your bedroom.",
        count: 1,
        price: 399.99

    },
    {    
        id:7,
        name: "Functional Desk",
        image: "https://i.pinimg.com/736x/9e/94/70/9e94700510e77987e3aad06a5247dec5.jpg",
        description: "A spacious desk ideal for your home office.",
        count: 1,
        price: 299.99
    },
    {    
        id:8,
        name: "Chic Nightstand",
        image: "https://m.media-amazon.com/images/I/81DO+7dD9xL.jpg",
        description: "A stylish nightstand with ample storage.",
        count: 1,
        price: 129.99
    },
    {
        id:9,
        name: "Outdoor Lounge Chair",
        image: "https://assets.wfcdn.com/im/30228440/compr-r85/2697/269751545/ouseman-outdoor-lounge-chair-with-cushions.jpg",
        description: "A comfortable chair for your patio or garden.",
        count: 1,
        price: 159.99
    },
    {
        id:10,
        name: "Vintage Side Table",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGpZMOXdl5vl0ztU-uZU8kWzRE_4cDD4fRUw&s",
        description: "A charming side table that adds character to any room.",
        count: 1,
        price: 79.99
    },
]
displayFurniture()
// funcation to display furniture
function displayFurniture(){
    let box = ''
    furniture.forEach((element) => {
        box +=`<div class="flip-card col-lg-3 col-md-4  col-sm-6 col-6">
                <div class="boxs " >
                    <div class="front">
                        <img src="${element.image}" alt="" class="w-100 rounded-2 ">
                    </div>
                    <div class="back p-3 border rounded-2 d-flex flex-column justify-content-center align-items-center">
                                <h5 class="card-title">${element.name}</h5>
                                <p class="card-text">${element.description}</p>
                                <span class="d-block  text-danger fs-5 mb-3">${element.price}Egp</span>
                                <button class="btn btn-danger d-block w-100 position-relative"onclick="addProductToCart(${element.id})">Add To Cart</button>
                    </div>
                </div>
            </div>`
    })
    document.querySelector('.Products .row').innerHTML=box
}

// function add product to cart item
function addProductToCart(id) {
    let elementCart = furniture.filter((element) => { return element.id == id })
    if (!cartList.find((product) => product.id === id)) {
        // add a new product object
        cartList.push(...elementCart)
        let uniqListCart = [...new Set(cartList)]
        localStorage.setItem('cartItems', JSON.stringify([...new Set(uniqListCart)]))
        numberCart()
    } else {
        alert('Product Already Added')
    }
    
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
