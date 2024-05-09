//axios.defaults.baseURL = 'https://funding-website.azurewebsites.net/'; // PRODUCTION URL
axios.defaults.baseURL = 'http://localhost:3000/'; // LOCAL URL



const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
};

function validatePassword(password, confirm_password){
  return password.value == confirm_password.value;
}

// Get the element by its ID
const element = document.getElementById('drop_down');

// Add event listener for the select tag
element.addEventListener('change', function (event) {
    const selectedIndex = event.target.selectedIndex;

    /* 
    * TODO:
    ** The 'company_input' field should always be there
    ** If the user selects 'Fund Manager', the 'company_input' field should then be usable
    ** If the user selects 'Applicant', the 'company_input' field should no longer be able to be interacted with
    ** The 'company_input' field should be a required field if the user selects 'Fund Manager'
    ** Add data validation

    * These changes make things a bit easier and a little more efficient
    */

    // Check if the form already has a company input field
    let existingInput = document.getElementById('company_input');

    if (selectedIndex == 1) {
        // If there's no company input field yet, create and append one
        if (!existingInput) {
            const input = document.createElement('input');
            input.type = 'text';
            input.id = 'company_input';
            input.name = 'Company_Name';
            input.placeholder = 'Company name...';

            const refElement = document.getElementById("drop_down_label");
            const form = document.getElementById("login");
            //TODO add padding or smth
            form.insertBefore(input, refElement);
        }
    } else {
        // If the role changes away from fund manager, remove the company input field
        if (existingInput) {
            existingInput.remove();
        }
    }
});



const signUpBtn = document.getElementById("submit_button")

signUpBtn.addEventListener('click', async function (event) {
    validateInput()
    if (!inputsValid) {
        return
    }
    event.preventDefault();

    const name = document.getElementById("name_input").value;
    const email = document.getElementById("email_input").value;
    let passwordTemp = document.getElementById("password_input").value

    if (email === "") {
        alert("Please enter your email");
        return;
    }else if (!validateEmail(email)) {
        alert("Please enter a valid email address");
        return;
    }else if (name === "") {
        alert("Please enter your name");
        return;
    }else if (passwordTemp === "") {
        alert("Please enter a password");
        return;
    }else if (validatePassword(document.getElementById("password_input"),
    document.getElementById("confirm_password_input")) === false) {
        alert("Please enter a matching password");
        return;
    }else if (passwordTemp.length < 8) {
        alert("Password must be at least 8 characters long");
        return;
    }

    console.log(passwordTemp)

    const password = CryptoJS.SHA256(document.getElementById("password_input").value).toString();

    const role = document.getElementById("drop_down").value;
    const company = document.getElementById("company_input")?.value;

    // TRYING AXIOS
    const body = {
        name: name,
        password: password,
        email: email,
        role: role,
        company: company
    }

    try {
        console.log(body);
        const response = await axios.post("/register", body);
        console.log(response.data);

        setTimeout(() => {
            window.location.href = "../login.html"
        }, 500);

    } catch (error) {
        console.log(error.response.data);
    }
    // END: TRYING AXIOS
});

function isStrongPassword(password) {
    // Define the criteria for a strong password
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\-]/.test(password);

    // Check if all criteria are met
    return (
        password.length >= minLength &&
        hasUppercase &&
        hasLowercase &&
        hasDigit &&
        hasSpecialChar
    );
}

function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!email.includes("@")) {
        return "Email must contain an '@' symbol.";
    } else if (email.startsWith("@") || email.endsWith("@")) {
        return "The '@' symbol should not be the first or last character.";
    } else {
        return "Correct";
    }
}