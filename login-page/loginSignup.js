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

function matchPassword (password, confirmPassword) {
    if (password != confirmPassword){
        return False
    }
}

signUpBtn.addEventListener('click', () => {
    const name = document.getElementById('fname')
    const email = document.getElementById('email')
    const password = document.getElementById('password')
    const confirmPassword = document.getElementById('confirmpassword')

    password
    let url = 'http://localhost:5000/user/adduser'
    sendHttpRequest('POST', url, {
        "name": name,
        "email": email,
        "password": password
    }).then(response => {
        console.log(response.message)
    }, error => {
        console.log(error.message)
    })
})           
