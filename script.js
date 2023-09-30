
// Reference to the "Start New Timer" button
const startTimerBtn = document.getElementById('start-timer');

startTimerBtn.addEventListener('click', () => {
    const timeInput = document.getElementById('time').value.trim();
    const [hours, minutes, seconds] = timeInput.split(':').map(Number);

    if (isValidTime(hours, minutes, seconds)) {
        const totalMilliseconds = (hours * 3600 + minutes * 60 + seconds) * 1000;
        if (totalMilliseconds > 0) {
            createTimer(totalMilliseconds);
        }
    } else {
        alert('Please enter a valid time in hh:mm:ss format.');
    }
});

function isValidTime(hours, minutes, seconds) {
    return (
        Number.isInteger(hours) &&
        Number.isInteger(minutes) &&
        Number.isInteger(seconds) &&
        hours >= 0 &&
        hours <= 23 &&
        minutes >= 0 &&
        minutes <= 59 &&
        seconds >= 0 &&
        seconds <= 59
    );
}

// Rest of your code (createTimer, updateTimerDisplay, etc.) remains the same.

// Reference to the container for active timers
const timersContainer = document.querySelector('.active-timers');



function createTimer(duration) {
    const timerElement = document.createElement('div');
    timerElement.classList.add('active-timer');

    const timerDisplay = document.createElement('div');
    timerDisplay.classList.add('timer-display');
    timerElement.appendChild(timerDisplay);

    const stopBtn = document.createElement('button');
    stopBtn.innerText = 'Stop';
    stopBtn.style.backgroundColor = 'rgb(240,247,87)';
    

    stopBtn.addEventListener('click', () => {
        clearInterval(interval);
        timerElement.remove();
    });
    timerElement.appendChild(stopBtn);

    timersContainer.appendChild(timerElement);

    let remainingTime = duration;
    updateTimerDisplay();

    const interval = setInterval(() => {
        remainingTime -= 1000;
        if (remainingTime <= 0) {
            clearInterval(interval);
            timerDisplay.textContent = 'Time is UP!'; // Display "Time Ended" when the timer expires
            timerElement.style.backgroundColor = "rgb(240,247,87)";
            timerElement.style.color ="black";
             // Change background color for completed timer
             stopBtn.style.color = 'white';//Change font color in white color for time up
             stopBtn.style.backgroundColor = 'rgb(52,52,74)'

            playAudioAlert(); // Play the audio alert when the timer expires
        } else {
            updateTimerDisplay();
        }
    }, 1000);

    function updateTimerDisplay() {
        const hours = Math.floor(remainingTime / 3600000);
        const minutes = Math.floor((remainingTime % 3600000) / 60000);
        const seconds = Math.floor((remainingTime % 60000) / 1000);
        timerDisplay.textContent = `Time Left: ${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
    }

    function formatTime(time) {
        return time < 10 ? `0${time}` : time;
    }
}

function playAudioAlert() {
    const audioAlert = document.getElementById('audio-alert');

    if (audioAlert && typeof audioAlert.play === 'function') {

        audioAlert.pause();
        audioAlert.currentTime = 0;

        audioAlert.play();
    }
}
