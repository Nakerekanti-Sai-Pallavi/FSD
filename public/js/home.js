document.addEventListener("DOMContentLoaded", () => {
  const searchBtn = document.getElementById("searchBtn");
  const searchInput = document.getElementById("searchInput");
  const resultsContainer = document.getElementById("searchResults");

  searchBtn.addEventListener("click", async () => {
    const query = searchInput.value.trim().toLowerCase();

    if (!query) {
      resultsContainer.innerHTML = "<p>Please enter a search term.</p>";
      return;
    }

    try {
      const res = await fetch("/api/books");
      const books = await res.json();

      const filtered = books.filter(book =>
        book.title.toLowerCase().includes(query)
      );

      if (filtered.length === 0) {
        resultsContainer.innerHTML = "<p>No matching books found.</p>";
        return;
      }

      resultsContainer.innerHTML = filtered.map((book, index) => `
        <div class="book-card">
          <img src="${book.image}" alt="${book.title}" />
          <h3>${book.title}</h3>
          <p>₹${book.price}</p>
          <button class="add-btn" data-index="${index}">Add to Cart</button>
        </div>
      `).join("");

      // Attach event listeners to "Add to Cart" buttons
      document.querySelectorAll(".add-btn").forEach((btn, i) => {
        btn.addEventListener("click", () => addToCart(filtered[i]));
      });

    } catch (err) {
      console.error("Search error:", err);
      resultsContainer.innerHTML = "<p>Error fetching books.</p>";
    }
  });
});

function addToCart(book) {
  if (!book || !book._id) {
    alert("Invalid book data");
    return;
  }

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingIndex = cart.findIndex(item => item._id === book._id);

  if (existingIndex !== -1) {
    cart[existingIndex].quantity = (cart[existingIndex].quantity || 1) + 1;
  } else {
    book.quantity = 1;
    cart.push(book);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${book.title} added to cart!`);
}
