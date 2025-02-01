document.addEventListener("DOMContentLoaded", function () {
  const registerBtn = document.getElementById("registerBtn");
  const loginBtn = document.getElementById("loginBtn");
  const registerModal = document.getElementById("registerModal");
  const loginModal = document.getElementById("loginModal");
  const closeBtns = document.querySelectorAll(".close");
  const registerForm = document.getElementById("registerForm");
  const loginForm = document.getElementById("loginForm");

  function openModal(modal) {
    modal.style.display = "block";
    document.body.style.filter = "brightness(50%)";
    modal.style.filter = "brightness(150%)";
  }

  function closeModal(modal) {
    modal.style.display = "none";
    document.body.style.filter = "brightness(100%)";
  }

  registerBtn.addEventListener("click", function () {
    openModal(registerModal);
  });

  loginBtn.addEventListener("click", function () {
    openModal(loginModal);
  });

  closeBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      closeModal(registerModal);
      closeModal(loginModal);
    });
  });

  window.addEventListener("click", function (event) {
    if (event.target == registerModal) {
      closeModal(registerModal);
    }
    if (event.target == loginModal) {
      closeModal(loginModal);
    }
  });

  registerForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Store user information in local storage
    localStorage.setItem("user", JSON.stringify({ email, username, password }));

    // Update the register button to show the username
    registerBtn.textContent = username;
    registerBtn.style.display = "none";
    loginBtn.style.display = "none";

    // Close the modal and reset the brightness
    closeModal(registerModal);
  });

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const loginUsername = document.getElementById("loginUsername").value;
    const loginPassword = document.getElementById("loginPassword").value;

    // Retrieve user information from local storage
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (
      storedUser &&
      storedUser.username === loginUsername &&
      storedUser.password === loginPassword
    ) {
      // Update the register button to show the username
      registerBtn.textContent = storedUser.username;
      registerBtn.style.display = "none";
      loginBtn.style.display = "none";

      // Close the modal and reset the brightness
      closeModal(loginModal);
    } else {
      alert("Invalid username or password");
    }
  });

  // Check if user is already registered
  const storedUser = JSON.parse(localStorage.getItem("user"));
  if (storedUser) {
    registerBtn.textContent = storedUser.username;
    registerBtn.style.display = "none";
    loginBtn.style.display = "none";
  }
});
