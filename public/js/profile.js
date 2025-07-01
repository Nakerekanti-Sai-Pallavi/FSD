document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const editBtn = document.getElementById("editBtn");
  const saveBtn = document.getElementById("saveBtn");
  const cancelBtn = document.getElementById("cancelBtn");
  const form = document.getElementById("profileForm");

  // Fetch profile
  try {
    const res = await fetch("/api/auth/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const user = await res.json();
    nameInput.value = user.name;
    emailInput.value = user.email;
  } catch (err) {
    alert("Failed to load profile");
  }

  // Toggle to edit mode
  editBtn.addEventListener("click", () => {
    nameInput.disabled = false;
    emailInput.disabled = false;
    passwordInput.disabled = false;
    editBtn.classList.add("hidden");
    saveBtn.classList.remove("hidden");
    cancelBtn.classList.remove("hidden");
  });

  // Cancel editing
  cancelBtn.addEventListener("click", () => {
    nameInput.disabled = true;
    emailInput.disabled = true;
    passwordInput.disabled = true;
    passwordInput.value = "";
    editBtn.classList.remove("hidden");
    saveBtn.classList.add("hidden");
    cancelBtn.classList.add("hidden");
  });

  // Save changes
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: nameInput.value,
          email: emailInput.value,
          password: passwordInput.value || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Update failed");
      alert("Profile updated");
      cancelBtn.click(); // Exit edit mode
    } catch (err) {
      alert(err.message || "Error updating profile");
    }
  });
});
