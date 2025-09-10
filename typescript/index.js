let cart = [];
let cartTotal = 0;
function changeQuantity(productId, delta) {
    const input = document.getElementById("qty-" + productId);
    if (!input)
        return;
    let newValue = parseInt(input.value) + delta;
    if (newValue >= 1 && newValue <= 10) {
        input.value = newValue.toString();
    }
}
function addToCart(productId, productName, price) {
    const quantityInput = document.getElementById("qty-" + productId);
    if (!quantityInput)
        return;
    const quantity = parseInt(quantityInput.value);
    const existingItem = cart.find((item) => item.id === productId);
    if (existingItem) {
        existingItem.quantity += quantity;
    }
    else {
        cart.push({
            id: productId,
            name: productName,
            price: price,
            quantity: quantity,
        });
    }
    updateCartDisplay();
    showSuccessMessage();
}
function updateCartDisplay() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElement = document.getElementById("cartCount");
    if (!cartCountElement)
        return;
    cartCountElement.textContent = totalItems.toString();
    if (totalItems > 0) {
        cartCountElement.style.display = "flex";
    }
    else {
        cartCountElement.style.display = "none";
    }
}
function showSuccessMessage() {
    const message = document.getElementById("successMessage");
    if (!message)
        return;
    message.classList.add("show");
    setTimeout(() => {
        message.classList.remove("show");
    }, 3000);
}
