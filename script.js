
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
    timezones.forEach((tz) => {
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
  const updateClockTime = (timezone, format, timeDisplay, dateDisplay, gmtDisplay) => {
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

    clocks.forEach(({ timezone, format = '24-hour' }, index) => {
      const clockCard = document.createElement('div');
      clockCard.classList.add('clock-card');

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
  };

  addClockBtn.addEventListener('click', () => {
    const timezone = timezoneSelect.value;
    const clocks = JSON.parse(localStorage.getItem('clocks')) || [];

    if (clocks.some((clock) => clock.timezone === timezone)) {
      alert('You have already added this clock.');
    } else {
      if (timezone) {
        clocks.push({ timezone, format: '24-hour' });
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

  document.addEventListener('keydown', (event) => {
    const isCommandPressed = event.metaKey;
    const isCtrlPressed = event.ctrlKey;
    const isShiftPressed = event.shiftKey;
    const key = event.key.toLowerCase();

    if ((isCommandPressed || isCtrlPressed || isShiftPressed) && key === 'r') {
      resetClockContainer.click();
    } else if ((isCommandPressed || isCtrlPressed || isShiftPressed) && key === 's') {
      $(timezoneSelect).select2('open');
    } else if (key === 'enter') {
      addClockBtn.click();
      $(timezoneSelect).select2('close');
    } else if ((isCommandPressed || isCtrlPressed || isShiftPressed) && key === 'm') {
      toggleDarkMode();
    }
  });

  populateTimeZones();
  updateClocks();
