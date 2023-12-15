const hours = document.querySelector("#hours");
const startCustomTimerButton = document.querySelector(
  "#startCustomTimerButton"
);

function startCustomTimer() {
  // Get the selected values from the dropdowns
  const selectedHours = document.querySelector("#hours").value;
  const selectedMinutes = document.querySelector("#minutes").value * 5;
  console.log(selectedHours);
  console.log(selectedMinutes);
  // Convert hours and minutes to seconds
  const durationInSeconds = selectedHours * 3600 + selectedMinutes * 60;

  // Start the custom timer
  startTimer(durationInSeconds);
}

startCustomTimerButton.addEventListener("click", startCustomTimer);

const optionsHTML = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  .map(
    (e) => `
  <option key="${e}" value="${e}">
    ${e.toString().padStart(2, "0")}
  </option>
`
  )
  .join("");

hours.insertAdjacentHTML("afterbegin", optionsHTML);

const minutes = document.querySelector("#minutes");

const minutesOptionsHTML = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  .map(
    (e) => `
  <option key="${e}" value="${e}">
    ${e * (5).toString().padStart(2, "0")}
  </option>
`
  )
  .join("");

minutes.insertAdjacentHTML("afterbegin", minutesOptionsHTML);

const timer = document.querySelector("#timer");
const clock = document.querySelector("#clock");
let currentTimerId; // Store the current timer ID

function updateClock() {
  const getTime = new Date();
  let hours =
    getTime.getHours() >= 10 ? getTime.getHours() : getTime.getHours();
  let minutes =
    getTime.getMinutes() >= 10
      ? getTime.getMinutes()
      : "0" + getTime.getMinutes();
  let seconds =
    getTime.getSeconds() >= 10
      ? getTime.getSeconds()
      : "0" + getTime.getSeconds();
  let formatHours = hours > 12 ? hours - 12 : hours;
  formatHours = formatHours >= 10 ? formatHours : "0" + formatHours;
  let isAM_PM = hours > 12 ? "PM" : "AM";
  let timeInMinutesAndSeconds =
    formatHours + `:` + minutes + `:` + seconds + ` ` + isAM_PM;

  // Update the content of the #clock element
  clock.innerHTML = `<span>${timeInMinutesAndSeconds}</span>`;
}

// Initial call to update the clock
updateClock();

setInterval(updateClock, 1000);

// timer
function startTimer(durationInSeconds) {
  // Clear the previous timer content
  timer.innerHTML = "";

  let timeRemaining = durationInSeconds;

  function updateTimer() {
    const hr =
      Math.floor(timeRemaining / 3600) > 9
        ? Math.floor(timeRemaining / 3600)
        : "0" + Math.floor(timeRemaining / 3600);

    let minutes = Math.floor((timeRemaining % 3600) / 60);
    const seconds =
      timeRemaining % 60 < 10 ? "0" + (timeRemaining % 60) : timeRemaining % 60;

    timer.innerHTML = timeRemaining
      ? `<span>${hr}:${
          minutes < 10 ? `0${minutes}` : minutes
        }:${seconds}</span>`
      : `<span>Select a timer</span>`;

    if (timeRemaining > 0) {
      timeRemaining--;
      currentTimerId = setTimeout(updateTimer, 1000);
    } else {
      playAlarm();
    }
  }

  // Clear the previous timer if it exists
  if (currentTimerId) {
    clearTimeout(currentTimerId);
  }

  updateTimer();
}

startTimer();

function playAlarm() {
  const alarm = new Audio("alarm.mp3");
  alarm.play();
}
