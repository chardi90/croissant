declare const bootstrap: any;

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

let cart: CartItem[] = [];
let cartTotal: number = 0;

interface ProductInfo {
  title: string;
  description: string;
  ingredients?: string[];
}

const productInfo: Record<string, ProductInfo> = {
  "croissant-traditionnel": {
    title: "Croissant Traditionnel",
    description:
      "Croissant au beurre authentique, feuilleté à la perfection selon la tradition française. Croustillant à l'extérieur, moelleux à l'intérieur.",
    ingredients: ["Farine", "Beurre AOP", "Levure", "Sel"],
  },
  "croissant-sucre": {
    title: "Croissant Sucré",
    description:
      "Croissant traditionnel sublimé par des perles de sucre belge qui fondent délicatement en bouche. Une gourmandise irrésistible.",
    ingredients: ["Farine", "Beurre AOP", "Levure", "Sel", "Sucre Belge"],
  },
  "croissant-jambon": {
    title: "Croissant Jambon Fromage",
    description:
      "Croissant garni de jambon de Paris et fromage suisse fondant. Un repas complet dans une viennoiserie artisanale.",
    ingredients: ["Farine", "Beurre AOP", "Levure", "Sel", "Fromage", "Porc"],
  },
  "croissant-pistache": {
    title: "Croissant à la Pistache",
    description: "Croissant traditionnel sublimé par la creme de pistache.",
    ingredients: ["Farine", "Beurre AOP", "Levure", "Sel", "Pistache"],
  },
  "croissant-amandes": {
    title: "Croissant aud Amandes",
    description: "Croissant traditionnel sublimé par des amandes.",
    ingredients: ["Farine", "Beurre AOP", "Levure", "Sel", "Amandes"],
  },
  "croissant-fraises-chocolat": {
    title: "Croissant aux Fraises au Chocolat",
    description: "Croissant garni des fraises et du chocolat.",
    ingredients: [
      "Farine",
      "Beurre AOP",
      "Levure",
      "Sel",
      "fraises",
      "chocolat",
    ],
  },
  "pain-choc": {
    title: "Pain aux Chocolat",
    description:
      "Pâte feuilletée au beurre avec deux bâtons de chocolat noir 70% cacao. L'excellence de la viennoiserie française.",
    ingredients: ["Farine", "Beurre AOP", "Levure", "Sel", "Chocolat Noir"],
  },
  "pain-choc-blanc": {
    title: "Pain au Chocolat Blanc",
    description:
      "Version gourmande avec chocolat blanc de Madagascar et éclats de noisettes torréfiées. Une création unique.",
    ingredients: [
      "Farine",
      "Beurre AOP",
      "Levure",
      "Sel",
      "chocolat blanc",
      "noisettes",
    ],
  },
  "chausson-aux-pommes": {
    title: "Chausson aus Pommes",
    description:
      "Pâte feuilletée garnie de compotée de pommes Golden du Limousin, cannelle et vanille bourbon. Un classique réinventé.",
    ingredients: [
      "Farine",
      "Beurre AOP",
      "Levure",
      "Sel",
      "pommes",
      "cannelle",
      "alcol",
    ],
  },
  "pain-aux-raisins": {
    title: "Pain aux Raisins",
    description:
      "Pâte levée feuilletée en spirale, crème pâtissière vanille et raisins de Corinthe. Une viennoiserie généreuse et parfumée.",
    ingredients: ["Farine", "Beurre AOP", "Levure", "Sel", "crème", "raisins"],
  },
  "kouign-amann": {
    title: "Kouign Amann",
    description:
      "Spécialité bretonne authentique. Pâte levée, beurre demi-sel et sucre caramélisé. Croustillant et fondant à la fois.",
    ingredients: ["Farine", "Beurre AOP", "Levure", "Sel", "Sucre"],
  },
};

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

function showProductInfo(productId: string): void {
  const info = productInfo[productId];
  if (!info) return;

  const modalTitle = document.getElementById("productInfoLabel") as HTMLElement;
  const modalBody = document.getElementById("productInfoBody") as HTMLElement;

  modalTitle.textContent = info.title;
  let bodyHtml = `<p>${info.description}<br /><br />${info.ingredients}</p>`;
  modalBody.innerHTML = bodyHtml;

  const modalEl = document.getElementById("productInfoModal");
  if (modalEl) {
    const modal = new bootstrap.Modal(modalEl);
    modal.show();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM ready, binding info-btn listeners");

  document.querySelectorAll<HTMLElement>(".info-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const productId = btn.dataset.productId;
      if (productId) {
        showProductInfo(productId);
      }
    });
  });
});
