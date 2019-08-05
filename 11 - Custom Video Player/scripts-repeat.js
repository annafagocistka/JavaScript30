// get our Elements
const player = document.querySelector('.player');

const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');

const togglePlayBtn = document.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = document.querySelectorAll('.player__slider');
const fullBtn = document.querySelector('.full-screen');

// build out functions

function togglePlay() {
    // const method = (video.paused() ? 'play' : 'pause';
    // video[method]();
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
};

function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    console.log(icon);
    togglePlayBtn.textContent = icon;
};

function skip() {
    console.log(this.dataset.skip);
    video.currentTime += parseFloat(this.dataset.skip); // parseInt because this.dataset.skip is a string and we need number
};

function handleRangeUpdate() {
    // console.log(this.name);
    // console.log(this.value);
    video[this.name] = this.value;
};

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
};

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    console.log(e);
    video.currentTime = scrubTime;
}

function fullScreen() {
    if(video.requestFullscreen){
        video.requestFullscreen();
    }
};
// hook up the event listners

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

togglePlayBtn.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', () => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mousedown', () => mouseup = false);

fullBtn.addEventListener('click',fullScreen);