// Dark Mode Toggle Logic
const darkModeToggle = document.getElementById('dark-mode-toggle');
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// Register Page Logic
const registerPage = document.getElementById('register-page');
const calendarPage = document.getElementById('calendar-page');
const userNameSpan = document.getElementById('user-name');
const challengeMessage = document.getElementById('challenge-message');
const remainingDaysDisplay = document.getElementById('remaining-days');
const registerBtn = document.getElementById('register-btn');
const newUsernameInput = document.getElementById('new-username');
const newPasswordInput = document.getElementById('new-password');

// Function to handle registration logic
registerBtn.addEventListener('click', () => {
    const newUsername = newUsernameInput.value;
    const newPassword = newPasswordInput.value;

    if (newUsername && newPassword) {
        if (localStorage.getItem(newUsername)) {
            alert('Username already taken!');
        } else {
            localStorage.setItem(newUsername, newPassword);  // Save the user's credentials in localStorage
            alert('Registration successful! You can now log in.');
            registerPage.style.display = 'none';  // Hide registration page
            calendarPage.style.display = 'block'; // Show calendar page after registration
            userNameSpan.textContent = newUsername;
            loadUserProgress(newUsername); // Load user progress after registration
        }
    } else {
        alert('Please fill out both fields!');
    }
});

// Function to load user progress from localStorage
function loadUserProgress(username) {
    const userProgress = JSON.parse(localStorage.getItem(`${username}_progress`)) || new Array(365).fill(false);
    displayCalendar(userProgress);
}

// Display Calendar with the Days
function displayCalendar(userProgress) {
    const daysContainer = document.getElementById('days-container');
    daysContainer.innerHTML = ''; // Clear previous days

    // Display 365 days
    for (let i = 0; i < 365; i++) {
        const dayBox = document.createElement('div');
        dayBox.classList.add('day-box');
        dayBox.dataset.day = i + 1;
        dayBox.innerText = i + 1; // Show the day number
        dayBox.style.backgroundColor = userProgress[i] ? 'green' : 'lightgray'; // Load progress
        dayBox.addEventListener('click', () => toggleDayStatus(i, dayBox, userProgress));
        daysContainer.appendChild(dayBox);
    }

    document.getElementById('save-button').style.display = 'block';
    updateProgress(userProgress); // Update the progress and counter
}

// Toggle Day Status and Update Progress
function toggleDayStatus(index, dayBox, userProgress) {
    userProgress[index] = !userProgress[index]; // Toggle completion status
    dayBox.style.backgroundColor = userProgress[index] ? 'green' : 'lightgray'; // Update box color
    saveProgress(userProgress);
}

// Save progress in localStorage and show success message
function saveProgress(userProgress) {
    const currentUser = userNameSpan.textContent;
    localStorage.setItem(`${currentUser}_progress`, JSON.stringify(userProgress));

    // Update progress bar and counter after saving
    updateProgress(userProgress);

    // Show success message when progress is saved
    alert("Thank you! Your progress has been saved.");
}

// Update Progress Bar based on Completed Days
function updateProgress(userProgress) {
    const completedDays = userProgress.filter(day => day).length;
    const progress = (completedDays / 365) * 100;
    const progressBar = document.getElementById('progress-bar');
    progressBar.style.width = `${progress}%`;
    progressBar.innerHTML = `${Math.round(progress)}%`;

    // Update the remaining days counter
    const remainingDays = 365 - completedDays;
    remainingDaysDisplay.innerText = `Remaining Days: ${remainingDays}`;

    // Update the welcome message
    challengeMessage.innerText = `Welcome to your 365 days hard challenge! Keep pushing towards your goal!`;
}
