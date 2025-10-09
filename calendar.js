// Dark Mode Toggle Logic
const darkModeToggle = document.getElementById('dark-mode-toggle');
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// Set User Name after it is entered
const userNameInput = document.getElementById('user-name');
const userNameSpan = document.getElementById('user-name');
const userName = localStorage.getItem('userName');
const nextBtn = document.getElementById('next-btn');

// Check if user name exists
if (userName) {
    showCalendarPage();
} else {
    nextBtn.addEventListener('click', handleNameSubmit);
}

function handleNameSubmit() {
    const enteredName = userNameInput.value.trim();
    if (enteredName) {
        if (localStorage.getItem(enteredName)) {
            alert('This name already exists, loading your previous data...');
            showCalendarPage(enteredName);
        } else {
            localStorage.setItem('userName', enteredName);
            localStorage.setItem(enteredName, JSON.stringify(new Array(365).fill(false)));
            showCalendarPage(enteredName);
        }
    } else {
        alert('Please enter a valid name');
    }
}

// Function to display the calendar page after name submission
function showCalendarPage() {
    document.getElementById('calendar-page').innerHTML = `
        <h1>Welcome, ${localStorage.getItem('userName')}!</h1>
        <div id="progress-bar">
            <span></span>
        </div>
        <div id="days-container"></div>
        <button id="save-button">Save Progress</button>
    `;
    loadProgress();
}

// Initialize the Days Container
const daysContainer = document.getElementById('days-container');

// Number of days (1 to 365)
const totalDays = 365;
let userProgress = JSON.parse(localStorage.getItem(localStorage.getItem('userName'))) || new Array(totalDays).fill(false);

// Generate Day Boxes (1 to 365)
for (let i = 0; i < totalDays; i++) {
    const dayBox = document.createElement('div');
    dayBox.classList.add('day-box');
    dayBox.dataset.day = i + 1;
    dayBox.innerText = i + 1;
    dayBox.addEventListener('click', () => toggleDayStatus(i, dayBox));
    daysContainer.appendChild(dayBox);
}

// Toggle Day Status and update Progress
function toggleDayStatus(index, dayBox) {
    userProgress[index] = !userProgress[index]; // Toggle completion status
    dayBox.style.backgroundColor = userProgress[index] ? 'green' : 'lightgray'; // Update box color
    saveProgress();
}

// Save progress in localStorage
function saveProgress() {
    localStorage.setItem(localStorage.getItem('userName'), JSON.stringify(userProgress));
    updateProgress();
}

// Update Progress Bar based on Completed Days
function updateProgress() {
    const completedDays = userProgress.filter(day => day).length;
    const progress = (completedDays / totalDays) * 100;

    const progressBar = document.getElementById('progress-bar');
    progressBar.style.width = `${progress}%`;
    progressBar.innerHTML = `${Math.round(progress)}%`;
}

// Load saved progress on page load
function loadProgress() {
    const savedProgress = JSON.parse(localStorage.getItem(localStorage.getItem('userName')));
    if (savedProgress) {
        savedProgress.forEach((completed, index) => {
            const dayBox = document.querySelectorAll('.day-box')[index];
            dayBox.style.backgroundColor = completed ? 'green' : 'lightgray';
        });
        updateProgress();
    }
}

// Chart.js Setup for Progress Visualization (Optional)
const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'], // Sample months (replace with your months)
        datasets: [{
            label: 'Days Completed',
            data: [10, 15, 20, 25, 30, 35], // Replace with actual progress data
            backgroundColor: 'rgba(0, 123, 255, 0.5)',
            borderColor: 'rgba(0, 123, 255, 1)',
            borderWidth: 1
        }]
    }
});
