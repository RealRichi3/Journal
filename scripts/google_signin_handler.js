// import { sendHttpRequest } from "./send_request.js";

// Decode credential response
function decodeJwtResponse(token) {
    const base64Url = token.split(".")[1];
    const decodedCredentials = JSON.parse(window.atob(base64Url));

    return decodedCredentials;
}

// Send user Data to database
function updateDatabase(data) {
    console.log("Sending userData to Database...");
    const url = "http://localhost:5000/user/adduser";

    sendHttpRequest("POST", url, data).then(
        (response) => {
            console.log(response.message);
            alert(response.message);
        },
        (error) => {
            console.log(error.message);
            alert(error.message);
        }
    );
}

function checkIfUserExists(userData) {
    return sendHttpRequest(
        "POST",
        "http://localhost:5000/user/matchuser",
        userData
    )
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return error.message;
        });
}

function handleCredentialResponse(response) {
    console.log("handling Credential Response");

    const responsePayload = decodeJwtResponse(response.credential);
    const userDetails = {
        name: responsePayload.name,
        email: responsePayload.email,
        user_type: "google"
    };

    checkIfUserExists(userDetails).then((response) => {
        if (response == null) {
            // No match found for userDetails -- SignUp and redirect to homepage
            console.log("User does not exist");
            console.log(response);
            updateDatabase(userDetails);
        } else {
            // Signin and redirect to homepage
            console.log("Signed In....");
        }
    });
}
