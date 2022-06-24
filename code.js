let songindex = 0;
let audio = new Audio('songs/0.mp3');
let currentAudioIndex = 0;  // this referes to the current audio that is playing..
const songPlayBtn = Array.from(document.querySelectorAll('.songPlayBtn'));
const songBottomBtn = document.querySelector('.mainPlayer');
let playpause = true;
let bottom_txt = document.querySelectorAll('.currsong');
let songDuration=document.querySelectorAll('.songinfo duration')
let songRange = document.querySelector('#songRange');
let gif = document.querySelector('.playGif');
let songs = Array.from(document.getElementsByClassName('songs'));
let allSongs = [{
        Songname: 'Light It Up Remix',
        path: 'songs/Light it Up.mp3',
        cover: 'images/light it up.jpg'
    },
    {
        Songname: 'Sunflower',
        path: 'songs/Sunflower.mp3',
        cover: 'images/sunflower.jpg'
    },
    {
        Songname: 'September',
        path: 'songs/September.mp3',
        cover: 'images/september.jpg'
    },
    {
        Songname: 'Levitating',
        path: 'songs/Levitating.mp3',
        cover: 'images/levitating.jpg'
    },
    {
        Songname: 'Something in the Way',
        path: 'songs/Something.mp3',
        cover: 'images/something in the way.jpeg'
    },
    {
        Songname: 'Feeling Good',
        path: 'songs/Feeling.mp3',
        cover: 'images/feeling.jpg'
    },
    {
        Songname: 'Closer',
        path: 'songs/Closer.mp3',
        cover: 'images/closer.jpg'
    },
    {
        Songname: 'Levitating',
        path: 'songs/Levitating.mp3',
        cover: 'images/levitating.jpg'
    },
    {
        Songname: 'September',
        path: 'songs/September.mp3',
        cover: 'images/september.jpg'
    },
    {
        Songname: 'Sunflower',
        path: 'songs/Sunflower.mp3',
        cover: 'images/sunflower.jpg'
    }
];
songs.forEach((element, j) => {
    console.log(element, j);
    element.getElementsByClassName("songinfo name")[0].innerHTML = allSongs[j].Songname;  
    element.getElementsByTagName("img")[0].src = allSongs[j].cover;
});



for (let i = 0; i < songPlayBtn.length; i++) {
    songPlayBtn[i].addEventListener('click', () => {
        document.getElementsByClassName("currsong")[0].innerHTML = allSongs[i].Songname;
        //audio.currentTime=0
        console.log("i is:", i);
        if(i == currentAudioIndex){
            //i.e song is not changed
            if (playpause == true) {
                audio.play();
                songPlayBtn[i].style.color = "green";
                songBottomBtn.style.color = "green";
                gif.style.opacity = 1;
            } else {
                audio.pause();
                songPlayBtn[i].style.color = "black";
                songBottomBtn.style.color = "white";
                gif.style.opacity = 0;
            }
            playpause = !playpause;
            return;
        }
        
        console.log("Updating audio src.");
        audio.src = `songs/${i}.mp3`;
        playpause = false;
        songPlayBtn[currentAudioIndex].style.color = "black";
        gif.style.opacity = 1;
        currentAudioIndex = i;
        songPlayBtn[i].style.color = "green";
        songBottomBtn.style.color = "green";
        audio.play();
    })
}

 document.getElementById("next").addEventListener('click', () => {
     songPlayBtn[currentAudioIndex].style.color = "black";
     playpause = false;
     gif.style.opacity = 1;
     currentAudioIndex = (currentAudioIndex + 1) % allSongs.length;
     document.getElementsByClassName("currsong")[0].innerHTML = allSongs[currentAudioIndex].Songname;
     
    audio.src = `songs/${currentAudioIndex}.mp3`;
        songPlayBtn[currentAudioIndex].style.color = "green";
        songBottomBtn.style.color = "green";
        audio.play();
});
document.getElementById("previous").addEventListener('click', () => {
    songPlayBtn[currentAudioIndex].style.color = "black";
    playpause = true;
    gif.style.opacity = 1;
    currentAudioIndex = (currentAudioIndex - 1) % allSongs.length;
    if(currentAudioIndex<0)
    {
        currentAudioIndex=allSongs.length-1;
    }
    document.getElementsByClassName("currsong")[0].innerHTML = allSongs[currentAudioIndex].Songname;
    
   audio.src = `songs/${currentAudioIndex}.mp3`;
       songPlayBtn[currentAudioIndex].style.color = "green";
       songBottomBtn.style.color = "green";
       audio.play();
});     

audio.addEventListener('timeupdate', () => {
    console.log("Time update triggered for audio:", audio);
    console.log("Audio current time is:", audio.currentTime);
    console.log("Audio duration is:", audio.duration);
    let songRangeValue = parseInt((audio.currentTime / audio.duration) * 100);
    songRange.value = songRangeValue || 0;
})
songRange.addEventListener('change', () => {
    audio.currentTime = songRange.value * audio.duration / 100;
})
songBottomBtn.addEventListener('click', () => {
    document.getElementsByClassName("currsong")[0].innerHTML = allSongs[currentAudioIndex].Songname;
    if (playpause == true) {
        audio.play();
        songBottomBtn.style.color = "green";
        gif.style.opacity = 1;
        songPlayBtn[currentAudioIndex].style.color = "green";
    } else {
        audio.pause();
        songBottomBtn.style.color = "white";
        songPlayBtn[currentAudioIndex].style.color = "black";
        gif.style.opacity = 0;
    }
    playpause = !playpause;
});
