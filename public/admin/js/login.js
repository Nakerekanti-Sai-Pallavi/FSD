document.getElementById("adminLoginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorDisplay = document.getElementById("adminLoginError");

  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok) {
      if (data.user.role !== "admin") {
        errorDisplay.textContent = "❌ You are not an admin.";
        return;
      }

      localStorage.setItem("adminToken", data.token);
      window.location.href = "dashboard.html";
    } else {
      errorDisplay.textContent = data.message || "Login failed.";
    }
  } catch (err) {
    errorDisplay.textContent = "Server error. Try again.";
  }
});
