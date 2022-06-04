const createAccount = document.getElementsByClassName('createAcc')[0];
const createAccForm = document.getElementsByClassName('overlayS')[0];
const signUpBtn = document.getElementsByClassName('signUpBtn')[0];
const close = document.getElementsByClassName('close')[0]

// Action: Create account link
createAccount.addEventListener("click", function(){
    console.log('in')
	createAccForm.style.visibility = 'visible'
});

// Close overlay for Signup
close.addEventListener('click', () => {
    createAccForm.style.visibility = 'hidden'
})


// REQUESTS
function sendHttpRequest (method, url, data) {
    const promise = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url); 
        xhr.responseType = 'json'
        
        if (data){
            xhr.setRequestHeader('Content-Type', 'application/json')
        }

        xhr.onload = () => {
            if (xhr.status == 200) {
                resolve(xhr.response)
            }
        }
        xhr.onerror = () => {
            reject('An error occured!')
        }

        xhr.send(JSON.stringify(data));
    })
    return promise
}

function checkInputs (name, email, password, confirmPassword) {
    let [checkResultName, checkResultEmail, checkResultPassword] = [true, true, true]
    
    // Check name length
    {
        let nameTextWarning = document.getElementsByClassName('cName')[0]
        if (name.length <= 3){
            nameTextWarning.innerHTML = "Full name must have 3 or more characters" 
            checkResultName = false
        }else { 
            nameTextWarning.innerHTML = ''
            console.log('Name is valid') }
    }
    
    // Check email format
    let emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let emailWarningMsg = document.getElementsByClassName('cEmail')[0]
    if (email.match(emailFormat)) { emailWarningMsg.innerHTML = ''}
    else {
        emailWarningMsg.innerHTML = "Invalid E-mail format"
        checkResultEmail = false
    }

    // Password Check
    {
        const passwordFormat = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"

        // Check Password Format
        if (password.match(passwordFormat)) {
            console.log('Password format valid')
        }else {
            let noMatchMsg = document.getElementsByClassName('cPwd')[0]
            noMatchMsg.innerHTML = 'Minimun - 8 characters, must have Uppercase, lowercase, symbol and number'
            checkResultPassword = false
        }
        
        // Check if passwords match
        if (password == confirmPassword){
            console.log('Passwords match')
        }else { 
            let passwordMatchMsg = document.getElementsByClassName('cCPwd')[0]
            passwordMatchMsg.innerHTML = "Password doesn't match"
            checkResultPassword = false }
    }
    console.log(checkResultName & checkResultEmail & checkResultPassword)
    return (checkResultName & checkResultEmail & checkResultPassword)
}

signUpBtn.addEventListener('click', () => {
    const name = document.getElementById('fname').value
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const confirmPassword = document.getElementById('confirmPassword').value
    
    check = checkInputs(name, email, password, confirmPassword)
    if (check){
        let url = 'http://localhost:5000/user/adduser'
        sendHttpRequest('POST', url, {
            "name": name,
            "email": email,
            "password": password
        }).then(response => {
            console.log(response.message)
            // Add siigned up successfully msg here
        }, error => {
            console.log(error.message)
        })
    }else {
        console.log('Invalid inputs')
    }
})           

// // Get the input field
// var input = document.getElementById("myInput");

// // Get the warning text
// var text = document.getElementById("text");

// // When the user presses any key on the keyboard, run the function
// input.addEventListener("keyup", function(event) {

//   // If "caps lock" is pressed, display the warning text
//   if (event.getModifierState("CapsLock")) {
//     text.style.display = "block";
//   } else {
//     text.style.display = "none"
//   }
// }); 