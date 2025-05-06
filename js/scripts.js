const videos = [
    'assets/videos/VFX Edit Ball Kick.mp4',
    'assets/videos/VFX Edit Chatham Door.mp4',
    'assets/videos/VFX Edit Grosvenor East.mp4',
    'assets/videos/VFX Edit SODA Stairwell.mp4'
];

const overlayMessages = [
    { time: 8, message: "HE'S WATCHING", extra: [] }, // Video 1
    { time: 11, message: "DID YOU SEE THAT?", extra: [18] }, // Video 2
    { time: 2, message: "GET OUT", extra: [4,7] }, // Video 3
    { time: 18, message: "YOU SHOULDN'T BE HERE", extra: [12,24] } // Video 4
];

const screen = document.getElementById('screen');
const playButton = document.getElementById('play');
const nextButton = document.getElementById('next');
const prevButton = document.getElementById('prev');

let currentVideoIndex = 0;
let videoElement = null;
let typingInterval = null;

// Create persistent glitch overlay
const persistentGlitch = document.createElement('div');
persistentGlitch.classList.add('persistent-glitch-overlay');
persistentGlitch.style.position = 'absolute';
persistentGlitch.style.top = '0';
persistentGlitch.style.left = '0';
persistentGlitch.style.width = '100%';
persistentGlitch.style.height = '100%';
persistentGlitch.style.pointerEvents = 'none';
persistentGlitch.style.backgroundImage = 'url("assets/images/glitch.jpg")'; // Use your glitch image path
persistentGlitch.style.backgroundSize = 'cover';
persistentGlitch.style.opacity = '0';
persistentGlitch.style.mixBlendMode = 'screen'; // or 'overlay' depending on effect
screen.appendChild(persistentGlitch);

function createVideoElement(src) {
    const video = document.createElement('video');
    video.src = src;
    video.autoplay = true;
    video.muted = true;
    video.classList.add('tv-video');
    video.style.width = '100%';
    video.style.height = '100%';
    video.style.objectFit = 'cover';
    return video;
}

function showOverlayMessage(message) {
    const overlay = document.createElement('div');
    overlay.classList.add('overlay-message');
    overlay.textContent = message;
    screen.appendChild(overlay);

    const glitchOverlay = document.createElement('div');
    glitchOverlay.classList.add('glitch-overlay');
    glitchOverlay.style.position = 'absolute';
    glitchOverlay.style.top = '0';
    glitchOverlay.style.left = '0';
    glitchOverlay.style.width = '100%';
    glitchOverlay.style.height = '100%';
    glitchOverlay.style.pointerEvents = 'none';
    glitchOverlay.style.backgroundImage = 'url("assets/images/glitch.jpg")'; // Same glitch image
    glitchOverlay.style.backgroundSize = 'cover';
    glitchOverlay.style.opacity = '0.3';
    glitchOverlay.style.mixBlendMode = 'screen';
    screen.appendChild(glitchOverlay);

    setTimeout(() => {
        if (screen.contains(overlay)) screen.removeChild(overlay);
        if (screen.contains(glitchOverlay)) screen.removeChild(glitchOverlay);
    }, 3000);
}

function playVideo(index) {
    if (videoElement) {
        videoElement.pause();
        screen.removeChild(videoElement);
    }
    clearInterval(typingInterval);
    screen.textContent = ''; // clear messages (but keep persistentGlitch)
    screen.appendChild(persistentGlitch);

    videoElement = createVideoElement(videos[index]);
    screen.appendChild(videoElement);
    screen.appendChild(persistentGlitch); // bring overlay back on top

    // Adjust glitch overlay intensity (opacity increases with each video)
    let glitchIntensity = 0.1 + (index * 0.2);
    if (glitchIntensity > 1) glitchIntensity = 1;
    persistentGlitch.style.opacity = glitchIntensity.toString();

    const overlay = overlayMessages[index];
    const shownTimes = new Set();

    videoElement.addEventListener('timeupdate', () => {
        const currentTime = Math.floor(videoElement.currentTime);
        [overlay.time, ...(overlay.extra || [])].forEach(triggerTime => {
            if (currentTime === triggerTime && !shownTimes.has(triggerTime)) {
                showOverlayMessage(overlay.message);
                shownTimes.add(triggerTime);
            }
        });
    });

    videoElement.onended = () => {
        showOverlayMessage("NEXT VIDEO LOADING...");
        setTimeout(() => {
            playButton.textContent = 'Play';
            if (index < videos.length - 1) {
                currentVideoIndex++;
                playVideo(currentVideoIndex);
            } else {
                typeEndMessage();
            }
        }, 3000);
    };

    playButton.textContent = 'Pause';
    videoElement.play();
}

function typeEndMessage() {
    let message = "They were all watching.";
    let i = 0;
    screen.textContent = '';
    screen.appendChild(persistentGlitch);
    typingInterval = setInterval(() => {
        screen.textContent += message.charAt(i);
        i++;
        if (i >= message.length) clearInterval(typingInterval);
    }, 100);
}

playButton.addEventListener('click', () => {
    if (!videoElement) {
        playVideo(currentVideoIndex);
    } else if (videoElement.paused) {
        videoElement.play();
        playButton.textContent = 'Pause';
    } else {
        videoElement.pause();
        playButton.textContent = 'Play';
    }
});

nextButton.addEventListener('click', () => {
    if (currentVideoIndex < videos.length - 1) {
        currentVideoIndex++;
        playVideo(currentVideoIndex);
    }
});

prevButton.addEventListener('click', () => {
    if (currentVideoIndex > 0) {
        currentVideoIndex--;
        playVideo(currentVideoIndex);
    }
});






  
  



