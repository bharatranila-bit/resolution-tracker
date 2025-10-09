document.addEventListener('DOMContentLoaded', function() {
    const currentUser = localStorage.getItem('currentUser');
    const userNameElement = document.getElementById('user-name');
    const daysContainer = document.getElementById('days-container');
    const saveButton = document.getElementById('save-button');
    
    if (!currentUser) {
        // If no user is logged in, redirect to the name input page
        window.location.href = 'index.html';
        return;
    }

    // Display user's name
    userNameElement.textContent = currentUser;

    // Load previous progress from localStorage (or initialize a new array if none)
    let userProgress = JSON.parse(localStorage.getItem(currentUser)) || Array(365).fill(false);

    // Create calendar boxes (1 to 365)
    for (let i = 0; i < 365; i++) {
        const dayBox = document.createElement('div');
        dayBox.classList.add('day-box');
        dayBox.textContent = i + 1;

        // If this day is completed (green), change its color
        if (userProgress[i]) {
            dayBox.style.backgroundColor = 'green';
        }

        // Toggle the completion status when clicked
        dayBox.addEventListener('click', function() {
            userProgress[i] = !userProgress[i];
            dayBox.style.backgroundColor = userProgress[i] ? 'green' : '';
        });

        daysContainer.appendChild(dayBox);
    }

    // Save progress when the button is clicked
    saveButton.addEventListener('click', function() {
        localStorage.setItem(currentUser, JSON.stringify(userProgress));
        alert('Your progress has been saved!');
    });
});
