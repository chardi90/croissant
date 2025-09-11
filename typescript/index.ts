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
    description:
      "Un croissant pur beurre garni d’une onctueuse crème de pistache, au goût intense et subtil, relevé par des éclats de pistache pour apporter une touche croquante. Sa pâte croustillante et dorée à l’extérieur, fondante à l’intérieur, offre une expérience raffinée pour tous les amateurs de saveurs délicates.",
    ingredients: ["Farine", "Beurre AOP", "Levure", "Sel", "Pistache"],
  },
  "croissant-amandes": {
    title: "Croissant aud Amandes",
    description:
      "Croissant artisanal généreusement fourré de crème d’amandes maison puis nappé d’amandes effilées et d’un voile de sucre glace. Sa texture croustillante rencontre un cœur tendre et parfumé, révélant toutes les nuances gourmandes de l’amande dans chaque bouchée.",
    ingredients: ["Farine", "Beurre AOP", "Levure", "Sel", "Amandes"],
  },
  "croissant-fraises-chocolat": {
    title: "Croissant aux Fraises au Chocolat",
    description:
      "Un croissant moelleux garni de fraises fraîches et de chocolat fondant, fusionnant douceur fruitée et richesse cacaotée. Une alliance gourmande parfaite pour une pause sucrée ou un petit-déjeuner gourmand, à savourer à tout moment de la journée.",
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

(window as any).changeQuantity = function (
  productId: string,
  delta: number
): void {
  const input = document.getElementById("qty-" + productId) as HTMLInputElement;
  if (!input) return;

  let newValue: number = parseInt(input.value) + delta;
  if (newValue >= 1 && newValue <= 10) {
    input.value = newValue.toString();
  }
};

(window as any).addToCart = function (
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
};

(window as any).toggleCart = function (): void {
  console.log("Toggle cart called");
  // cart toggle logic
};

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

function showSuccessMessage(): void {
  const message = document.getElementById("successMessage");
  if (!message) return;

  message.classList.add("show");
  setTimeout(() => {
    message.classList.remove("show");
  }, 3000);
}

function showProductInfo(productId: string): void {
  console.log("Showing product info for:", productId);
  const info = productInfo[productId];
  if (!info) {
    console.error("No info found for product:", productId);
    return;
  }

  const modalTitle = document.getElementById("productInfoLabel") as HTMLElement;
  const modalBody = document.getElementById("productInfoBody") as HTMLElement;

  if (!modalTitle || !modalBody) {
    console.error("Modal elements not found");
    return;
  }

  modalTitle.textContent = info.title;

  let ingredientsList = "";
  if (info.ingredients && info.ingredients.length > 0) {
    ingredientsList = `<strong>Ingrédients:</strong> ${info.ingredients.join(
      ", "
    )}`;
  }

  let bodyHtml = `
    <p>${info.description}</p>
    ${ingredientsList ? `<p>${ingredientsList}</p>` : ""}
  `;
  modalBody.innerHTML = bodyHtml;

  const modalEl = document.getElementById("productInfoModal");
  if (modalEl) {
    try {
      const modal = new bootstrap.Modal(modalEl);
      modal.show();
    } catch (error) {
      console.error("Error creating modal:", error);
      alert(`${info.title}\n\n${info.description}\n\n${ingredientsList}`);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM ready, binding info-btn listeners");

  setTimeout(() => {
    const infoButtons = document.querySelectorAll<HTMLElement>(".info-btn");
    console.log("Found info buttons:", infoButtons.length);

    infoButtons.forEach((btn, index) => {
      console.log(`Setting up button ${index}:`, btn);

      btn.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();

        const productId = btn.dataset.productId;
        console.log("Info button clicked, product ID:", productId);

        if (productId) {
          showProductInfo(productId);
        } else {
          console.error("No product ID found on button:", btn);
        }
      });
    });
  }, 100);
});
