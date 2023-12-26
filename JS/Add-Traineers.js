
document.addEventListener('DOMContentLoaded', function () {
    // Check if there is no data stored before displaying the initial load alert
    if (!localStorage.getItem('user_')) {
        showAlert('All fields are required');
    }

    // Form submission
    document.querySelector('form').addEventListener('submit', function (event) {
        event.preventDefault();
        checkForm();
    });
});

function checkForm() {
    var fullName = document.getElementById('fullname').value.trim();
    var email = document.getElementById('email').value.trim();
    var password = document.getElementById('password').value.trim();
    var experience = document.getElementById('YearsOfExp').value.trim();
    var areaOfExpertise = document.getElementById('AreaofExpertis').value.trim();

    // Show alert for empty fields
    if (!fullName || !email || !password || !experience || !areaOfExpertise) {
        showAlert('All fields are required');
    } else if (!isValidEmail(email)) {
        showAlert('Invalid email address');
    } /*else if (!isValidPassword(password)) {
        showAlert('Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character');
    }*/ else if (!isValidExperience(experience)) {
        showAlert('Years of experience must be a valid number.');
    } else if (isEmailExists(email)) {
        showAlert('Email already exists. Please choose a different email.');
    } else {
        // Assuming successful validation, proceed to create
        create();
         document.getElementById('fullname').value=" ";
        document.getElementById('email').value=" ";
        document.getElementById('password').value=" ";
       document.getElementById('YearsOfExp').value=" ";
     document.getElementById('AreaofExpertis').value=" ";
     displayStoredData(); // Call the function to display stored data after successful registration
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Added successfully',
            confirmButtonText: 'OK'});
    }
}

function isValidEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}


function isValidPassword(password) {
    // Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
}


function isValidExperience(experience) {
    var experienceRegex = /^\d+$/;
    return experienceRegex.test(experience);
}

function isEmailExists(email) {
    return localStorage.getItem('user_' + email) !== null;
}

function create() {
    var fullName = document.getElementById('fullname').value.trim();
    var email = document.getElementById('email').value.trim();
    var password = document.getElementById('password').value.trim();
    var experience = document.getElementById('YearsOfExp').value.trim();
    var areaOfExpertise = document.getElementById('AreaofExpertis').value.trim();

    var dataObj = {
        fullName: fullName,
        email: email,
        password: password,
        experience: experience,
        areaOfExpertise: areaOfExpertise
    };

    // Retrieve existing data from localStorage
    var existingData = JSON.parse(localStorage.getItem('user_')) || [];

    // Push new data to the array
    existingData.push(dataObj);

    // Save the updated array back to localStorage
    localStorage.setItem('user_', JSON.stringify(existingData));
}

function showAlert(message) {
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message,
        confirmButtonText: 'OK'
    });
}

function logout() {
    localStorage.clear();
    window.location.replace('loginPage.html');
}
