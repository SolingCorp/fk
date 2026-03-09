function showError(element, message) {
    // bxs-error-alt is the solid triangle icon in Boxicons
    element.innerHTML = `<i class="bxf bx-alert-triangle"></i> ${message}`;
    element.previousElementSibling?.classList.add("input-error");
}

function clearError(element) {
    element.innerHTML = "";
    element.previousElementSibling?.classList.remove("input-error");
}

const form = document.getElementById("loginForm")

const email = document.getElementById("email")
const password = document.getElementById("password")

const emailError = document.getElementById("emailError")
const passwordError = document.getElementById("passwordError")

const togglePassword = document.getElementById("togglePassword")


form.addEventListener("submit", function(e){

e.preventDefault()

let valid = true


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


/* SUCCESS */

if(valid){

alert("Login successful!")

}

})



/* SHOW / HIDE PASSWORD */

togglePassword.addEventListener("click", () => {

const type = password.getAttribute("type") === "password" ? "text" : "password"
password.setAttribute("type", type)

})