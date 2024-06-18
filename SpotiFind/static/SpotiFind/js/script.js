// console.log("lets write some javascript")
let currentsong = new Audio
let All_Songs;
let Albums;
let Album_Songs;


// function to convert into seconds
function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}


// function to play audio 
const PlayMusic = (index) => {

    fetch('/api/songs/')
        .then(response => response.json())
        .then(songs => {
            // console.log(songs);

            All_Songs = []
            for (const song of songs) {
                All_Songs.push(song)
            }
            // console.log(All_Songs)

            let track = Album_Songs[index].id - true
            // console.log(Album_Songs[index].id)

            // let audio = new Audio(songs[track].audio_file)
            currentsong.src = songs[track].audio_file
            currentsong.play()
            play.src = "static/SpotiFind/img/pause.svg"
            let title = songs[track].title
            document.querySelector(".songinfo").innerHTML = title
            document.querySelector(".songtime").innerHTML = "00:00 / 00:00"

            return All_Songs
        });
}


// function to display all albums
async function Display_Album() {

    fetch('/api/albums/')
        .then(response => response.json())
        .then(albums => {

            Albums = []
            for (const album of albums) {
                Albums.push(album)
            }
            // console.log(Albums);

            let card_container = document.querySelector(".cardContainer")

            for (const album of albums) {
                card_container.innerHTML = card_container.innerHTML + `<div class="card">
                <p style="display: none;">${album.id}</p>
                <div class="play">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 20V4L19 12L5 20Z" stroke="#141B34" fill="#000" stroke-width="1.5" stroke-linejoin="round" />
                </svg>
                </div>
                <img src="${album.cover_image}" alt="">
                <h2>${album.title}</h2>
                </div>`
            }

            Array.from(document.querySelector(".cardContainer").querySelectorAll(".card")).forEach(e => {
                e.addEventListener("click", element => {
                    // console.log(e.firstElementChild.innerHTML)
                    let id = (e.firstElementChild.innerHTML)
                    Get_Songs(id)
                })
            })
            return Albums
        })
}


// function to get all songs of an album
async function Get_Songs(album_id) {

    fetch(`/api/songs/${album_id}/`)
        // fetch(`/api/songs/`)
        .then(response => response.json())
        .then(songs => {
            // console.log(songs)

            Album_Songs = []
            for (const song of songs) {
                Album_Songs.push(song)
            }
            // console.log(Album_Songs)

            currentsong.src = songs[0].audio_file
            let title = songs[0].title
            document.querySelector(".songinfo").innerHTML = title

            // show all songs in the playlist
            let songUl = document.querySelector(".songList").getElementsByTagName("ul")[0]
            songUl.innerHTML = ""
            for (const song of songs) {
                songUl.innerHTML = songUl.innerHTML + `<li>
                            <img class="invert" src="static/SpotiFind/img/music.svg" alt="">
                            <div class="info">
                                <div style="display: none;">${song.id}</div>
                                <div> ${song.title}</div>
                                <div>${song.artist}</div>
                            </div>
                            <div class="playnow">
                                <span>Play Now</span>
                                <img id="playnow" class="invert" src="static/SpotiFind/img/play.svg" alt="">
                            </div>
                        </li>`;
            }

            // attach an event listener to each song
            Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach((e, index) => {
                e.addEventListener("click", element => {
                    // console.log("Index of e " + index); // This will log the index of 'e'
                    PlayMusic(index);
                });
            });

            return Album_Songs
        });

}


// main function 
async function main() {

    // display all the albums on the page
    await Display_Album()


    // Attach an event listener to play, next and previous
    play.addEventListener("click", () => {
        if (currentsong.paused) {
            currentsong.play()
            play.src = "static/SpotiFind/img/pause.svg"
        }
        else {
            currentsong.pause()
            play.src = "static/SpotiFind/img/play.svg"
        }
    })
    

    // listen for timeupdate event
    currentsong.addEventListener("timeupdate", () => {
        // console.log(currentsong.currentTime, currentsong.duration);
        document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentsong.currentTime)} / ${secondsToMinutesSeconds(currentsong.duration)}`
        document.querySelector(".circle").style.left = (currentsong.currentTime / currentsong.duration) * 100 + "%";

        // play next song if current song in end
        if (currentsong.currentTime == currentsong.duration) {

            // console.log(currentsong)
    
            let slicedUrl = currentsong.src.substring(currentsong.src.indexOf("songs/"));
            // console.log(slicedUrl)

            for (let i = 0; i < Album_Songs.length; i++) {
                
                if (slicedUrl == Album_Songs[i]["audio_file"]) {
                    if ((i + true )== Album_Songs.length) {
                        // console.log("hlooooooooooooooooooooo")
                        document.querySelector("#play").src = "static/SpotiFind/img/play.svg" 

                    }
                    // console.log(i);
                    else{
                        PlayMusic(i + 1)
                    }
                }
            }
        }
    })

    // add an eventlistner to seekbar
    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100
        document.querySelector(".circle").style.left = percent + "%";
        currentsong.currentTime = ((currentsong.duration) * percent) / 100
    })

    // Add an event listener for hamburger
    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0"
    })

    // Add an event listener for close button
    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-120%"
    })

    // Add an event listener to previous
    previous.addEventListener("click", () => {
        currentsong.pause()
        play.src = "static/SpotiFind/img/play.svg"
        // console.log("Previous clicked")
        // console.log(currentsong.src)
        // console.log(Album_Songs)

        let slicedUrl = currentsong.src.substring(currentsong.src.indexOf("songs/"));
        // console.log(slicedUrl)

        for (let i = 0; i < Album_Songs.length; i++) {
            if (slicedUrl == Album_Songs[i]["audio_file"]) {
                // console.log(i)
                PlayMusic(i - 1)
            }
        }
    })


    // Add an event listener to next
    next.addEventListener("click", () => {
        currentsong.pause()
        play.src = "static/SpotiFind/img/play.svg"
        // console.log("Next clicked")
        // console.log(currentsong.src)
        // console.log(All_Songs)

        let slicedUrl = currentsong.src.substring(currentsong.src.indexOf("songs/"));
        // console.log(slicedUrl)

        for (let i = 0; i < Album_Songs.length; i++) {
            if (slicedUrl == Album_Songs[i]["audio_file"]) {
                // console.log(i);
                PlayMusic(i + 1)
            }
        }
    })

    // Add an event to volume
    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e) => {
        // console.log("Setting volume to", e.target.value, "/ 100")
        currentsong.volume = parseInt(e.target.value) / 100
        if (currentsong.volume > 0) {
            document.querySelector(".volume>img").src = document.querySelector(".volume>img").src.replace("mute.svg", "volume.svg")
        }
    })

    // Add event listener to mute the track
    document.querySelector(".volume>img").addEventListener("click", e => {
        if (e.target.src.includes("volume.svg")) {
            e.target.src = e.target.src.replace("volume.svg", "mute.svg")
            currentsong.volume = 0;
            document.querySelector(".range").getElementsByTagName("input")[0].value = 0;
        }
        else {
            e.target.src = e.target.src.replace("mute.svg", "volume.svg")
            currentsong.volume = .10;
            document.querySelector(".range").getElementsByTagName("input")[0].value = 10;
        }

    })
};

main()
