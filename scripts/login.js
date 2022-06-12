// import { sendHttpRequest } from "./send_request.js";

const createAccount = document.getElementsByClassName("createAcc")[0];
const createAccForm = document.getElementsByClassName("overlayS")[0];
const signUpBtn = document.getElementsByClassName("signUpBtn")[0];
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

// Display timeout for popUp box after sending input details
const [popUpBox, popUpIcon, popUpMsg] = [
    document.getElementsByClassName("finalMsg")[0],
    document.getElementsByClassName("msgIcon")[0],
    document.getElementById("popUpMsg")
];

function popUp(iconPath, textContent, closeOverlay) {
    popUpBox.style.visibility = "visible";
    popUpIcon.setAttribute("src", `${iconPath}`);
    popUpMsg.innerHTML = textContent;

    setTimeout(
        (close) => {
            popUpBox.style.visibility = "hidden";
            if (close) {
                createAccForm.style.visibility = "hidden";
            }
        },
        3000,
        closeOverlay
    );
}

signUpBtn.addEventListener("click", () => {
    const name = document.getElementById("fname").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    const check = checkInputs(name, email, password, confirmPassword);
    if (check == 1) {
        let url = "http://localhost:5000/user/adduser";
        sendHttpRequest("POST", url, {
            name: name,
            email: email,
            password: password
        }).then(
            (response) => {
                console.log(response.message);
                popUp("../img/icon/successful.png", "Successfull", true);
            },
            (error) => {
                console.log(error.message);
                popUp(
                    "../img/icon/error-occured.png",
                    "An Error occured",
                    true
                );
            }
        );
    } else {
        popUp("../img/icon/invalid-details.gif", "Invalid details", false);
    }
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
