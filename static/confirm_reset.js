let nextBtn1 = document.getElementsByClassName("firstNextBtn")[0];
let nextBtn2 = document.getElementsByClassName("secondNextBtn")[0];
// let tempPasswordPane = document.getElementById("temporary_password")[0];
let preResetPane = document.getElementById("pre");
let postResetPane = document.getElementById("post");
let email;

const host = "http://localhost:5000/";
console.log(nextBtn1);
nextBtn1.addEventListener("click", () => {
    email = document.getElementById("emailInput").value;
    let token = document.getElementById("temporary_password").value;

    let data = { email: email, token: token };
    console.log(data);
    sendHttpRequest("POST", `${host}user/reset-password/confirm-token`, data)
        .then((response) => {
            if (response.match === true) {
                // Show post-reset pane
                preResetPane.style.visibility = "hidden";
                postResetPane.style.visibility = "visible";
            } else {
                alert("Invalid token");
            }
        })
        .catch((error) => {
            console.log(error);
        });
});

nextBtn2.addEventListener("click", () => {
    let password = document.getElementById("new_password").value;
    let confirmPassword = document.getElementById("confirm_password").value;

    if (password === confirmPassword) {
        let data = { email: email, password: password };
        console.log(data);
        sendHttpRequest("POST", `${host}user/update-password`, data)
            .then((response) => {
                if (response.status === 200) {
                    // Show post-reset pane
                    window.location.href = "./login.html";
                } else {
                    alert("Invalid token");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    } else {
        alert("Passwords do not match");
    }
});
