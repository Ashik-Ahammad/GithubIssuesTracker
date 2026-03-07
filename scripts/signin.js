document.getElementById("signin-btn").addEventListener("click", function () {
  const usernameInput = document.getElementById("input-username");
  const userName = usernameInput.value;

  const passwordInput = document.getElementById("input-password");
  const password = passwordInput.value;

  if (userName === "admin" && password === "admin123") {

    const alertBox = document.createElement("div");
    alertBox.className = "alert alert-success fixed top-5 left-1/2 -translate-x-1/2 w-auto";
    
    alertBox.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
      <span>Successfully Signed in!</span>
    `;

    document.body.appendChild(alertBox);

    setTimeout(() => {
      alertBox.remove();
      window.location.assign("/home.html");
    }, 1000);

  } else {
    const alertBox = document.createElement("div");
    alertBox.className = "alert alert-error fixed top-5 left-1/2 -translate-x-1/2 w-auto";
    alertBox.innerHTML = `
    
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>

      <span>Invalid Username or Password. Please try again.</span>
    `;
    document.body.appendChild(alertBox);

    setTimeout(() => {
      alertBox.remove();
    }, 1000);
  }

  usernameInput.value = "";
  passwordInput.value = "";
});
