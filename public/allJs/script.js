// const { add } = require("lodash");

function slideNav(){
    var nav = document.querySelector('.click');
    nav.classList.add('active');
}

const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if(close){
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    })
}

// cart open close
var cartIcon = document.getElementById('cart-icon');
var cart = document.querySelector(".newCart");
var closeCart = document.getElementById("close-cart");

// open cart
function cartADD(){
  cart.classList.add("active");
}
function closCart(){
  cart.classList.remove("active");
}

// Making add to cart

// remove cart item
function removeItem(event){
  var buttonClicked = event.target;
  const Item = buttonClicked.closest('.cart-box');
  Item.remove();
  updateTotalPrice();
  saveCartItems();
}
// quantity change
var quantityChange = document.getElementsByClassName("cart-quantity");

function updateTotalPrice() {
  const cartBoxes = document.querySelectorAll('.cart-box');
  let totalPrice = 0;

  cartBoxes.forEach((cartBox) => {
    const priceElement = cartBox.querySelector('.cart-price');
    const quantityElement = cartBox.querySelector('.cart-quantity');

    const price = parseFloat(priceElement.textContent.replace('$', ''));
    const quantity = parseInt(quantityElement.value);

    const subTotal = price * quantity;
    totalPrice += subTotal;

    const subTotalElement = document.createElement('div');
    subTotalElement.textContent = `$${subTotal.toFixed(2)}`;
  });

  // Update the total price display
  const totalPriceElement = document.getElementById('total-price');
  totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
  // save total to Localstorage 
  localStorage.setItem('cartTotal', totalPrice);
  saveCartItems();
  updateCartIcon();
  // loadCartItem();
}

if(document.readyState == 'loading'){
  document.addEventListener('DOMContentLoaded', addCartClicked);
}else {
  addCartClicked();
}

// Add to cart function
function addCartClicked(event){
  var button = event.target;
  var shopProducts = findParentByClass(button, 'pro');
  // console.log(shopProducts.innerHTML);
  var titleElement = shopProducts.querySelector('.product-title');
  var priceElement = shopProducts.querySelector('.price');
  var productImgElement = shopProducts.querySelector('.product-img');

  if (titleElement && priceElement && productImgElement) {
    var title = titleElement.innerText;
    var price = priceElement.innerText;
    var productImg = productImgElement.src;
  }
  addProductToCart(title,price,productImg);
  updateTotalPrice();
  saveCartItems();
  updateCartIcon();

}

function findParentByClass(element, className) {
  var parent = element.parentNode;

  while (parent) {
    if (parent.classList.contains(className)) {
      return parent;
    }
    parent = parent.parentNode;
  }

  return null;
}


function addProductToCart(title,price,productImg){
  var cartShopBox = document.createElement("div");
  cartShopBox.classList.add("cart-box");
  var cartItems = document.getElementsByClassName("cart-content")[0];
  var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
  for(var i = 0; i < cartItemsNames.length; i++){
    if(cartItemsNames[i].textContent == title) {
      alert('You have already added this item to cart');
      return;
    }
    
  }
  var cartBoxContent = `
  <img src="${productImg}"  alt="" class="cart-img">
  <div class="detail-box">
      <div class="cart-product-title">${title}</div>
      <div class="cart-price">${price}</div>
      <input type="number" name="" id="" value="0" class="cart-quantity" onchange="updateTotalPrice(event)">
  </div>

  <!-- remove item -->

  <i class="fas fa-trash cart-remove" onclick="removeItem(event)"></i>`;

  cartShopBox.innerHTML = cartBoxContent;
  cartItems.append(cartShopBox);
  cartShopBox.getElementsByClassName('cart-remove')[0]
  .addEventListener('click', removeItem);
  cartShopBox.getElementsByClassName('cart-quantity')[0]
  .addEventListener('change',quantityChange);
  saveCartItems();
  updateCartIcon();
}


// keep item in the cart page when refresh with localstorage
function saveCartItems(){
var cartContent = document.getElementsByClassName('cart-content')[0];
var cartBoxes = cartContent.getElementsByClassName('cart-box');
var cartItems = [];

for(var i=0;i< cartBoxes.length;i++){
  var cartBox = cartBoxes[i];
  var titleElement = cartBox.getElementsByClassName('cart-product-title')[0];
  var priceElement = cart.getElementsByClassName('cart-price')[0];
  var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
  var productImg = cartBox.getElementsByClassName('cart-img')[0].src;
  var item = {
    title: titleElement.innerText,
    price: priceElement.innerText,
    quantity: quantityElement.value,
    productImg: productImg,
  };
    cartItems.push(item);
  }
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

function clearCart(){
  var cartContent = document.getElementsByClassName('cart-content')[0];
  while(cartContent.firstChild){
    cartContent.removeChild(cartContent.firstChild);
  }
  updateTotalPrice();
  localStorage.removeItem('cartItems');
}


// load in cart
function loadCartItem(){
  var cartItems = localStorage.getItem('cartItems');
  if(cartItems){
    cartItems = JSON.parse(cartItems);

    for(var i=0;i<cartItems.length;i++){
      var item = cartItems[i];
      addProductToCart(item.title, item.price, item.productImg);

      var cartBoxes = document.getElementsByClassName('cart-box');
      var cartBox = cartBoxes[cartBoxes.length - 1];
      var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
      quantityElement.value = item.quantity;
    }
  }
  var cartTotal = localStorage.getItem('cartTotal');

  if(cartTotal){
    document.getElementsByClassName('total-price'[0]).innerText = "$" + cartTotal;
  }
}

window.addEventListener('load', loadCartItem);
// Quantity in cart icon

function updateCartIcon() {
  var cartBoxes = document.getElementsByClassName('cart-box');
  var quantity = 0;

  for(var i = 0; i < cartBoxes.length; i++){
    var cartBox = cartBoxes[i];
    var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
    quantity += parseInt(quantityElement.value);
  }
  var cartIcon = document.querySelector('#cart-icon');
  cartIcon.setAttribute("data-quantity", quantity);
}

// clear cart item after payment
function clearCart(){
  var cartContent = document.getElementsByClassName('cart-content')[0];
  cartContent.innerHTML = '';
  updateTotalPrice();
  localStorage.removeItem("cartItems");
}





let uploadInput = document.querySelector('.product-img');

let imagePath = 'image/T-shirt/Polo.png';

uploadInput.addEventListener('change', function() {
  const file = uploadInput.files[0];
  let imageUrl;
  if (file.type.startsWith('image/')) {
    fetch('/s3url')
      .then(res => res.json())
      .then(url => {
        fetch(url, {
          method: 'PUT',
          headers: new Headers({ 'Content-Type': 'multipart/form-data' }),
          body: file
        })
          .then(res => {
            imageUrl = url.split("?")[0];

            let productImage = document.querySelector('.product-img');
            productImage.src = imagePath;
            
          });
      });
  }
});


