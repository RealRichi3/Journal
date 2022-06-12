// import { sendHttpRequest } from "./send_request.js";

// Decode credential response
function decodeJwtResponse(token) {
    console.log(token);
    const base64Url = token.split(".")[1];
    const decodedCredentials = JSON.parse(window.atob(base64Url));

    return decodedCredentials;
}

// Send user Data to database
function updateDB(data) {
    console.log("Sending userData to Database...");
    const url = "http://localhost:5000/user/adduser";

    sendHttpRequest("POST", url, data).then(
        (response) => {
            console.log(response.message);
            // alert(response.message);
        },
        (error) => {
            console.log(error.message);
            // alert(error.message);
        }
    );
}

function handleCredentialResponse(response) {
    // to decode the credential response.
    console.log("handling Credential Response");

    const responsePayload = decodeJwtResponse(response.credential);
    const userDetails = {
        name: responsePayload.name,
        email: responsePayload.email,
        user_type: "google"
    };

    updateDB(userDetails);
    console.log("ID: " + responsePayload.sub);
    console.log("Full Name: " + responsePayload.name);
    console.log("Given Name: " + responsePayload.given_name);
    console.log("Family Name: " + responsePayload.family_name);
    console.log("Image URL: " + responsePayload.picture);
    console.log("Email: " + responsePayload.email);
}
