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
    name: "Засыпая",
    artist: "Smoke Killa",
    image:
      "https://cdn2.thecatapi.com/images/755.jpg",
    path: "https://s144iva.storage.yandex.net/get-mp3/3163e41bb1fc95fd99fa3a12bb76fdfd/00061b8bc01e492e/rmusic/U2FsdGVkX1-Wr9-fqbG6vnhZ-tb8EFGjO2ozbt3W6jN9pb3H2fDhLEhoZV_5iOAPT4qd38PYXAQVOnYyoSV9CbzfLyF4NOHOJVCNdetaF1Q/a77477ce0865525bf500a2059d0702695d0372b388cce6807dc8c01878b572b2/5355?track-id=122691621&play=false",
  },
  {
    name: "Dark Paradise",
    artist: "LANA DEL RAY",
    image:
      "https://cdn2.thecatapi.com/images/MTU3Mzk5Mw.jpg",
    path: "https://s777sas.storage.yandex.net/get-mp3/937954548814bd52d55cc7dfeda549df/00061b8c058e4f72/rmusic/U2FsdGVkX18PGI4jn31JxBtuyGrLdUJALcNqi2_ac-Oc-AGQhQ25HkaPW--oa2cQB6zalQyxVdycTWuvunjSMe7QmN_GYvQ022Bx0HZlbvg/cd76f10f4978f18c3f97fefc20be488754e06d95f6ef100a2a75551cdd746aa3/5355?track-id=3616429&play=false",
  },
  {
    name: "Хулиган",
    artist: "Челленджер",
    image:
      "https://cdn2.thecatapi.com/images/b9m.jpg",
    path: "https://s128vlx.storage.yandex.net/get-mp3/eabf86cba369bb3173344143708eee96/00061b8c0f0f327b/rmusic/U2FsdGVkX1-kBIiqVoCM_hX-bgUe5K4Il7QzSM-9Vuq0uInlo01MxwLEVVyI0J7a4wlVGpxqHb36w5KAK8VIdKpj0MOG783pLNlcGjc0i68/e98545c962f4b26a287fb6e733eb7847120cd13b5d005323e515703c727e2cf4?track-id=14631789&play=false",
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
