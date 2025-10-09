// Dark Mode Toggle Logic
const darkModeToggle = document.getElementById('dark-mode-toggle');
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// Handle Login Page Logic
const loginPage = document.getElementById('login-page');
const registerPage = document.getElementById('register-page');
const calendarPage = document.getElementById('calendar-page');
const userNameSpan = document.getElementById('user-name');
const loginBtn = document.getElementById('login-btn');
const registerLink = document.getElementById('register-link');
const loginLink = document.getElementById('login-link');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const newUsernameInput = document.getElementById('new-username');
const newPasswordInput = document.getElementById('new-password');

// Handle Register Page Logic
const registerBtn = document.getElementById('register-btn');

// Toggle between login and register pages
registerLink.addEventListener('click', () => {
    loginPage.style.display = 'none';
    registerPage.style.display = 'block';
});

loginLink.addEventListener('click', () => {
    registerPage.style.display = 'none';
    loginPage.style.display = 'block';
});

// Function to handle login logic
loginBtn.addEventListener('click', () => {
    const username = usernameInput.value;
    const password = passwordInput.value;

    const storedPassword = localStorage.getItem(username);

    if (storedPassword && storedPassword === password) {
        loginPage.style.display = 'none';
        calendarPage.style.display = 'block';
        userNameSpan.textContent = username;
        loadUserProgress(username);
    } else {
        alert('Invalid username or password');
    }
});

// Function to handle registration logic
registerBtn.addEventListener('click', () => {
    const newUsername = newUsernameInput.value;
    const newPassword = newPasswordInput.value;

    if (newUsername && newPassword) {
        if (localStorage.getItem(newUsername)) {
            alert('Username already taken!');
        } else {
            localStorage.setItem(newUsername, newPassword);
            alert('Registration successful! You can now log in.');
            registerPage.style.display = 'none';
            loginPage.style.display = 'block';
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
}

// Toggle Day Status and Update Progress
function toggleDayStatus(index, dayBox, userProgress) {
    userProgress[index] = !userProgress[index]; // Toggle completion status
    dayBox.style.backgroundColor = userProgress[index] ? 'green' : 'lightgray'; // Update box color
    saveProgress(userProgress);
}

// Save progress in localStorage
function saveProgress(userProgress) {
    const currentUser = userNameSpan.textContent;
    localStorage.setItem(`${currentUser}_progress`, JSON.stringify(userProgress));
}
