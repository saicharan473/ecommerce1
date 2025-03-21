const productsContainer = document.getElementById("productsContainer");
const cartContainer = document.getElementById("cartContainer");
const feedbackElement = document.getElementById("feedback");
const clearCartBtn = document.getElementById("clearCart");
const sortByPriceBtn = document.getElementById("sortByPrice");

const products = [
    { id: 1, name: "T-shirt", price: 599, image: "images/tshirt2.jpg" },
    { id: 2, name: "sweat-shirt", price: 649, image: "images/hoodie1.webp" },
    { id: 3, name: "T-shirt", price: 489, image: "images/tshirt5.jpg" },
    { id: 4, name: "T-shirt", price: 799, image: "images/tshirt4.jpg" },
    { id: 5, name: "Saree", price: 549, image: "images/saree5.jpg" },
    { id: 6, name: "Saree", price: 569, image: "images/saree6.jpg" },
    { id: 7, name: "Saree", price: 599, image: "images/saree7.jpg" },
    { id: 8, name: "Dress", price: 2000, image: "images/dress1.jpg" },
    { id: 9, name: "Dress", price: 2999, image: "images/dress2.jpg" },
    { id: 10, name: "Dress", price: 1999, image: "images/dress3.jpg" },
    { id: 11, name: "Dress", price: 1499, image: "images/dress4.jpg" },
    { id: 12, name: "Kurtha", price: 699, image: "images/kurtha1.webp" },
    { id: 13, name: "t-shirt", price: 1499, image: "images/tshirt3.jpg" },
    { id: 14, name: "Saree", price: 399, image: "images/saree2.jpg" },
    { id: 15, name: "Saree", price: 499, image: "images/saree3.jpg" },
    { id: 16, name: "T-shirt", price: 599, image: "images/hoodie1.webp" },
];

const cart = [];
let timerId;

clearCartBtn.addEventListener("click", clearCart);
sortByPriceBtn.addEventListener("click", sortByPrice);

function clearCart() {
    cart.length = 0;
    renderCartDetails();
    updateUserFeedback("Cart is cleared", "success");
}

function sortByPrice() {
    cart.sort((a, b) => a.price - b.price);
    renderCartDetails();
}

function renderProductDetails() {
    productsContainer.innerHTML = "";
    products.forEach(({ id, name, price, image }) => {
        const productHTML = `
            <div class="product-card">
                <img src="${image}" alt="${name}">
                <h3>${name}</h3>
                <p id="price-color">₹${price}</p>
                <button onclick="addToCart(${id})">Add to Cart</button>
            </div>
        `;
        productsContainer.insertAdjacentHTML("beforeend", productHTML);
    });
}

function renderCartDetails() {
    cartContainer.innerHTML = "";
    cart.forEach(({ id, name, price, image }) => {
        const cartItemHTML = `
            <div class="addtocart-card">
                <img src="${image}" alt="${name}">
                <h3>${name}</h3>
                <p id="price-color">₹${price}</p>
                <button onclick="removeFromCart(${id})">Remove</button>
            </div>
        `;
        cartContainer.insertAdjacentHTML("beforeend", cartItemHTML);
    });

    const totalPrice = cart.reduce((acc, product) => acc + product.price, 0);
    document.getElementById("totalPrice").textContent = `Total: Rs. ${totalPrice}`;
}

function addToCart(id) {
    if (cart.some(product => product.id === id)) {
        updateUserFeedback("Item already in cart", "error");
        return;
    }

    const productToAdd = products.find(product => product.id === id);
    cart.push(productToAdd);
    renderCartDetails();
    updateUserFeedback(`${productToAdd.name} added to cart`, "success");
}

function removeFromCart(id) {
    const productIndex = cart.findIndex(product => product.id === id);
    if (productIndex > -1) {
        const removedProduct = cart.splice(productIndex, 1)[0];
        renderCartDetails();
        updateUserFeedback(`${removedProduct.name} removed from cart`, "error");
    }
}

function updateUserFeedback(msg, type) {
    clearTimeout(timerId);
    feedbackElement.style.display = "block";
    if (type === "success") {
        feedbackElement.style.backgroundColor = "green";
    }
    if (type === "error") {
        feedbackElement.style.backgroundColor = "red";
    }
    feedbackElement.textContent = msg;

    feedbackElement.textContent = msg;
    timerId = setTimeout(() => feedbackElement.style.display = "none", 3000);
}

// Initialize product display
renderProductDetails();