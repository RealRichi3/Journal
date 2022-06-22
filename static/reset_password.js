const host = "http://localhost:8080/";

let submitButton = document.getElementById("btn");

// Sends userEmail to server
submitButton.addEventListener("click", () => {
    const email = document.getElementsByClassName("emailInput").value;
    sendHttpRequest("POST", `${host}/user/reset-password`, {
        email: email
    })
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
    window.location.href = "../templates/confirm-reset.html"; // Redirect to confirm-reset page
});
