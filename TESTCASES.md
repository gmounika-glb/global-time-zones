# Test Cases for Digital Time Zone Application

## 1. Add Clock Functionality

### Test Case 1.1: Add a clock with a unique timezone
- Description: Ensure a clock is added when a valid timezone is selected.
- Steps:
  1. Select a timezone from the dropdown.
  2. Click the "Add Clock" button.
- Expected Result: The clock for the selected timezone is added.

---

### Test Case 1.2: Add a duplicate timezone clock
- Description: Ensure the application prevents adding duplicate timezones.
- Steps:
  1. Select a timezone that has already been added.
  2. Click the "Add Clock" button.
- Expected Result: An alert is displayed: "You have already added this clock."

---

### Test Case 1.3: Add a clock without selecting a timezone
- Description: Ensure a clock is not added if no timezone is selected.
- Steps:
  1. Without selecting any timezone, click the "Add Clock" button.
- Expected Result: An alert is displayed: "Please select a time zone!"

---

## 2. Reset Clock Functionality

### Test Case 2.1: Reset all clocks
- Description: Ensure all clocks are removed when the reset button is clicked.
- Steps:
  1. Add multiple clocks.
  2. Click the "Reset" button.
- Expected Result: All clocks are removed from the screen, and localStorage is cleared.

---

## 3. Dark Mode Toggle

### Test Case 3.1: Toggle dark mode on
- Description: Enable dark mode.
- Steps:
  1. Click the "Dark Mode" button.
- Expected Result: The background changes to dark mode, and the icon switches to the moon.

---

### Test Case 3.2: Toggle dark mode off
- Description: Disable dark mode.
- Steps:
  1. Ensure dark mode is on.
  2. Click the "Dark Mode" button.
- Expected Result: The background changes to light mode, and the icon switches to the sun.

---

## 4. Keyboard Shortcuts

### Test Case 4.1: Shortcut for resetting clocks (Ctrl/Command + Shift + R)
- Description: Verify the reset shortcut works.
- Steps:
  1. Add multiple clocks.
  2. Press Ctrl/Command + Shift + R.
- Expected Result: All clocks are removed, and localStorage is cleared.

---

### Test Case 4.2: Shortcut for opening timezone dropdown (Ctrl/Command + Shift + S)
- Description: Verify the timezone dropdown opens with the shortcut.
- Steps:
  1. Press Ctrl/Command + Shift + S.
- Expected Result: The timezone dropdown opens.

---

### Test Case 4.3: Shortcut for adding a clock (Enter)
- Description: Verify a clock is added when the Enter key is pressed.
- Steps:
  1. Select a timezone.
  2. Press Enter.
- Expected Result: The clock for the selected timezone is added.

---

### Test Case 4.4: Shortcut for toggling dark mode (Ctrl/Command + Shift + M)
- Description: Verify the dark mode can be toggled using the shortcut.
- Steps:
  1. Press Ctrl/Command + Shift + M.
- Expected Result: Dark mode toggles.

---

## 5. LocalStorage Behavior

### Test Case 5.1: Persist clocks in localStorage
- Description: Ensure added clocks persist in localStorage.
- Steps:
  1. Add multiple clocks.
  2. Refresh the browser.
- Expected Result: All previously added clocks reappear.

---

### Test Case 5.2: Clear localStorage on reset
- Description: Ensure localStorage is cleared on reset.
- Steps:
  1. Add multiple clocks.
  2. Click the "Reset" button.
  3. Refresh the browser.
- Expected Result: No clocks reappear after the refresh.

---

## 6. Miscellaneous

### Test Case 6.1: Populate timezone dropdown
- Description: Ensure the timezone dropdown is populated correctly.
- Steps:
  1. Check the dropdown options on page load.
- Expected Result: The dropdown contains valid timezone options.

---

### Test Case 6.2: Update clocks on the screen
- Description: Verify that all displayed clocks update in real-time.
- Steps:
  1. Add multiple clocks.
  2. Observe the clocks.
- Expected Result: The time, date, and milliseconds for each clock update in real-time.
