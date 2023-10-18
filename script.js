let musics =[
    {title:'Honest(feat.Don Toliver)', artists:'Justin Bieber, Don Toliver', src:'./mp3/Honest.mp3', img:'./assets/images/capahonestspotify.png'},
    {title:'Die Hard', artists:'Kendrick Lamar, Blxst, Amanda Reifer', src:'./mp3/Die Hard.mp3', img:'./assets/images/capakendricklamar.png'},
    {title:'Come & Go(with Marshmello)', artists:'Juice WRLD, Marshmello', src:'./mp3/Come & Go.mp3', img:'./assets/images/capacomego.png'},
    {title:'Mean To Me - Remastered/1998', artists:'Dean Martin', src:'./mp3/Mean to Me.mp3', img:'./assets/images/capadeanmartin.png'},
    {title:'Cabin Fever', artists:'Jaden', src:'./mp3/Cabin Fever.mp3', img:'./assets/images/capacabinfever.png'}
]

let musicPlayer = document.querySelector('audio');
let indexMusic = 0;
let musicDuration = document.querySelector('.end');
let musicImage = document.querySelector('img');
let musicName = document.querySelector('.title-name h2');
let artistsName = document.querySelector('.title-name p');
let muteButton = document.querySelector('.mute-button')
let volumeInput = document.querySelector('.volume-input')
let progressInput = document.querySelector('.progress-input');

document.querySelector('.play-button').addEventListener('click', playMusic);
document.querySelector('.pause-button').addEventListener('click', stopMusic);
muteButton.addEventListener('click', muteMusic);
volumeInput.addEventListener('change', changeVolume)
progressInput.addEventListener('change', changeCurrentTime)
document.querySelector('.back').addEventListener('click', back);
document.querySelector('.next').addEventListener('click', next);

function renderMusic(index){
    musicPlayer.setAttribute('src', musics[index].src);
    musicImage.classList.add("hidden");
    musicPlayer.addEventListener('loadeddata', () =>{
        musicName.textContent = musics[index].title;
        artistsName.textContent = musics[index].artists;
        musicImage.src = musics[index].img;
        musicDuration.textContent = secToMin(Math.floor(musicPlayer.duration));
        progressInput.max = Math.floor(musicPlayer.duration);
        changeVolume();
    });
}

musicImage.addEventListener("load", ()=>{
    musicImage.classList.remove("hidden");
})

renderMusic(indexMusic);

function playMusic(){
    musicPlayer.play();
    document.querySelector('.pause-button').style.display = 'block';
    document.querySelector('.play-button').style.display = 'none';
}

function stopMusic(){
    musicPlayer.pause();
    document.querySelector('.pause-button').style.display = 'none';
    document.querySelector('.play-button').style.display = 'block';
}

function back(){
    indexMusic--;
    if(indexMusic < musics.length - 1){
        indexMusic = 4;
    }
    renderMusic(indexMusic);
    playMusic();
}

function next(){
    indexMusic++;
    if(indexMusic > musics.length - 1){
        indexMusic = 0;
    }
    renderMusic(indexMusic);
    playMusic();
}

function muteMusic(){
    let iconClass = musicPlayer.muted ? "fa-solid fa-volume-high" : "fa-solid fa-volume-xmark"
    musicPlayer.muted = !musicPlayer.muted
    
    muteButton.children[0].classList = iconClass
}

function changeVolume(){
    musicPlayer.volume = volumeInput.value / 100
    volumeInput.style.backgroundSize = `${volumeInput.value}% 100%`
}

function changeCurrentTime(){
    clearInterval(update)
    musicPlayer.currentTime = progressInput.value;
    updateInfo()
    update = setInterval(updateInfo, 1000)
}

function updateInfo(){
    progressInput.value = Math.floor(musicPlayer.currentTime)
    progressInput.style.backgroundSize = Math.floor((musicPlayer.currentTime / musicPlayer.duration) * 100) + '% 100%';
    let current_Time = document.querySelector('.start');
    current_Time.textContent = secToMin(Math.floor(musicPlayer.currentTime));
    checkIfFinished()
}

function checkIfFinished(){
    if(musicPlayer.currentTime === musicPlayer.duration){
        next();
    }
}

function secToMin(secs){
    let minSpace = Math.floor(secs / 60);
    let secSpace = secs % 60;
    if (secSpace < 10){
        secSpace = '0' + secSpace;
    }

    return minSpace+ ':' + secSpace;
}
function duration(){
    musicDuration.textContent = secToMin(Math.floor(currentSong.duration));
}

let update = setInterval(updateInfo, 1000)

