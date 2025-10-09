// Dark Mode Toggle Logic
const darkModeToggle = document.getElementById('dark-mode-toggle');
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// Set User Name after it is entered
const userNameSpan = document.getElementById('user-name');
const userName = localStorage.getItem('userName') || 'User';
userNameSpan.textContent = userName;

// Initialize the Days Container
const daysContainer = document.getElementById('days-container');

// Number of days (1 to 365)
const totalDays = 365;
const userProgress = JSON.parse(localStorage.getItem('userProgress')) || new Array(totalDays).fill(false);

// Generate Day Boxes (1 to 365)
for (let i = 0; i < totalDays; i++) {
    const dayBox = document.createElement('div');
    dayBox.classList.add('day-box');
    dayBox.dataset.day = i + 1;
    dayBox.addEventListener('click', () => toggleDayStatus(i, dayBox));
    daysContainer.appendChild(dayBox);
}

// Toggle Day Status and update Progress
function toggleDayStatus(index, dayBox) {
    userProgress[index] = !userProgress[index]; // Toggle completion status
    dayBox.style.backgroundColor = userProgress[index] ? 'green' : 'lightgray'; // Update box color
    saveProgress();
}

// Update Progress Bar based on Completed Days
function updateProgress() {
    const completedDays = userProgress.filter(day => day).length;
    const progress = (completedDays / totalDays) * 100;

    const progressBar = document.getElementById('progress-bar');
    progressBar.style.width = `${progress}%`;
    progressBar.innerHTML = `${Math.round(progress)}%`;
}

// Save progress in localStorage
function saveProgress() {
    localStorage.setItem('userProgress', JSON.stringify(userProgress));
    updateProgress();
}

// Load saved progress on page load
window.addEventListener('load', () => {
    const savedProgress = JSON.parse(localStorage.getItem('userProgress'));
    if (savedProgress) {
        savedProgress.forEach((completed, index) => {
            const dayBox = document.querySelectorAll('.day-box')[index];
            dayBox.style.backgroundColor = completed ? 'green' : 'lightgray';
        });
        updateProgress();
    }
});

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

// Load user's name and ensure it's unique (do not allow duplicate names)
const nameInput = document.getElementById('user-name');
const nameStorage = localStorage.getItem('userName');

if (!nameStorage) {
    nameInput.addEventListener('change', () => {
        const enteredName = nameInput.value;
        if (localStorage.getItem('userName') === enteredName) {
            alert('This name is already taken! Please choose another one.');
        } else {
            localStorage.setItem('userName', enteredName);
        }
    });
}
