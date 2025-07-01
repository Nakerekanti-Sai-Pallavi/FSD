document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("adminToken");
  const ordersList = document.getElementById("ordersList");

  async function fetchOrders() {
    try {
      const res = await fetch("/api/orders", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const orders = await res.json();

      if (!orders.length) {
        ordersList.innerHTML = "<p>No orders found.</p>";
        return;
      }

      ordersList.innerHTML = orders.map(order => `
        <div class="order-card">
          <h3>Order by ${order.name} (${order.email})</h3>
          <div class="order-meta">
            Address: ${order.address}<br />
            Total: ₹${order.total}<br />
            Status: <strong>${order.delivered ? "✅ Delivered" : "❌ Not Delivered"}</strong>
          </div>
          <strong>Items:</strong>
          <ul>
            ${order.items.map(item => `
              <li>${item.title} - ₹${item.price} × ${item.quantity || 1}</li>
            `).join("")}
          </ul>
          ${!order.delivered ? `<button onclick="markDelivered('${order._id}')">Mark as Delivered</button>` : ""}
        </div>
      `).join("");

    } catch (err) {
      console.error("Failed to load orders", err);
      ordersList.innerHTML = "<p>Error loading orders.</p>";
    }
  }

  window.markDelivered = async (orderId) => {
    const confirmUpdate = confirm("Mark this order as delivered?");
    if (!confirmUpdate) return;

    try {
      const res = await fetch(`/api/orders/${orderId}/deliver`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Order marked as delivered.");
        fetchOrders(); // reload updated orders
      } else {
        alert(data.message || "Failed to update.");
      }
    } catch (err) {
      alert("Error updating order");
    }
  };

  fetchOrders();
});
