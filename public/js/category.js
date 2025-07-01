document.addEventListener("DOMContentLoaded", async () => {
  const bookList = document.getElementById("bookList");
  const categoryName = document.body.dataset.category; // Make sure this is set in HTML

  try {
    const res = await fetch("/api/books");
    const books = await res.json();

    // Filter books by category (case-insensitive)
    const filteredBooks = books.filter(
      book => book.category.toLowerCase() === categoryName.toLowerCase()
    );

    if (filteredBooks.length === 0) {
      bookList.innerHTML = "<p>No books found in this category.</p>";
      return;
    }

    bookList.innerHTML = filteredBooks
      .map((book, index) => `
        <div class="book-card">
          <img src="${book.image}" alt="${book.title}" />
          <h3>${book.title}</h3>
          <p>Price: ₹${book.price}</p>
          <button class="add-btn" data-index="${index}">Add to Cart</button>
        </div>
      `)
      .join("");

    // Attach click listeners to buttons
    document.querySelectorAll(".add-btn").forEach((btn, i) => {
      btn.addEventListener("click", () => addToCart(filteredBooks[i]));
    });

  } catch (error) {
    console.error("Failed to load books:", error);
    bookList.innerHTML = "<p>Error loading books. Please try again later.</p>";
  }
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
