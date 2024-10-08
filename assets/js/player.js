const audioPlayer = document.getElementById('audio');
const playPauseBtn = document.getElementById('play-pause');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const footer = document.getElementById('footer');
const seekBar = document.getElementById('seek-bar');

const defaultFooterText = '〤 CutNation 〤';

const tracks = [
    { title: "Nardo Wick - Excuse My French", path: "assets/music/ExcuseMyFrench.mp3" },
    { title: "Yeat - On tha line", path: "assets/music/OnThaLine.mp3" },
    { title: "Biggie Smalls - Foe The Love Of Money", path: "assets/music/FoeThaLoveOfMoney.mp3" },
    { title: "Yeat - Cali", path: "assets/music/Cali.mp3" },
];

let currentTrack = 0;
audioPlayer.volume = 0.10;
let isDragging = false;

function shuffleTracks() {
    for (let i = tracks.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tracks[i], tracks[j]] = [tracks[j], tracks[i]];
    }
}

function loadTrack(index, animationClass) {
    currentTrack = index;
    audioPlayer.src = tracks[currentTrack].path;
    footer.textContent = `〤 ${tracks[currentTrack].title} 〤`;

    // Apply animation
    footer.classList.remove('slide-in-right', 'slide-in-left');
    void footer.offsetWidth;
    footer.classList.add(animationClass);
}

function loadRandomTrack() {
    shuffleTracks();
    loadTrack(0, 'slide-in-right');
}

function showDefaultFooter(animationClass) {
    footer.textContent = defaultFooterText;

    // Apply animation
    footer.classList.remove('slide-in-right', 'slide-in-left');
    void footer.offsetWidth;
    footer.classList.add(animationClass);
}

playPauseBtn.addEventListener('click', () => {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playPauseBtn.innerHTML = '<i class="icon fa-solid fa-pause"></i>';
        footer.textContent = `ʚ ${tracks[currentTrack].title} ɞ`;
        footer.classList.remove('slide-in-right', 'slide-in-left');
        void footer.offsetWidth;
        footer.classList.add('slide-in-right');
    } else {
        audioPlayer.pause();
        playPauseBtn.innerHTML = '<i class="icon fa-solid fa-play"></i>';
        showDefaultFooter('slide-in-right');
    }
});

function playNextTrack() {
    const nextTrack = (currentTrack + 1) % tracks.length;
    loadTrack(nextTrack, 'slide-in-right');
    audioPlayer.play();
    playPauseBtn.innerHTML = '<i class="icon fa-solid fa-pause"></i>';
}

nextBtn.addEventListener('click', playNextTrack);

prevBtn.addEventListener('click', () => {
    const prevTrack = (currentTrack - 1 + tracks.length) % tracks.length;
    loadTrack(prevTrack, 'slide-in-left');
    audioPlayer.play();
    playPauseBtn.innerHTML = '<i class="icon fa-solid fa-pause"></i>';
});

function updateSeekBar() {
    if (!isDragging) {
        seekBar.value = (audioPlayer.currentTime / audioPlayer.duration) * 100 || 0;
    }
}

seekBar.addEventListener('input', () => {
    isDragging = true;
    audioPlayer.currentTime = (seekBar.value / 100) * audioPlayer.duration;
});

seekBar.addEventListener('change', () => {
    isDragging = false;
});

audioPlayer.addEventListener('timeupdate', updateSeekBar);

audioPlayer.addEventListener('ended', playNextTrack);

window.addEventListener('load', () => showDefaultFooter('slide-in-right'));

loadRandomTrack();
