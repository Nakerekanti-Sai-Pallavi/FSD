document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("adminToken");
  window.location.href = "login.html";
});
