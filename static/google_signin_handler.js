// import { sendHttpRequest } from "./send_request.js";

const serverUrl = "http://localhost:5000/";

// Decode credential response
function decodeJwtResponse(token) {
    const base64Url = token.split(".")[1];
    const decodedCredentials = JSON.parse(window.atob(base64Url));

    return decodedCredentials;
}

// Send user Data to database
function updateDatabase(data) {
    console.log("Sending userData to Database...");

    sendHttpRequest("POST", `${serverUrl}user/adduser`, data).then(
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
    return sendHttpRequest("POST", `${serverUrl}user/matchuser`, userData)
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

    checkIfUserExists(userDetails)
        .then((response) => {
            if (response == null) {
                // No match found for userDetails -- SignUp
                console.log("User does not exist");
                console.log(response);
                updateDatabase(userDetails);
            } else if (response.status == 200) {
                // Match found Signin
                console.log("Signed In....");
                // Update homepage with user data
            }
        })
        .finally
        // Redirect to homepage
        ();
}
