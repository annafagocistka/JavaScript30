/* get our Elements*/
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// Build out functions 
function togglePlay() {
    /* const method = video.paused ? 'play' : 'pause';
    video[method](); */
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

function updateButton() {
    //jesli video (this) jest zpauzowane to..., jesli nie...
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
    console.log(icon);
}

function skip(){
    //dataset- js Zugang zu data attr.in html
console.log(this.dataset.skip);
/* do aktualnego czasu dodaje czas ze skipu, zmieniajac go ze stringa w liczbe poprzez parseFloat */
video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
    video[this.name] = this.value;
    /* najpierw loguje name i value. potem przyrownuje i dzieki temu dziala */
    console.log(this.name);
    console.log(this.value);
}

function handleProgress (){
const percent = (video.currentTime / video.duration) * 100;
progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e){
    const scrubTime = (e.offsetX /progress.offsetWidth)* video.duration;
    video.currentTime = scrubTime;
    console.log(e);
}

/* Hook up the event listners */
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click',skip));
ranges.forEach(range=> range.addEventListener('change',handleRangeUpdate));
ranges.forEach(range=> range.addEventListener('mousemove',handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click',scrub);
/* progress.addEventListener('mousemove',() => {
    if(mousedown){
        scrub(e);
        handleProgress()
    }
}); */
//jesli nie podamy ,,e,, nizej to przesuwanie nie nie bedzie dzialac, poniewaz nasza funkcja scrub ma (e) i musimy go podac
progress.addEventListener('mousemove', (e) => mousedown && scrub(e) && handleProgress());
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
