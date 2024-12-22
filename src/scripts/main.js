let cart = []; 
const cartModal = document.getElementById("cart-modal");
const cartIcon = document.getElementById("cart-icon");

function handleScroll() {
    const products = document.querySelectorAll('.product'); 
  
    products.forEach((product) => {
      const rect = product.getBoundingClientRect(); 
      if (rect.top < window.innerHeight - 100) { 
        product.classList.add('visible'); 
      }
    });
}

window.addEventListener('scroll', handleScroll);

function handleScrollAnimation() {
    const images = document.querySelectorAll(".service-image img");
  
    images.forEach((image) => {
      const rect = image.getBoundingClientRect();
      const windowHeight = window.innerHeight;
  
      if (rect.top <= windowHeight - 100) {
        image.parentElement.classList.add("visible");
      }
    });
}

window.addEventListener("scroll", handleScrollAnimation);

handleScrollAnimation();

document.addEventListener("DOMContentLoaded", () => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      cart = JSON.parse(savedCart);
      updateCartCount();
      updateCartItems();
    }
});
  
document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", (e) => {
      const productCard = e.target.closest(".product-card");
      const name = productCard.dataset.name;
      const price = parseFloat(productCard.dataset.price);
  
      const existingProduct = cart.find((item) => item.name === name);
      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        cart.push({ name, price, quantity: 1 });
      }
  
      updateCartCount();
      updateCartItems();
    });
});
  
function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById("cart-count").textContent = count;

    localStorage.setItem("cartCount", count);
}
  
function updateCartItems() {
    const cartItems = document.getElementById("cart-items");
    const totalPrice = document.getElementById("total-price");
  
    cartItems.innerHTML = "";
    let total = 0;
  
    cart.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = `${item.name} x ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;
      cartItems.appendChild(li);
      total += item.price * item.quantity;
    });
  
    totalPrice.textContent = total.toFixed(2);

    localStorage.setItem("cart", JSON.stringify(cart));
}
  
cartIcon.addEventListener("click", (e) => {
    e.stopPropagation();
    if (cartModal.style.display === "block") {
      cartModal.style.display = "none";
    } else {
      cartModal.style.display = "block";
    }
});
  
document.addEventListener("click", (e) => {
    if (!cartIcon.contains(e.target)) {
      cartModal.style.display = "none";
    }
});
  
document.getElementById("checkout-button").addEventListener("click", () => {
    cart = [];
    localStorage.removeItem("cart");
    updateCartCount();
    updateCartItems();

    window.location.href = "../assets/images/thank-you.jpg";
});