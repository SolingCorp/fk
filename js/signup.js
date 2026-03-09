function showError(element, message) {
    // bxs-error-alt is the solid triangle icon in Boxicons
    element.innerHTML = `<i class="bxf bx-alert-triangle"></i> ${message}`;
    element.previousElementSibling?.classList.add("input-error");
}

function clearError(element) {
    element.innerHTML = "";
    element.previousElementSibling?.classList.remove("input-error");
}

const form = document.getElementById("signupForm")

const fullname = document.getElementById("fullname")
const email = document.getElementById("email")
const password = document.getElementById("password")
const confirmPassword = document.getElementById("confirmPassword")
const terms = document.getElementById("terms")

const nameError = document.getElementById("nameError")
const emailError = document.getElementById("emailError")
const passwordError = document.getElementById("passwordError")
const confirmError = document.getElementById("confirmError")

const togglePassword = document.querySelectorAll(".togglePassword")



form.addEventListener("submit", function(e){

e.preventDefault()

let valid = true



/* NAME VALIDATION */

if(fullname.value.trim().length < 3){
    showError(nameError, "Please enter your full name."); // Changed from .textContent
    valid = false;
} else {
    clearError(nameError);
    fullname.classList.add("input-success");
}



/* EMAIL VALIDATION */

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

if(!emailPattern.test(email.value)){
    showError(emailError, "Enter a valid email address."); // Uses the helper
    valid = false;
} else {
    clearError(emailError);
    email.classList.add("input-success");
}


/* PASSWORD VALIDATION */
if(password.value.length < 8){
    showError(passwordError, "Password must be at least 8 characters."); // Changed from .textContent
    valid = false;
} else {
    clearError(passwordError);
    password.classList.add("input-success");
}

/* CONFIRM PASSWORD */
if(confirmPassword.value !== password.value){
    showError(confirmError, "Passwords do not match."); // Changed from .textContent
    valid = false;
} else {
    clearError(confirmError);
    confirmPassword.classList.add("input-success");
}



/* TERMS CHECK */

if(!terms.checked){

alert("You must agree to the Terms & Conditions.")
valid = false

}



/* SUCCESS */

if(valid){

alert("Account created successfully!")

form.reset()

}

})



/* SHOW / HIDE PASSWORD */

togglePassword.forEach(icon => {

icon.addEventListener("click", () => {

const input = icon.previousElementSibling

const type = input.getAttribute("type") === "password" ? "text" : "password"

input.setAttribute("type", type)

})

})