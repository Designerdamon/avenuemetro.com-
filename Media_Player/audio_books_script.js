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

/* Audiobook tracks and image – now .mp3 instead of .mpg */
const songs = [
  {
    title: "Rich Dad Poor Dad - Track 01",
    src: "Media_Player/Audio_Books/Rich_Dad_Poor_Dad/Robert Kiyosaki - Rich Dad Poor Dad - Track 01.mp3",
    img: "Media_Player/Audio_Books/Rich_Dad_Poor_Dad/Rich_Dad_Poor_Dad.png"
  },
  {
    title: "Rich Dad Poor Dad - Track 02",
    src: "Media_Player/Audio_Books/Rich_Dad_Poor_Dad/Robert Kiyosaki - Rich Dad Poor Dad - Track 02.mp3",
    img: "Media_Player/Audio_Books/Rich_Dad_Poor_Dad/Rich_Dad_Poor_Dad.png"
  }
];

let currentSongIndex = 0;
let isPlaying = false;

// Populate playlist
songs.forEach((song, index) => {
  const option = document.createElement("option");
  option.value = index;
  option.textContent = song.title;
  playlist.appendChild(option);
});

// Load the track
function loadSong(index) {
  audioPlayer.src = songs[index].src;
  songImage.src = songs[index].img;
  playlist.value = index;
  audioPlayer.load();
}

// Toggle play/pause
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

// Next track
function playNextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
  audioPlayer.play();
  isPlaying = true;
  playPauseBtn.textContent = "⏸";
}

// Previous track
function playPrevSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(currentSongIndex);
  audioPlayer.play();
  isPlaying = true;
  playPauseBtn.textContent = "⏸";
}

// Shuffle tracks
function shuffleSongs() {
  currentSongIndex = Math.floor(Math.random() * songs.length);
  loadSong(currentSongIndex);
  audioPlayer.play();
  isPlaying = true;
  playPauseBtn.textContent = "⏸";
}

// Refresh
function refreshPlayer() {
  loadSong(currentSongIndex);
}

// Update time display
audioPlayer.addEventListener("timeupdate", () => {
  const currentMinutes = Math.floor(audioPlayer.currentTime / 60);
  const currentSeconds = Math.floor(audioPlayer.currentTime % 60);
  const totalMinutes = Math.floor(audioPlayer.duration / 60);
  const totalSeconds = Math.floor(audioPlayer.duration % 60);

  if (!isNaN(totalMinutes) && !isNaN(totalSeconds)) {
    currentTimeDisplay.textContent = 
      `${currentMinutes}:${currentSeconds.toString().padStart(2, "0")}`;
    totalTimeDisplay.textContent = 
      `${totalMinutes}:${totalSeconds.toString().padStart(2, "0")}`;
  }
});

// Volume
volumeSlider.addEventListener("input", () => {
  audioPlayer.volume = volumeSlider.value;
});

// Autoplay next
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

// Load first track
loadSong(currentSongIndex);
