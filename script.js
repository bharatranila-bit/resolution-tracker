window.onload = () => {
    const calendarContainer = document.getElementById('calendar');
    const userNameInput = document.getElementById('userName');

    // Save the name when it's entered
    userNameInput.addEventListener('input', () => {
        const name = userNameInput.value;
        localStorage.setItem('userName', name); // Store name in localStorage
    });

    // Display stored name if available
    const storedName = localStorage.getItem('userName');
    if (storedName) {
        userNameInput.value = storedName; // Display stored name
    }

    // Create day boxes for the calendar
    for (let i = 1; i <= 365; i++) { // Create 365 boxes for each day of the year
        const dayBox = document.createElement('div');
        dayBox.classList.add('day');
        dayBox.textContent = i;
        dayBox.classList.add('inactive');  // Default color is inactive

        // Add click event to toggle the color of the day
        dayBox.addEventListener('click', () => {
            if (dayBox.classList.contains('inactive')) {
                dayBox.classList.remove('inactive');
                dayBox.classList.add('active');
            } else {
                dayBox.classList.remove('active');
                dayBox.classList.add('inactive');
            }
        });

        calendarContainer.appendChild(dayBox);
    }
};
