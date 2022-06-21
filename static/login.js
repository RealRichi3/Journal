// import { sendHttpRequest } from "./send_request.js";
// import { popUp } from "./pop_up.js";

const createAccount = document.getElementsByClassName("createAcc")[0];
const createAccForm = document.getElementsByClassName("overlayS")[0];
const signUpBtn = document.getElementsByClassName("signUpBtn")[0];
const loginBtn = document.getElementById("loginBtn");
const close = document.getElementsByClassName("close")[0];

// Action: Create account link
createAccount.addEventListener("click", function () {
    createAccForm.style.visibility = "visible";
});

// Close overlay for Signup
close.addEventListener("click", () => {
    createAccForm.style.visibility = "hidden";
});

// Checks if User details match Criteria
function checkInputs(name, email, password, confirmPassword) {
    let [checkResultName, checkResultEmail, checkResultPassword] = [
        true,
        true,
        true
    ];

    // Checks name length
    {
        let nameTextWarning = document.getElementsByClassName("cName")[0];
        if (name.length <= 3) {
            nameTextWarning.innerHTML =
                "Full name must have 3 or more characters";
            checkResultName = false;
        } else {
            nameTextWarning.innerHTML = "";
        }
    }

    // Checks email format
    {
        let emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let emailWarningMsg = document.getElementsByClassName("cEmail")[0];
        if (email.match(emailFormat)) {
            emailWarningMsg.innerHTML = "";
        } else {
            emailWarningMsg.innerHTML = "Invalid E-mail format";
            checkResultEmail = false;
        }
    }

    // Password Check
    {
        const passwordFormat =
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
        let noMatchMsg = document.getElementsByClassName("cPwd")[0];

        // Check Password Format
        if (password.match(passwordFormat)) {
            noMatchMsg.innerHTML = "";
        } else {
            noMatchMsg.innerHTML =
                "Minimun - 8 characters, must have at least 1 Uppercase, 1 lowercase, and 1 number";
            checkResultPassword = false;
        }

        // Check if passwords match
        let passwordMatchMsg = document.getElementsByClassName("cCPwd")[0];
        if (password == confirmPassword) {
            passwordMatchMsg.innerHTML = "";
        } else {
            passwordMatchMsg.innerHTML = "Password doesn't match";
            checkResultPassword = false;
        }
    }

    return checkResultName & checkResultEmail & checkResultPassword;
}

// Action: Make HTTP request to server
function requestToServer(method, url, data, popUpMsg) {
    return sendHttpRequest(method, url, data).then((response, error) => {
        if (response.status == 200) {
            popUp("./img/icon/successful.png", popUpMsg.success, true);
        } else {
            console.log(error);
            popUp("./img/icon/error-occured.png", popUpMsg.error, true);
        }
        return response;
    });
}

// Action: Sign up button
signUpBtn.addEventListener("click", () => {
    const name = document.getElementById("fname").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    const check = checkInputs(name, email, password, confirmPassword);
    if (check == 1) {
        // If all inputs are valid
        let url = "http://localhost:5000/user/adduser";
        let data = {
            name: name,
            email: email,
            password: password
        };
        requestToServer("POST", url, data, {
            success: "Account created successfully",
            error: "An error occured!"
        }).then((response) => {
            if (response.status === 200) {
                // If account created successfully then login
                alert("Account created successfully, Please Login");
            }
        }); // Send request to server
    } else {
        popUp("./img/icon/invalid-details.gif", "Invalid details", false);
    }
});

// Action: Login button
loginBtn.addEventListener("click", () => {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    let url = "http://localhost:5000/user/login";
    let data = {
        email: email,
        password: password
    };
    requestToServer("POST", url, data, {
        success: "Login successful",
        error: "Login failed"
    })
        .then((response) => {
            if (response.status === 200) {
                // If login successful redirect to home page
                window.location.href = "../templates/journal.html";
            }
        })
        .catch((error) => {
            console.log(error);
            console.log(error.status);
        }); // Send request to server
});

// Links for icon files
{
    /* <a
                target="_blank"
                href="https://icons8.com/icon/zXYxiHplRLDm/error-cloud"
                >Error Cloud</a
            >
            icon by <a target="_blank" href="https://icons8.com">Icons8</a>
            <a
                target="_blank"
                href="https://icons8.com/icon/rCpjcVTbx4zo/box-important"
                >Box Important</a
            >
            icon by <a target="_blank" href="https://icons8.com">Icons8</a>
            <!-- partial --> */
}
