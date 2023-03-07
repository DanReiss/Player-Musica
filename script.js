let musics =[
    {title:'Honest(feat.Don Toliver)', artists:'Justin Bieber, Don Toliver', src:'./mp3/Honest.mp3', img:'./assets/images/capahonestspotify.png'},
    {title:'Die Hard', artists:'Kendrick Lamar, Blxst, Amanda Reifer', src:'./mp3/Die Hard.mp3', img:'./assets/images/capakendricklamar.png'},
    {title:'Come & Go(with Marshmello)', artists:'Juice WRLD, Marshmello', src:'./mp3/Come & Go.mp3', img:'./assets/images/capacomego.png'},
    {title:'Mean To Me - Remastered/1998', artists:'Dean Martin', src:'./mp3/Mean to Me.mp3', img:'./assets/images/capadeanmartin.png'},
    {title:'Cabin Fever', artists:'Jaden', src:'./mp3/Cabin Fever.mp3', img:'./assets/images/capacabinfever.png'}
]
let musica = document.querySelector('audio');
let indexMusic = 0;
let duracaoMusica = document.querySelector('.end');
let imagem = document.querySelector('img');
let musicName = document.querySelector('.title-name h2');
let artistsName = document.querySelector('.title-name p');
let muteButton = document.querySelector('.mute-button')
let volumeInput = document.querySelector('.volume-input')
let progressInput = document.querySelector('.progress-input');

renderMusic(indexMusic);

document.querySelector('.botaoplay').addEventListener('click', playMusic);

document.querySelector('.botaopause').addEventListener('click', stopMusic);

muteButton.addEventListener('click', muteMusic);

volumeInput.addEventListener('change', changeVolume)

progressInput.addEventListener('change', changeCurrentTime)
 
document.querySelector('.back').addEventListener('click', back);
document.querySelector('.next').addEventListener('click', next);


function renderMusic(index){
    musica.setAttribute('src', musics[index].src);
    musica.addEventListener('loadeddata', () =>{
        musicName.textContent = musics[index].title;
        artistsName.textContent = musics[index].artists;
        imagem.src = musics[index].img;
        duracaoMusica.textContent = secToMin(Math.floor(musica.duration));
        progressInput.max = Math.floor(musica.duration);
        changeVolume();
    });
}

function playMusic(){
    musica.play();
    document.querySelector('.botaopause').style.display = 'block';
    document.querySelector('.botaoplay').style.display = 'none';
}

function stopMusic(){
    musica.pause();
    document.querySelector('.botaopause').style.display = 'none';
    document.querySelector('.botaoplay').style.display = 'block';
}

function back(){
    indexMusic--;
    if(indexMusic < 0 ){
        indexMusic = 4;
    }
    renderMusic(indexMusic);
    playMusic();
}

function next(){
    indexMusic++;
    if(indexMusic > 4){
        indexMusic = 0;
    }
    renderMusic(indexMusic);
    playMusic();
}

function muteMusic(){
    let iconClass = musica.muted ? "fa-solid fa-volume-high" : "fa-solid fa-volume-xmark"
    musica.muted = !musica.muted
    
    muteButton.children[0].classList = iconClass
}

function changeVolume(){
    musica.volume = volumeInput.value / 100
    volumeInput.style.backgroundSize = `${volumeInput.value}% 100%`
}

function changeCurrentTime(){
    clearInterval(update)
    console.log(progressInput.value)
    musica.currentTime = progressInput.value;
    updateInfo()
    update = setInterval(updateInfo, 1000)
}

function updateInfo(){
    progressInput.value = Math.floor(musica.currentTime)
    progressInput.style.backgroundSize = Math.floor((musica.currentTime / musica.duration) * 100) + '% 100%';
    let current_Time = document.querySelector('.start');
    current_Time.textContent = secToMin(Math.floor(musica.currentTime));
    checkIfFinished()
}

function checkIfFinished(){
    if(musica.currentTime === musica.duration){
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
    duracaoMusica.textContent = secToMin(Math.floor(currentSong.duration));
}

let update = setInterval(updateInfo, 1000)

