document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  const cartList = document.getElementById("cartList");
  const totalDisplay = document.getElementById("total");
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  if (!token) {
    cartList.innerHTML = "<p>Please login to view your cart.</p>";
    return;
  }

  if (cartItems.length === 0) {
    cartList.innerHTML = "<p>Your cart is empty.</p>";
    totalDisplay.textContent = "Total: ₹0";
    return;
  }

  let total = 0;

  cartList.innerHTML = cartItems.map((item, index) => {
    const qty = item.quantity || 1;
    total += item.price * qty;
    return `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.title}" />
        <div>
          <h3>${item.title}</h3>
          <p>₹${item.price}</p>
          <p>Quantity: ${qty}</p>
          <button onclick="removeItem(${index})">Remove</button>
        </div>
      </div>
    `;
  }).join("");

  totalDisplay.textContent = `Total: ₹${total}`;
});

function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  window.location.reload();
}

document.getElementById("orderForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const token = localStorage.getItem("token");
  const items = JSON.parse(localStorage.getItem("cart")) || [];

  if (!token) {
    return alert("Please login first.");
  }
  if (items.length === 0) {
    return alert("Your cart is empty!");
  }

  // Gather address fields
  const name    = document.getElementById("addressName").value.trim();
  const mobile  = document.getElementById("addressMobile").value.trim();
  const door    = document.getElementById("addressDoor").value.trim();
  const city    = document.getElementById("addressCity").value.trim();
  const state   = document.getElementById("addressState").value.trim();
  const pin     = document.getElementById("addressPincode").value.trim();

  if (!name || !mobile || !door || !city || !state || !pin) {
    return alert("Please fill out all delivery fields.");
  }

  // Combine address or send structured object
  const address = `${name}, ${door}, ${city}, ${state} - ${pin}. Mob: ${mobile}`;

  try {
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ items, address })
    });

    const data = await res.json();

    if (res.ok) {
      alert("🎉 Order placed successfully!");
      localStorage.removeItem("cart");
      window.location.href = "index.html";
    } else {
      alert(data.message || "Order failed.");
    }
  } catch (err) {
    console.error(err);
    alert("Something went wrong.");
  }
});
