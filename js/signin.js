function showError(element, message) {
    element.innerHTML = `<i class="bxf bx-alert-triangle"></i> ${message}`;
    // Find the input within the same input-group
    const container = element.closest('.input-group');
    container.querySelector('input').classList.add("input-error");
}

function clearError(element) {
    element.innerHTML = "";
    const container = element.closest('.input-group');
    container.querySelector('input').classList.remove("input-error");
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