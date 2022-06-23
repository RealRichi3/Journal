const host = "http://localhost:5000/";

let submitButton = document.getElementsByClassName("resetBtn")[0];
let preResetPane = document.getElementsByClassName("pre-reset")[0];
let postResetPane = document.getElementsByClassName("post-reset")[0];

// Sends userEmail to server
submitButton.addEventListener("click", () => {
    const email = document.getElementsByClassName("emailInput")[0].value;

    sendHttpRequest("POST", `${host}user/reset-password`, {
        email: email
    })
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });

    // Show post-reset pane
    preResetPane.style.visibility = "hidden";
    postResetPane.style.visibility = "visible";
});
