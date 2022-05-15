let createAccount = document.getElementsByClassName('createAcc')[0];
let createAccForm = document.getElementsByClassName('overlayS')[0];
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