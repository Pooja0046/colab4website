const videos = [
    'assets/videos/VFX Edit Ball Kick.mp4',
    'assets/videos/VFX Edit Chatham Door.mp4',
    'assets/videos/VFX Edit Grosvenor East.mp4',
    'assets/videos/VFX Edit SODA Stairwell.mp4' 
  ];
  
  const overlayMessages = {
    0: [{ time: 8, text: "Did you see that?" }],
    1: [{ time: 11, text: "Something feels off..." }, { time: 18, text: "Look again." }],
    2: [{ time: 2, text: "No way that's normal." }, { time: 4, text: "Did you notice?" }, { time: 7, text: "Rewind if you missed it." }],
    3: [{ time: 12, text: "Getting weirder..." }, { time: 18, text: "Focus here." }, { time: 24, text: "Seriously?" }]
  };
  
  let currentVideo = 0;
  const screen = document.getElementById('screen');
  const playButton = document.getElementById('play');
  const nextButton = document.getElementById('next');
  const prevButton = document.getElementById('prev');
  
  let videoElement;
  let timeoutIds = [];
  
  // Create video element once
  function createVideoElement() {
    videoElement = document.createElement('video');
    videoElement.classList.add('video-overlay');
    videoElement.muted = true; // allow autoplay
    videoElement.controls = false;
    videoElement.style.width = '100%';
    videoElement.style.height = '100%';
    videoElement.style.display = 'none';
    videoElement.style.position = 'absolute';
    videoElement.style.top = '0';
    videoElement.style.left = '0';
    screen.appendChild(videoElement);
  }
  
  createVideoElement();
  
  function loadVideo(index) {
    videoElement.src = videos[index];
    videoElement.load();
    console.log(`Loaded video: ${videos[index]}`);
  }
  
  function playVideo() {
    clearMessages(); // clear old overlays
    videoElement.style.display = 'block';
    screen.style.backgroundColor = 'black';
    videoElement.play().then(() => {
      console.log('Playback started');
      scheduleMessages(currentVideo);
    }).catch(err => {
      console.log('Playback error:', err);
    });
  }
  
  function scheduleMessages(videoIndex) {
    const messages = overlayMessages[videoIndex] || [];
    messages.forEach(msg => {
      const timeoutId = setTimeout(() => showOverlayMessage(msg.text), msg.time * 1000);
      timeoutIds.push(timeoutId);
    });
  }
  
  function showOverlayMessage(text) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('overlay-message');
    messageDiv.textContent = text;
    screen.appendChild(messageDiv);
  
    setTimeout(() => {
      messageDiv.remove();
    }, 3000); // message disappears after 3 seconds
  }
  
  function clearMessages() {
    timeoutIds.forEach(id => clearTimeout(id));
    timeoutIds = [];
    const oldMessages = screen.querySelectorAll('.overlay-message');
    oldMessages.forEach(m => m.remove());
  }
  
  playButton.addEventListener('click', () => {
    console.log('Play clicked');
    loadVideo(currentVideo);
    playVideo();
  });
  
  nextButton.addEventListener('click', () => {
    currentVideo = (currentVideo + 1) % videos.length;
    loadVideo(currentVideo);
    playVideo();
  });
  
  prevButton.addEventListener('click', () => {
    currentVideo = (currentVideo - 1 + videos.length) % videos.length;
    loadVideo(currentVideo);
    playVideo();
  });
  



