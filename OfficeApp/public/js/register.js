const register = async (name, email, password) => {
  try {
    const response = await fetch("/api/v1/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    console.log(response);
    window.location.href = "/login";
  } catch (err) {
    console.log("An error has occurred:", err);
  }
};

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  register(name, email, password);
});