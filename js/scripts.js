var music = document.getElementById('music'); // id for audio element
var duration = music.duration; // Duration of audio clip, calculated here for embedding purposes
var pButton = document.getElementById('pButton'); // play button
var playhead = document.getElementById('playhead'); // playhead
var timeline = document.getElementById('timeline'); // timeline

var timelineWidth = timeline.offsetWidth - playhead.offsetWidth;

pButton.addEventListener("click", play);

music.addEventListener("timeupdate", timeUpdate, false);

timeline.addEventListener("click", function(event) {
    moveplayhead(event);
    music.currentTime = duration * clickPercent(event);
}, false);

function clickPercent(event) {
	return (event.clientX - getPosition(timeline)) / timelineWidth;
}

playhead.addEventListener('mousedown', mouseDown, false);
window.addEventListener('mouseup', mouseUp, false);

var onplayhead = false;

function mouseDown() {
  onplayhead = true;
  window.addEventListener('mousemove', moveplayhead, true);
  music.removeEventListener('timeupdate', timeUpdate, false);
}

function mouseUp(event) {
  if (onplayhead == true) {
	  moveplayhead(event);
	  window.removeEventListener('mousemove', moveplayhead, true);
	  // change current time
	  music.currentTime = duration * clickPercent(event);
	  music.addEventListener('timeupdate', timeUpdate, false);
  }
  onplayhead = false;
}
// mousemove EventListener
// Moves playhead as user drags
function moveplayhead(event) {
  var newMargLeft = event.clientX - getPosition(timeline);

  if (newMargLeft >= 0 && newMargLeft <= timelineWidth) {
    playhead.style.marginLeft = newMargLeft + "px";
  }
  if (newMargLeft < 0) {
    playhead.style.marginLeft = "0px";
  }
  if (newMargLeft > timelineWidth) {
    playhead.style.marginLeft = timelineWidth + "px";
  }
}

// timeUpdate
// Synchronizes playhead position with current point in audio
function timeUpdate() {
  var playPercent = timelineWidth * (music.currentTime / duration);
  playhead.style.marginLeft = playPercent + "px";
  if (music.currentTime == duration) {
    pButton.className = "";
    pButton.className = "play";
  }
}

//Play and Pause
function play() {
  // start music
  if (music.paused) {
    music.play();
    pButton.className = "";
    pButton.className = "pause";
  } else { // pause music
    music.pause();
    pButton.className = "";
    pButton.className = "play";
  }
}

function setVolume(volume) {
   music.volume = volume;
}

// Gets audio file duration
music.addEventListener("canplaythrough", function() {
  duration = music.duration;
}, false);

function getPosition(el) {
  return el.getBoundingClientRect().left;
}