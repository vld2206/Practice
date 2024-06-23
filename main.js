const playerLayout = document.querySelector(".player");
const nowPlaying = document.querySelector(".now-playing");
const trackCover = document.querySelector(".track-art");
const trackName = document.querySelector(".track-name");
const trackArtist = document.querySelector(".track-artist");

const playpauseBtn = document.querySelector(".playpause-track");
const nextBtn = document.querySelector(".next-track");
const prevBtn = document.querySelector(".prev-track");

const seekSlider = document.querySelector(".seek_slider");
const volumeSlider = document.querySelector(".volume_slider");
const currentTime = document.querySelector(".current-time");
const totalDuration = document.querySelector(".total-duration");

let trackIndex = 0;
let isPlaying = false;
let updateTimer;

const curr_track = document.createElement("audio");

const track_list = [
  {
    name: "Track 1",
    artist: "placeholder artist",
    image:
      "https://cdn2.thecatapi.com/images/755.jpg",
    path: "placeholder for track",
  },
  {
    name: "Track 2",
    artist: "placeholder artist 2",
    image:
      "https://cdn2.thecatapi.com/images/MTU3Mzk5Mw.jpg",
    path: "placeholder for track",
  },
  {
    name: "Track 3",
    artist: "placeholder artist 2",
    image:
      "https://cdn2.thecatapi.com/images/b9m.jpg",
    path: "placeholder for track",
  },
];

function random_bg_color(element) {
  const red = Math.floor(Math.random() * 192) + 64;
  const green = Math.floor(Math.random() * 192) + 64;
  const blue = Math.floor(Math.random() * 192) + 64;

  element.style.background = `rgb(${red},${green},${blue})`;
}

function loadTrack(index) {
  clearInterval(updateTimer);
  resetValues();
  const track = track_list[index];
  curr_track.src = track.path;
  curr_track.load();

  trackCover.style.backgroundImage = `url(${track.image})`;
  trackName.textContent = track.name;
  trackArtist.textContent = track.artist;
  nowPlaying.textContent = `Воспроизведение ${index + 1} из ${track_list.length}`;

  updateTimer = setInterval(seekUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
  random_bg_color(document.body);
  random_bg_color(playerLayout);
}

function resetValues() {
  currentTime.textContent = "00:00";
  totalDuration.textContent = "00:00";
  seekSlider.value = 0;
}

loadTrack(trackIndex);

function playpauseTrack() {
  isPlaying ? pauseTrack() : playTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  playpauseBtn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpauseBtn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

function nextTrack() {
  trackIndex = (trackIndex + 1) % track_list.length;
  loadTrack(trackIndex);
  playTrack();
}

function prevTrack() {
  trackIndex = (trackIndex - 1 + track_list.length) % track_list.length;
  loadTrack(trackIndex);
  playTrack();
}

function seekTo() {
  curr_track.currentTime = curr_track.duration * (seekSlider.value / 100);
}

function setVolume() {
  curr_track.volume = volumeSlider.value / 100;
}

function seekUpdate() {
  if (!isNaN(curr_track.duration)) {
    const seekPosition = curr_track.currentTime * (100 / curr_track.duration);
    seekSlider.value = seekPosition;

    const formatTime = (time) => {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes < 10 ? "0" : ""}${minutes}:${
        seconds < 10 ? "0" : ""
      }${seconds}`;
    };

    currentTime.textContent = formatTime(curr_track.currentTime);
    totalDuration.textContent = formatTime(curr_track.duration);
  }
}
