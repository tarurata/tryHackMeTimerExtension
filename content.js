function makeDraggable(element) {
    let isDragging = false;
    let offsetX, offsetY;

    element.onmousedown = function(e) {
        isDragging = true;
        offsetX = e.clientX - element.getBoundingClientRect().left;
        offsetY = e.clientY - element.getBoundingClientRect().top;

        document.onmousemove = function(e) {
            if (isDragging) {
                element.style.left = e.clientX - offsetX + 'px';
                element.style.top = e.clientY - offsetY + 'px';
            }
        };

        document.onmouseup = function() {
            isDragging = false;
            document.onmousemove = null;
            document.onmouseup = null;
        };
    };

    element.ontouchstart = function(e) {
        isDragging = true;
        offsetX = e.touches[0].clientX - element.getBoundingClientRect().left;
        offsetY = e.touches[0].clientY - element.getBoundingClientRect().top;

        document.ontouchmove = function(e) {
            if (isDragging) {
                element.style.left = e.touches[0].clientX - offsetX + 'px';
                element.style.top = e.touches[0].clientY - offsetY + 'px';
            }
        };

        document.ontouchend = function() {
            isDragging = false;
            document.ontouchmove = null;
            document.ontouchend = null;
        };
    };
}

function startCountdown(label) {
    let countdown = 5 * 60; // 5 minutes in seconds
    const timerElement = document.getElementById('timer');
    timerElement.innerText = `${label}: 05:00`;

    clearInterval(window.countdownInterval); // Clear any existing interval
    window.countdownInterval = setInterval(() => {
        countdown--;
        const minutes = Math.floor(countdown / 60);
        const seconds = countdown % 60;
        timerElement.innerText = `${label}: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        if (countdown <= 0) {
            clearInterval(window.countdownInterval);
            alert("It's already 5 minutes over.");
        }
    }, 1000); // Update every second
}

function checkForString() {
    const targetString = "Woop woop! Your answer is correct";
    if (document.body.innerText.includes(targetString)) {
        console.log("Target string found! Starting the countdown.");
        startCountdown('Answer Countdown');
    }
    setTimeout(checkForString, 1000); // Check every second
}

// Function to create the timer panel with a "Start Timer Again" button
function createTimerPanel() {
    const panel = document.createElement('div');
    panel.id = 'timerPanel';
    panel.style.position = 'fixed';
    panel.style.top = '10px';
    panel.style.left = '10px'; // Start from the left side
    panel.style.backgroundColor = 'darkblue';
    panel.style.color = 'white';
    panel.style.padding = '10px';
    panel.style.borderRadius = '5px';
    panel.style.fontSize = '20px';
    panel.style.zIndex = '1000';
    panel.style.cursor = 'move';
    panel.style.width = 'auto'; // Ensure the panel does not stretch

    const timerElement = document.createElement('div');
    timerElement.id = 'timer';
    timerElement.style.marginBottom = '10px';
    panel.appendChild(timerElement);

    const startButton = document.createElement('button');
    startButton.id = 'startButton';
    startButton.innerText = 'Start Timer Again';
    startButton.style.padding = '10px';
    startButton.style.backgroundColor = 'white';
    startButton.style.color = 'darkblue';
    startButton.style.border = 'none';
    startButton.style.borderRadius = '5px';
    startButton.style.fontSize = '16px';
    startButton.style.cursor = 'pointer';
    startButton.onclick = () => {
        startCountdown('Manual Countdown');
    };
    panel.appendChild(startButton);

    document.body.appendChild(panel);
    makeDraggable(panel);
}

createTimerPanel();
startCountdown('Initial Countdown');

// Start checking for the specific string on the web page
checkForString();
