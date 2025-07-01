document.getElementById("signupForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (!name || !email || !password) {
    alert("All fields are required.");
    return;
  }

  try {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();

    if (res.ok) {
      alert("Signup successful! Please login.");
      window.location.href = "login.html";
    } else {
      alert(data.message || "Signup failed. Try a different email.");
    }
  } catch (error) {
    console.error("Signup error:", error);
    alert("Something went wrong during signup.");
  }
});
