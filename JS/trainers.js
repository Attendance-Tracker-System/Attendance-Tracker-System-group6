document.addEventListener('DOMContentLoaded', function () {
    displayUserTable();
});

function displayUserTable() {
    var userTableBody = document.getElementById('userTableBody');
    userTableBody.innerHTML = ''; // Clear the table body before adding new rows

    // Retrieve existing user data from localStorage
    var userData = JSON.parse(localStorage.getItem('user_')) || [];

    // Display each user in the table
    userData.forEach(function (user, index) {
        var row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.fullName}</td>
            <td>${user.email}</td>
            <td>${user.areaOfExpertise}</td>
            <td>${user.experience}</td>
            <td>
                <button onclick="updateUser(${index})">Update</button>
                <button onclick="deleteUser(${index})">Delete</button>
            </td>
        `;
        userTableBody.appendChild(row);
    });
}

function updateUser(index) {
    // Implement update logic based on your requirements
    // You can redirect to another page for updating or show a modal, etc.
    console.log('Update user at index:', index);
}

function deleteUser(index) {
    // Soft delete (mark as deleted) or remove the user based on your requirements
    var userData = JSON.parse(localStorage.getItem('user_')) || [];
    userData.splice(index, 1); // Remove the user at the specified index
    localStorage.setItem('user_', JSON.stringify(userData));
    
    // Update the displayed table
    displayUserTable();
}

function logout() {
    localStorage.clear();
    window.location.replace('loginPage.html');
}


