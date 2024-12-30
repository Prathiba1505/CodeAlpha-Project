const cart = JSON.parse(localStorage.getItem('cart')) || [];

function placeOrder(event) {
    event.preventDefault();
    document.getElementById('checkoutForm').style.display = 'none';
    document.getElementById('orderConfirmation').style.display = 'block';

    setTimeout(() => {
        localStorage.removeItem('cart');
        window.location.href = 'home.html';
    }, 3000);
}
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (event) => {
        const productId = event.target.dataset.product;
        const product = {
            id: productId,
            name: `Product ${productId}`,
            price: 100 * productId,
            image: `https://via.placeholder.com/300`
        };
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
    });
});
const cartItemsContainer = document.getElementById('cartItems');
cart.forEach(product => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>$${product.price}</p>
        <button class="remove-from-cart" data-id="${product.id}">Remove</button>
    `;
    cartItemsContainer.appendChild(cartItem);
});
document.querySelectorAll('.remove-from-cart').forEach(button => {
    button.addEventListener('click', (event) => {
        const productId = event.target.dataset.id;
        const updatedCart = cart.filter(product => product.id !== productId);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        location.reload();
    });
});
document.getElementById('checkout').addEventListener('click', () => {
    window.location.href = 'checkout.html';
});
