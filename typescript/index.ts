interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

let cart: CartItem[] = [];
let cartTotal: number = 0;

function changeQuantity(productId: string, delta: number): void {
  const input = document.getElementById("qty-" + productId) as HTMLInputElement;
  if (!input) return;

  let newValue: number = parseInt(input.value) + delta;
  if (newValue >= 1 && newValue <= 10) {
    input.value = newValue.toString();
  }
}

function addToCart(
  productId: string,
  productName: string,
  price: number
): void {
  const quantityInput = document.getElementById(
    "qty-" + productId
  ) as HTMLInputElement;
  if (!quantityInput) return;

  const quantity: number = parseInt(quantityInput.value);
  const existingItem: CartItem | undefined = cart.find(
    (item) => item.id === productId
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
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

function updateCartDisplay(): void {
  const totalItems: number = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCountElement = document.getElementById("cartCount");
  if (!cartCountElement) return;

  cartCountElement.textContent = totalItems.toString();

  if (totalItems > 0) {
    cartCountElement.style.display = "flex";
  } else {
    cartCountElement.style.display = "none";
  }
}

function showSuccessMessage() {
  const message = document.getElementById("successMessage");
  if (!message) return;

  message.classList.add("show");
  setTimeout(() => {
    message.classList.remove("show");
  }, 3000);
}
