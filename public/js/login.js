document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("Please fill in both fields.");
    return;
  }

  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok) {
      // Save token and user in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Login successful!");
      window.location.href = "index.html";
    } else {
      alert(data.message || "Invalid login credentials.");
    }
  } catch (error) {
    console.error("Login error:", error);
    alert("Something went wrong during login. Please try again.");
  }
});
