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
            errorMessage.style.display = 'block';
        } else {
            // Save new name and move to the calendar page
            existingUsers.push(name);
            localStorage.setItem('users', JSON.stringify(existingUsers));

            // Redirect to the next page
            localStorage.setItem('currentUser', name);
            window.location.href = 'calendar.html';
        }
    });
});
