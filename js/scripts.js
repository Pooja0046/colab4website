const screen = document.getElementById('screen');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');

// Dummy frames (could later be videos/images/text)
const frames = [
    "Welcome to the Glitchy TV Experience",
    "Documenting Reality... Please Wait...",
    "Glitch Detected. Stay Tuned.",
    "Truth Behind the Simulation...",
    "End of Transmission."
];

let currentFrame = 0;

function showFrame(index) {
    screen.innerHTML = `<p>${frames[index]}</p>`;
}

// Button Handlers
playBtn.addEventListener('click', () => {
    showFrame(currentFrame);
});

nextBtn.addEventListener('click', () => {
    currentFrame = (currentFrame + 1) % frames.length;
    showFrame(currentFrame);
});

prevBtn.addEventListener('click', () => {
    currentFrame = (currentFrame - 1 + frames.length) % frames.length;
    showFrame(currentFrame);
});

