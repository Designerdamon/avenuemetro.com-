const audioPlayer = document.getElementById("audio-player");
const playPauseBtn = document.getElementById("play-pause-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const shuffleBtn = document.getElementById("shuffle-btn");
const refreshBtn = document.getElementById("refresh-btn");
const volumeSlider = document.getElementById("volume-slider");
const currentTimeDisplay = document.getElementById("current-time");
const totalTimeDisplay = document.getElementById("total-time");
const playlist = document.getElementById("playlist");
const songImage = document.getElementById("song-image");

/* 
  Because media_store.html is in the root (or another folder) 
  while 'script.js' is inside Media_Player/, 
  we need to specify "Media_Player/music/..." and 
  "Media_Player/music_images/..." for the file paths.
*/
const songs = [
    {
        title: "Snoh Aalegra -  DO 4 LOVE",
        src: "Media_Player/music/Snoh Aalegra -  DO 4 LOVE_Chopped.mp3",
        img: "Media_Player/music_images/snoh_aalegra.png"
    },
    {
        title: "Doechii - Catfish",
        src: "Media_Player/music/Doechii - Catfish.mp3",
        img: "Media_Player/music_images/Doechii.png"
    },
    {
        title: "Doechii - Bullfrog",
        src: "Media_Player/music/Doechii - Bullfrog.mp3",
        img: "Media_Player/music_images/Doechii.png"
    }
];

let currentSongIndex = 0;
let isPlaying = false;

// Populate playlist dropdown
songs.forEach((song, index) => {
    let option = document.createElement("option");
    option.value = index;
    option.textContent = song.title;
    playlist.appendChild(option);
});

// Load the first song
function loadSong(index) {
    audioPlayer.src = songs[index].src;
    songImage.src = songs[index].img;
    playlist.value = index;
    audioPlayer.load();
}

// Play or Pause Functionality
function togglePlayPause() {
    if (isPlaying) {
        audioPlayer.pause();
        playPauseBtn.textContent = "▶";
    } else {
        audioPlayer.play();
        playPauseBtn.textContent = "⏸";
    }
    isPlaying = !isPlaying;
}

// Play next song
function playNextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    audioPlayer.play();
    isPlaying = true;
    playPauseBtn.textContent = "⏸";
}

// Play previous song
function playPrevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    audioPlayer.play();
    isPlaying = true;
    playPauseBtn.textContent = "⏸";
}

// Shuffle songs
function shuffleSongs() {
    currentSongIndex = Math.floor(Math.random() * songs.length);
    loadSong(currentSongIndex);
    audioPlayer.play();
    isPlaying = true;
    playPauseBtn.textContent = "⏸";
}

// Refresh Player
function refreshPlayer() {
    loadSong(currentSongIndex);
}

// Update time display
audioPlayer.addEventListener("timeupdate", () => {
    let currentMinutes = Math.floor(audioPlayer.currentTime / 60);
    let currentSeconds = Math.floor(audioPlayer.currentTime % 60);
    let totalMinutes = Math.floor(audioPlayer.duration / 60);
    let totalSeconds = Math.floor(audioPlayer.duration % 60);

    if (!isNaN(totalMinutes) && !isNaN(totalSeconds)) {
        currentTimeDisplay.textContent = `${currentMinutes}:${currentSeconds
            .toString()
            .padStart(2, "0")}`;
        totalTimeDisplay.textContent = `${totalMinutes}:${totalSeconds
            .toString()
            .padStart(2, "0")}`;
    }
});

// Volume control
volumeSlider.addEventListener("input", () => {
    audioPlayer.volume = volumeSlider.value;
});

// Autoplay next song when current song ends
audioPlayer.addEventListener("ended", playNextSong);

// Event Listeners
playPauseBtn.addEventListener("click", togglePlayPause);
nextBtn.addEventListener("click", playNextSong);
prevBtn.addEventListener("click", playPrevSong);
shuffleBtn.addEventListener("click", shuffleSongs);
refreshBtn.addEventListener("click", refreshPlayer);
playlist.addEventListener("change", (event) => {
    currentSongIndex = event.target.value;
    loadSong(currentSongIndex);
    audioPlayer.play();
    isPlaying = true;
    playPauseBtn.textContent = "⏸";
});

// Load the first song on startup
loadSong(currentSongIndex);
