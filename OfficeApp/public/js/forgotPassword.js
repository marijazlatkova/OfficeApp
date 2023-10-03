const forgotPassword = async (email) => {
  try {
    const response = await fetch("/api/v1/auth/forgotPassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email
      }),
    });

    console.log(response);
    window.location.href = "/resetPassword";
  } catch (err) {
    console.log("An error has occurred:", err);
  }
};

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  forgotPassword(email);
});