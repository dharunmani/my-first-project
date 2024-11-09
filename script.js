console.log("Welcome To Spotify");

let songs = [
    { songName: "MERSAL", filepath: "2.mp3", coverpath: "Vettaiyan (2).jpg" },
    { songName: "SITA RAMA", filepath: "1.mp3", coverpath: "ab.jpg" },
    { songName: "ILLUMINATY", filepath: "3.mp3", coverpath: "13.png" },
    { songName: "leo Das Entry", filepath: "5 (2).mp3", coverpath: "12.png" },
    { songName: "ARM", filepath: "4.mp3", coverpath: "Vettaiyan (2).jpg" },
    { songName: "Makkamishi", filepath: "8.mp3", coverpath: "10 (2).png" },
    { songName: "Amaran", filepath: "4.mp3", coverpath: "Vettaiyan (2).jpg" },
    { songName: "Amaran", filepath: "4.mp3", coverpath: "Vettaiyan (2).jpg" },
    { songName: "Amaran", filepath: "4.mp3", coverpath: "Vettaiyan (2).jpg" },
];

let songIndex = 0;
let audioElement = new Audio(songs[songIndex].filepath);
let masterPlay = document.getElementById('masterPlay');
let prev = document.getElementById('prev');
let next = document.getElementById('next');
let mysongs1 = document.getElementById('mysongs1');
let songItem = Array.from(document.getElementsByClassName('songItem'));

// Populate the songs in the HTML
songItem.forEach((element, i) => {
    if (songs[i]) {
        element.getElementsByTagName('img')[0].src = songs[i].coverpath; // Use coverpath for cover image
        element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
    }
});

const playSong = () => {
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
};

const pauseSong = () => {
    audioElement.pause();
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add('fa-play-circle');
};

masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        playSong();
    } else {
        pauseSong();
    }
});

audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    mysongs1.value = progress;
});

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element, index) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        songIndex = index;
        audioElement.src = songs[songIndex].filepath;
        playSong();
    });
});

const playNextSong = () => {
    songIndex = (songIndex + 1) % songs.length;
    audioElement.src = songs[songIndex].filepath;
    playSong();
};

const playPrevSong = () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    audioElement.src = songs[songIndex].filepath;
    playSong();
};

next.addEventListener('click', playNextSong);
prev.addEventListener('click', playPrevSong);
