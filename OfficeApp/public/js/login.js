const login = async (email, password) => {
  try {
    if (!email || !password) {
      console.log("Email and password are required.");
      return;
    }
    
    const response = await fetch("/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    console.log(response);
    if (response.status === 200) {
      window.location.href = "/home";
    } else {
      console.log("Login failed");
    }
  } catch (err) {
    console.log("An error has occurred:", err);
  }
};

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  login(email, password);
});