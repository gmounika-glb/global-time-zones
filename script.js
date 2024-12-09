// Elements from the DOM
const timezoneSelect = document.getElementById('timezone-select');
const addClockBtn = document.getElementById('add-clock');
const clockContainer = document.getElementById('clock-container');
const resetClockContainer = document.getElementById('reset');
const toggleMode = document.getElementById('dark-Mode-toggle');
const darkModeIcon = document.querySelector('#dark-Mode-toggle i');

// Function to populate the timezone dropdown dynamically using moment-timezone
const populateTimeZones = () => {
  // Get all time zone names from moment-timezone
  const timezones = moment.tz.names();

  // Loop through the timezones and create dropdown options
  timezones.forEach(tz => {
    const option = document.createElement('option');
    option.value = tz;
    option.textContent = tz;
    timezoneSelect.appendChild(option);
  });

  // Initialize the select2 dropdown
  $('.timezone-select').select2({
    maximumSelectionLength: 2,
    dropdownAutoWidth: true,
    width: 'auto',
    placeholder: 'Select Timezone',
  });
  $(timezoneSelect).focus();
};

// Function to update a single clock's time, date, and GMT offset
const updateClockTime = (
  timezone,
  format,
  timeDisplay,
  dateDisplay,
  gmtDisplay
) => {
  const now = moment.tz(timezone);
  const timeFormat = format === '24-hour' ? 'HH:mm:ss' : 'hh:mm:ss A';
  const time = now.format(timeFormat);
  const date = now.format('dddd, MMMM Do YYYY');
  const gmtOffset = 'GMT ' + now.format('Z');

  timeDisplay.textContent = time;
  dateDisplay.textContent = date;
  gmtDisplay.textContent = gmtOffset;
};

// Function to update all clocks
const updateClocks = () => {
  const clocks = JSON.parse(localStorage.getItem('clocks')) || [];
  clockContainer.innerHTML = '';

  clocks.forEach(({timezone, format = '24-hour'}, index) => {
    const clockCard = document.createElement('div');
    clockCard.classList.add('clock-card');
    // Important for drag-and-drop tracking
    clockCard.setAttribute('data-index', index);

    if (format === '12-hour') {
      clockCard.classList.add('ampm-theme');
    }
    const header = document.createElement('div');
    header.classList.add('clock-header');
    header.textContent = timezone;

    const timeDisplay = document.createElement('div');
    timeDisplay.classList.add('clock-time');
    const dateDisplay = document.createElement('div');
    dateDisplay.classList.add('clock-date');
    const gmtDisplay = document.createElement('div');
    gmtDisplay.classList.add('clock-gmt');

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.textContent = 'Delete';

    const toggleFormatBtn = document.createElement('button');
    toggleFormatBtn.classList.add('toggle-format-btn');
    toggleFormatBtn.textContent =
      format === '24-hour' ? 'Switch to 12-hour' : 'Switch to 24-hour';

    toggleFormatBtn.addEventListener('click', () => {
      clocks[index].format =
        clocks[index].format === '24-hour' ? '12-hour' : '24-hour';
      localStorage.setItem('clocks', JSON.stringify(clocks));

      if (clocks[index].format === '12-hour') {
        clockCard.classList.add('ampm-theme');
      } else {
        clockCard.classList.remove('ampm-theme');
      }
      updateClocks();
    });

    deleteBtn.addEventListener('click', () => {
      clocks.splice(index, 1);
      localStorage.setItem('clocks', JSON.stringify(clocks));
      updateClocks();
    });
    clockCard.appendChild(header);
    clockCard.appendChild(timeDisplay);
    clockCard.appendChild(dateDisplay);
    clockCard.appendChild(gmtDisplay);
    clockCard.appendChild(toggleFormatBtn);
    clockCard.appendChild(deleteBtn);
    clockContainer.appendChild(clockCard);

    updateClockTime(timezone, format, timeDisplay, dateDisplay, gmtDisplay);
    setInterval(() => {
      updateClockTime(timezone, format, timeDisplay, dateDisplay, gmtDisplay);
    }, 1000);
  });
  initializeSortable();
};

addClockBtn.addEventListener('click', () => {
  const timezone = timezoneSelect.value;
  const clocks = JSON.parse(localStorage.getItem('clocks')) || [];

  if (clocks.some(clock => clock.timezone === timezone)) {
    showCustomAlert('You have already added this clock.');
  } else {
    if (timezone) {
      clocks.unshift({timezone, format: '24-hour'});
      localStorage.setItem('clocks', JSON.stringify(clocks));
      updateClocks();
    } else {
      alert('Please select a time zone!');
    }
  }
});

resetClockContainer.addEventListener('click', () => {
  localStorage.clear();
  updateClocks();
});

const toggleDarkMode = () => {
  document.body.classList.toggle('dark-mode');
  if (document.body.classList.contains('dark-mode')) {
    darkModeIcon.classList.remove('bx-sun');
    darkModeIcon.classList.add('bx-moon');
  } else {
    darkModeIcon.classList.remove('bx-moon');
    darkModeIcon.classList.add('bx-sun');
  }
};

toggleMode.addEventListener('click', toggleDarkMode);
// keyboard events
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
  } else if (
    (isCommandPressed || isCtrlPressed || isShiftPressed) &&
    key === 'x'
  ) {
    $(timezoneSelect).select2('open');
  } else if (key === 'enter') {
    addClockBtn.click();
    $(timezoneSelect).select2('close');
  } else if (
    (isCommandPressed || isCtrlPressed || isShiftPressed) &&
    key === 'm'
  ) {
    toggleDarkMode();
  } else if (
    (isCommandPressed || isCtrlPressed || isShiftPressed) &&
    key === 'i'
  ) {
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

// Function to show a custom alert
const showCustomAlert = message => {
  const alertContainer = document.createElement('div');
  alertContainer.classList.add('custom-alert');

  const alertIcon = document.createElement('i');
  alertIcon.classList.add('bx', 'bx-info-circle', 'alert-icon');

  const alertMessage = document.createElement('div');
  alertMessage.classList.add('alert-message');
  alertMessage.textContent = message;

  const closeButton = document.createElement('button');
  closeButton.classList.add('close-alert');
  closeButton.innerHTML = '&times;';
  closeButton.addEventListener('click', () => {
    alertContainer.remove(); // Remove the alert on close
  });

  alertContainer.appendChild(alertIcon);
  alertContainer.appendChild(alertMessage);
  alertContainer.appendChild(closeButton);

  document.body.appendChild(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, 3000);
};

// Function to initialize SortableJS
const initializeSortable = () => {
  new Sortable(clockContainer, {
    animation: 150,
    onEnd: evt => {
      const reorderedClocks = Array.from(clockContainer.children).map(child => {
        const index = child.getAttribute('data-index');
        return JSON.parse(localStorage.getItem('clocks'))[index];
      });
      localStorage.setItem('clocks', JSON.stringify(reorderedClocks));
    },
  });
};

// Info button toggle functionality (using jQuery)
$(document).ready(function () {
  $('#info-icon').click(function () {
    $('#info-container').toggleClass('show');
    if ($('#info-container').hasClass('show')) {
      setTimeout(() => {
        $('#clock-container').addClass('blur');
      });
    } else {
      $('#clock-container').removeClass('blur');
    }
  });

  $(document).click(function (e) {
    if (!$(e.target).closest('#info-container, #info-icon').length) {
      $('#info-container').removeClass('show');
      $('#clock-container').removeClass('blur');
    }
  });
});
populateTimeZones();
updateClocks();
