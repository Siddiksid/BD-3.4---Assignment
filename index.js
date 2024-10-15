const express = require('express');
const { resolve } = require('path');
let cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.static('static'));

let cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 },
];
let cart1 = cart;
function addtoCart(cart, productId, name, price, quantity) {
  let newObj = { productId, name, price, quantity };
  let cartCopy = cart;
  cartCopy.push(newObj);
  return cartCopy;
}
app.get('/cart/add', (req, res) => {
  let productId = parseInt(req.query.productId);
  let name = req.query.name;
  let price = parseFloat(req.query.price);
  let quantity = parseInt(req.query.quantity);
  let result = addtoCart(cart, productId, name, price, quantity);
  res.json({ cartItems: result });
});

function editQuantityInCart(cart, productId, quantity) {
  return cart.map((item) =>
    item.productId === productId ? (item.quantity = quantity) : item
  );
}

app.get('/cart/edit', (req, res) => {
  let productId = parseInt(req.query.productId);
  let quantity = parseInt(req.query.quantity);
  editQuantityInCart(cart1, productId, quantity);
  res.json({ cartItems: cart1 });
});

function deleteFromCart(cart, productId) {
  return cart.filter((item) => item.productId !== productId);
}

app.get('/cart/delete', (req, res) => {
  let productId = parseInt(req.query.productId);
  let cartCopy = cart;
  let result = deleteFromCart(cartCopy, productId);
  res.json({ cartItems: result });
});

app.get('/cart', (req, res) => {
  res.json({ cartItems: cart });
});

function calculateTotalQuantity(cart) {
  return cart.reduce((acc, curr) => acc + curr.quantity, 0);
}

app.get('/cart/total-quantity', (req, res) => {
  let result = calculateTotalQuantity(cart);
  res.json({ totalQuantity: result });
});

function calculateTotalPrice(cart) {
  return cart.reduce((acc, curr) => acc + curr.quantity * curr.price, 0);
}
app.get('/cart/total-price', (req, res) => {
  let result = calculateTotalPrice(cart);
  res.json({ totalPrice: result });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
