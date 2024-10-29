// Cart functionality

let cart = [];

// Function to add item to the cart
function addToCart(product, price) {
    const existingItem = cart.find(item => item.product === product);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ product, price, quantity: 1 });
    }
    updateCart();
}

// Function to remove item from the cart
function removeFromCart(product) {
    cart = cart.filter(item => item.product !== product);
    updateCart();
}

// Function to update cart display
function updateCart() {
    const cartContainer = document.querySelector('.shopping-cart');
    const totalElement = cartContainer.querySelector('.total span');
    const cartItems = cartContainer.querySelectorAll('.box');
    
    // Clear current cart display
    cartItems.forEach(item => item.remove());

    let total = 0;
    
    // Loop through cart and update HTML
    cart.forEach(item => {
        const cartBox = document.createElement('div');
        cartBox.classList.add('box');
        cartBox.innerHTML = `
            <i class="fas fa-times" onclick="removeFromCart('${item.product}')"></i>
            <img src="images/${item.product.toLowerCase().replace(/\s+/g, '-')}.png" class="cart-img" width="100px" height="100px">
            <div class="content">
                <h3>${item.product}</h3>
                <span class="quantity">${item.quantity}</span>
                <span class="multiply">x</span>
                <span class="price">$${item.price.toFixed(2)}</span>
            </div>
        `;
        cartContainer.insertBefore(cartBox, totalElement.parentNode);
        total += item.price * item.quantity;
    });

    totalElement.innerText = total.toFixed(2);
}

// Checkout functionality
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
    });

    alert(`Thank you for your purchase! Your total is $${total.toFixed(2)}.`);
    cart = []; // Clear the cart after checkout
    updateCart();
}

// Event listeners for adding items to cart
document.querySelectorAll('.fa-shopping-cart').forEach((button, index) => {
    button.addEventListener('click', () => {
        const productElement = button.closest('.box').querySelector('h3');
        const priceElement = button.closest('.box').querySelector('.price');
        const product = productElement.innerText;
        const price = parseFloat(priceElement.innerText.replace('$', ''));
        addToCart(product, price);
    });
});

// Checkout button event listener
document.querySelector('.btn.checkout-cart').addEventListener('click', checkout);
