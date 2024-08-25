const overlay = document.getElementById('overlay');
const messageEl = document.getElementById('message');
const timerEl = document.getElementById('timer');
const closeButton = document.getElementById('closeButton');
const appList = document.getElementById('appList');

const messages = [
    "That's enough for today.",
    "I said enough!",
    "Seriously, it's time to take a break.",
    "You're pushing it. Let's call it a day.",
    "Okay, this is getting ridiculous. STOP!"
];

let currentLevel = 0;
let intervalId;
let apps = [
    { name: "YouTube", timeLimit: 30 },
    { name: "Social Media", timeLimit: 45 },
    { name: "Games", timeLimit: 60 }
];

function renderAppList() {
    appList.innerHTML = '';
    apps.forEach((app, index) => {
        const li = document.createElement('li');
        li.className = 'app-item';
        li.innerHTML = `
            ${app.name}
            <input type="number" value="${app.timeLimit}" onchange="updateTimeLimit(${index}, this.value)"> minutes
            <button onclick="removeApp(${index})">Remove</button>
        `;
        appList.appendChild(li);
    });
}

function addNewApp() {
    const name = prompt("Enter app name:");
    const timeLimit = parseInt(prompt("Enter time limit (in minutes):"));
    if (name && !isNaN(timeLimit)) {
        apps.push({ name, timeLimit });
        renderAppList();
    }
}

function updateTimeLimit(index, newLimit) {
    apps[index].timeLimit = parseInt(newLimit);
}

function removeApp(index) {
    apps.splice(index, 1);
    renderAppList();
}

function showOverlay() {
    overlay.style.display = 'flex';
    messageEl.textContent = messages[currentLevel % messages.length];
    startTimer((currentLevel + 1) * 10);
}

function startTimer(duration) {
    let timeLeft = duration;
    timerEl.textContent = timeLeft;

    intervalId = setInterval(() => {
        timeLeft--;
        timerEl.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(intervalId);
            hideOverlay();
        }
    }, 1000);
}

function hideOverlay() {
    overlay.style.display = 'none';
    currentLevel++;
}

closeButton.addEventListener('click', () => {
    clearInterval(intervalId);
    hideOverlay();
});

function createGoldParticles() {
    const background = document.getElementById('background');
    const particleCount = 200; // Increased number of particles

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('gold-particle');
        
        const size = Math.random() * 3 + 1; // Smaller size range
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * 100}vh`;
        
        // Randomize animation duration and delay for smoother overall effect
        const duration = Math.random() * 10 + 15; // 15-25 seconds
        const delay = Math.random() * -25; // Negative delay for a smoother start
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        
        background.appendChild(particle);
    }
}

renderAppList();
createGoldParticles();

setInterval(() => {
    showOverlay();
}, 60000);
