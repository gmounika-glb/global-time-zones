// Elements from the DOM
// Select the timezone dropdown
const timezoneSelect = document.getElementById('timezone-select'); 
// Add clock button
const addClockBtn = document.getElementById('add-clock'); 
// Container to display clocks
const clockContainer = document.getElementById('clock-container'); 
// Reset clocks button
const resetClockContainer = document.getElementById('reset'); 
// Dark mode toggle button
const toggleMode = document.getElementById('dark-Mode-toggle'); 
// Icon inside the dark mode toggle button
const darkModeIcon = document.querySelector('#dark-Mode-toggle i'); 
// List of predefined time zones
let ListOfTimeZones = [
  'Europe/Andorra',
  'Asia/Dubai',
  'Asia/Kabul',
  'Europe/Tirane',
  'Asia/Yerevan',
  'Antarctica/Casey',
  'Antarctica/Davis',
  'Australia/Eucla',
  'Antarctica/DumontDUrville',
  'Antarctica/Mawson',
  'GMT',  // Adding GMT to the timezone list
];

// Function to populate the timezone dropdown with options
const populateTimeZones = () => {
  // Loop through the list of timezones and create option elements
  ListOfTimeZones.forEach(tz => {
    const option = document.createElement('option');
    option.value = tz;
    option.textContent = tz;
    // Add each option to the dropdown
    timezoneSelect.appendChild(option); 
  });

  // Initialize the select2 dropdown with a maximum of 2 selections
  // Initialize select2 dropdown with a maximum of 2 selections
  $('.timezone-select').select2({
    // Limit the selection to 2 items
    maximumSelectionLength: 2, 
    // Optional: add additional configurations here if needed
    // Adjust dropdown width based on content
    dropdownAutoWidth: true, 
    // Make the dropdown width adjust automatically
    width: 'auto', 
    // Optional placeholder for the dropdown
    placeholder: 'Select Timezone', 
  });
   // Focus on the dropdown when the page loads or when necessary
  $(timezoneSelect).focus();
};

// Function to update a single clock's time, date, and GMT offset
const updateClockTime = (timezone, format, timeDisplay, dateDisplay, gmtDisplay) => {
  // Get the current time in the specified timezone using moment.js
  const now = moment.tz(timezone);
  // Format the time based on 24-hour or 12-hour format
  const timeFormat = format === '24-hour' ? 'HH:mm:ss' : 'hh:mm:ss A';
  const time = now.format(timeFormat);
  // Date in the format: Day, Month Date Year
  const date = now.format('dddd, MMMM Do YYYY'); 
  // Get the GMT offset (e.g., GMT +02:00)
  const gmtOffset = 'GMT ' + now.format('Z'); 

  // Update the respective clock displays
  timeDisplay.textContent = time;
  dateDisplay.textContent = date;
  gmtDisplay.textContent = gmtOffset;
};

// Function to update all clocks
const updateClocks = () => {
  // Get clocks from local storage, or initialize an empty array if not found
  const clocks = JSON.parse(localStorage.getItem('clocks')) || [];
  // Clear the clock container
  clockContainer.innerHTML = ''; 

  // Loop through all the clocks and create clock cards
  clocks.forEach(({ timezone, format = '24-hour' }, index) => {
    const clockCard = document.createElement('div');
    // Add clock card class
    clockCard.classList.add('clock-card'); 

    // Create clock header showing the timezone
    const header = document.createElement('div');
    header.classList.add('clock-header');
    header.textContent = timezone;

    // Create time, date, and GMT display elements
    const timeDisplay = document.createElement('div');
    timeDisplay.classList.add('clock-time');
    const dateDisplay = document.createElement('div');
    dateDisplay.classList.add('clock-date');
    const gmtDisplay = document.createElement('div');
    gmtDisplay.classList.add('clock-gmt');

    // Create buttons to delete or toggle time format
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.textContent = 'Delete';

    const toggleFormatBtn = document.createElement('button');
    toggleFormatBtn.classList.add('toggle-format-btn');
    toggleFormatBtn.textContent =
      format === '24-hour' ? 'Switch to 12-hour' : 'Switch to 24-hour';

    // Toggle time format on button click
    toggleFormatBtn.addEventListener('click', () => {
      clocks[index].format =
        clocks[index].format === '24-hour' ? '12-hour' : '24-hour';
        // Save the updated clocks
      localStorage.setItem('clocks', JSON.stringify(clocks)); 
      // Re-render the clocks
      updateClocks(); 
    });

    // Delete clock from the list
    deleteBtn.addEventListener('click', () => {
      // Remove clock at the current index
      clocks.splice(index, 1); 
      // Update local storage
      localStorage.setItem('clocks', JSON.stringify(clocks)); 
      // Re-render the clocks
      updateClocks(); 
    });

    // Append elements to the clock card
    clockCard.appendChild(header);
    clockCard.appendChild(timeDisplay);
    clockCard.appendChild(dateDisplay);
    clockCard.appendChild(gmtDisplay); 
    clockCard.appendChild(toggleFormatBtn);
    clockCard.appendChild(deleteBtn);

    clockContainer.appendChild(clockCard);

    // Call the update function immediately to set the initial time
    updateClockTime(timezone, format, timeDisplay, dateDisplay, gmtDisplay);

    // Set an interval to update each clock independently every second
    setInterval(() => {
      updateClockTime(timezone, format, timeDisplay, dateDisplay, gmtDisplay);
      // Update the clock display every second
    }, 1000);  
  });
};

// Add clock button functionality
addClockBtn.addEventListener('click', () => {
  // Get selected timezone
  const timezone = timezoneSelect.value; 
  const clocks = JSON.parse(localStorage.getItem('clocks')) || [];

  // Check if the selected timezone already exists in the clocks
  if (clocks.some(clock => clock.timezone === timezone)) {
    // Alert if the clock is already added
    alert('You have already added this clock.'); 
  } else {
    if (timezone) {
      // Add the clock to the list
      clocks.push({ timezone, format: '24-hour' }); 
      // Save the updated list to local storage
      localStorage.setItem('clocks', JSON.stringify(clocks)); 
      // Re-render the clocks
      updateClocks(); 
    } else {
      // Alert if no timezone is selected
      alert('Please select a time zone!'); 
    }
  }
});

// Reset all clocks
resetClockContainer.addEventListener('click', () => {
  // Clear local storage
  localStorage.clear(); 
  // Re-render the clocks
  updateClocks(); 
});

// Toggle dark mode and change the icon accordingly
const toggleDarkMode = () => {
  // Toggle dark mode class on the body
  document.body.classList.toggle('dark-mode'); 
  if (document.body.classList.contains('dark-mode')) {
    // Change icon to moon
    darkModeIcon.classList.remove('bx-sun'); 
    darkModeIcon.classList.add('bx-moon');
  } else {
    // Change icon to sun
    darkModeIcon.classList.remove('bx-moon'); 
    darkModeIcon.classList.add('bx-sun');
  }
};
// Add event listener to toggle dark mode
toggleMode.addEventListener('click', toggleDarkMode); 

// Keyboard shortcuts for various actions
document.addEventListener('keydown', event => {
  // For Command key (macOS)
  const isCommandPressed = event.metaKey; 
  // For Control key (Windows/Linux)
  const isCtrlPressed = event.ctrlKey; 
  // For Shift key
  const isShiftPressed = event.shiftKey; 
  // Get the key that was pressed
  const key = event.key.toLowerCase(); 

  // Reset clocks if Command/Ctrl + R is pressed
  if ((isCommandPressed || isCtrlPressed || isShiftPressed) && key === 'r') {
    resetClockContainer.click();
  }
  // Open the timezone dropdown if Shift + S is pressed
  else if ((isCommandPressed || isCtrlPressed || isShiftPressed) && key === 's') {
    $(timezoneSelect).select2('open');
  }
  // Add a clock if Enter is pressed
  else if (key === 'enter') {
    addClockBtn.click();
    $(timezoneSelect).select2('close');
  }
  // Toggle dark mode if Command/Ctrl + M is pressed
  else if ((isCommandPressed || isCtrlPressed || isShiftPressed) && key === 'm') {
    toggleDarkMode();
  }
  // Toggle the info container if Command/Ctrl + I is pressed
  else if ((isCommandPressed || isCtrlPressed || isShiftPressed) && key === 'i') {
    $('#info-icon').click(); 
  }
});

// Hamburger menu functionality for responsive navbar
const hamburger = document.querySelector('.hamburger');
const navbarContent = document.querySelector('.navbar-content');

hamburger.addEventListener('click', () => {
    navbarContent.classList.toggle('collapsed');
    navbarContent.classList.toggle('expanded');
});

// Info button toggle functionality (using jQuery)
$(document).ready(function () {
    // Toggle the info container when the info button is clicked
    $('#info-icon').click(function () {
        $('#info-container').toggleClass('show');
    });

    // Close info container when clicking anywhere outside of it
    $(document).click(function (e) {
        if (!$(e.target).closest('#info-container, #info-icon').length) {
            $('#info-container').removeClass('show');
        }
    });
});

// Initialize dropdown and clocks on page load
populateTimeZones();
updateClocks();
