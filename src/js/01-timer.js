import flatpickr from 'flatpickr';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import 'flatpickr/dist/flatpickr.min.css';

let userSelectedDate;
let startButton = document.querySelector('[data-start]');
startButton.disabled = true;

const daysDisplay = document.querySelector('[data-days]');
const hoursDisplay = document.querySelector('[data-hours]');
const minutesDisplay = document.querySelector('[data-minutes]');
const secondsDisplay = document.querySelector('[data-seconds]');

let timerInterval;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] > Date.now()) {
      userSelectedDate = selectedDates[0];
      startButton.disabled = false;
      updateTimerDisplay(); // Call the function to display the timer when a date is selected
    } else {
      userSelectedDate = undefined;
      startButton.disabled = true;
      iziToast.error({
        message:
          '<i class="fa-regular fa-circle-xmark fa-lg"></i> Please choose a date in the future',
        position: 'topRight',
        icon: '',
      });
    }
  },
};

startButton.addEventListener('click', () => {
  if (userSelectedDate) {
    startTimer(); // Call the function to start the timer
  }
});

function updateTimerDisplay() {
  const timeDifference = userSelectedDate - Date.now();
  const { days, hours, minutes, seconds } = convertMs(timeDifference);

  if (!isNaN(days) && !isNaN(hours) && !isNaN(minutes) && !isNaN(seconds)) {
    daysDisplay.textContent = addLeadingZero(days);
    hoursDisplay.textContent = addLeadingZero(hours);
    minutesDisplay.textContent = addLeadingZero(minutes);
    secondsDisplay.textContent = addLeadingZero(seconds);
  }

  // Check if the timer has reached zero
  if (timeDifference <= 0) {
    stopTimer();
  }
}

function startTimer() {
  // Start the timer, updating the interface every second
  timerInterval = setInterval(updateTimerDisplay, 1000);
}

function stopTimer() {
  // Check if the timer has been started before calling clearInterval
  if (timerInterval) {
    // Clear the interval to stop the timer
    clearInterval(timerInterval);

    daysDisplay.textContent = '00';
    hoursDisplay.textContent = '00';
    minutesDisplay.textContent = '00';
    secondsDisplay.textContent = '00';

    // Reset the timerInterval variable
    timerInterval = null;
  }
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days, hours, minutes, and seconds
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

flatpickr('#datetime-picker', options);
