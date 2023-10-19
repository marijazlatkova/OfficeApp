const resetPassword = async (email, oldPassword, newPassword) => {
  try {
    const response = await fetch("/api/v1/auth/resetPassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        oldPassword,
        newPassword,
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
  const email = document.getElementById("email").value;
  const oldPassword = document.getElementById("oldPassword").value;
  const newPassword = document.getElementById("newPassword").value;
  resetPassword(email, oldPassword, newPassword);
});