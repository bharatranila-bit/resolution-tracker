document.addEventListener('DOMContentLoaded', function() {
    const nameInput = document.getElementById('name-input');
    const nextButton = document.getElementById('next-button');
    const errorMessage = document.getElementById('error-message');
    
    // Show the Name Input Page
    document.getElementById('name-page').style.display = 'block';

    nextButton.addEventListener('click', function() {
        const name = nameInput.value.trim();
        
        if (!name) {
            alert('Please enter your name');
            return;
        }

        // Check if the name is already taken in localStorage
        const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
        if (existingUsers.includes(name)) {
            errorMessage.style.display = 'none'; // Hide error message
            localStorage.setItem('currentUser', name); // Store the current user name
            window.location.href = 'calendar.html'; // Redirect to calendar page
        } else {
            errorMessage.style.display = 'block'; // Show error message
        }
    });
});
