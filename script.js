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

renderMusic(indexMusic);

document.querySelector('.botaoplay').addEventListener('click', playMusic);

document.querySelector('.botaopause').addEventListener('click', stopMusic);

musica.addEventListener('timeupdate', updateBar);

document.querySelector('.back').addEventListener('click', () => {
    indexMusic--;
    if(indexMusic < 0 ){
        indexMusic = 4;
    }
    renderMusic(indexMusic);
    playMusic();
});
document.querySelector('.next').addEventListener('click', () => {
    indexMusic++;
    if(indexMusic > 4){
        indexMusic = 0;
    }
    renderMusic(indexMusic);
    playMusic();
});

function renderMusic(index){
    musica.setAttribute('src', musics[index].src);
    musica.addEventListener('loadeddata', () =>{
        musicName.textContent = musics[index].title;
        artistsName.textContent = musics[index].artists;
        imagem.src = musics[index].img;
        duracaoMusica.textContent = secToMin(Math.floor(musica.duration));
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
function updateBar(){
    let barra = document.querySelector('progress');
    barra.style.width = Math.floor((musica.currentTime / musica.duration) * 100) + '%';
    let current_Time = document.querySelector('.start');
    current_Time.textContent = secToMin(Math.floor(musica.currentTime));
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

