# About Time Zone App
A simple Time Zone App to display and manage clocks for various time zones. The app allows users to add multiple clocks, toggle between 12-hour and 24-hour formats, and switch between dark and light modes. Clocks and preferences are stored using localStorage, so they persist even after a page reload.

## Purpose:
The **Time Zone App** was designed to help users track time across multiple time zones. Whether you are working with international teams or just want to know what time it is in other parts of the world, this app makes it easy to add, remove, and manage clocks for various time zones.

### Features:
- **Multiple Clocks**: Add as many clocks as needed for different time zones.
- **Time Format**: Easily switch between 12-hour and 24-hour formats for all clocks.
- **Dark Mode**: A dark mode toggle for users who prefer a darker theme for the app interface.
- **Keyboard Shortcuts**: Add clocks, reset, and open the timezone dropdown with keyboard shortcuts for faster access.
- **Persistent Data**: All added clocks and preferences are saved in `localStorage`, ensuring that they persist even after the browser is refreshed.

### Technologies Used:
- **HTML/CSS**: To structure and style the app.
- **JavaScript**: To manage the functionality, including adding clocks, formatting time, and handling dark mode.
- **Select2**: A jQuery-based plugin to enhance the dropdown selection of time zones.
- **LocalStorage**: For storing clocks and user preferences.

### How It Works:
1. The user selects a time zone from the dropdown.
2. When the user clicks **"Add Clock"**, the app adds a clock showing the time for that selected time zone.
3. Users can toggle between 12-hour and 24-hour formats for each clock and switch to dark mode using the toggle.
4. The app saves all clocks and preferences in `localStorage` so that they remain available even after reloading the page.
