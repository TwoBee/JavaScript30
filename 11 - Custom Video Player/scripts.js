const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");
const fullscreen = player.querySelector(".player__button__fullscreen");

function togglePlay(e){
    if(e.type === "click"){
        if(video.paused){
            video.play();
        }
        else{
            video.pause();
        }
    }
}

function updateButton(){
toggle.textContent = this.paused ? "►" : "❚ ❚";;
}

function skip(e){
    if(e.code === "Space"){
        return;
    }
    video.currentTime += parseFloat(this.dataset.skip)
}

function handleRangeUpdate(){
    video[this.name] = this.value;
}

function handleProgress(){
     const percent = (video.currentTime / video.duration) * 100;
     progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e){
    const scrubTime = ( e.offsetX / progress.offsetWidth ) * video.duration;
    video.currentTime = scrubTime;
}

function handleFullscreen(){
    console.log("ja ");
    video.webkitRequestFullscreen();
}

video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("keyup", updateButton);
video.addEventListener("timeupdate", handleProgress);

toggle.addEventListener("click", togglePlay);

let mousedown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => {mousedown && scrub(e)});
progress.addEventListener("mousedown", () => mousedown = true);
progress.addEventListener("mouseup", () => mousedown = false);

ranges.forEach(range => range.addEventListener("change", handleRangeUpdate));
ranges.forEach(range => range.addEventListener("mousemove", handleRangeUpdate));
skipButtons.forEach(button => button.addEventListener("click", skip));

fullscreen.addEventListener("click", handleFullscreen);

//////////
//Custom//
//////////
document.addEventListener("keydown", (e) => {
    switch (e.code) {
      case "Space":
        if (video.paused) {
          video.play();
        } else {
          video.pause();
        }
        break;
      case "ArrowLeft":
        video.currentTime -= 10;
        break;
      case "ArrowRight":
        video.currentTime += 10;
        break;
    };
});

video.addEventListener("dblclick", handleFullscreen);
