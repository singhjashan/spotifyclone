console.log("lets write some javascript")
let currentsong = new Audio
let Songs;

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

const PlayMusic = (track) => {

    fetch('/api/songs/')
        .then(response => response.json())
        .then(songs => {
            console.log(songs);

            // let audio = new Audio(songs[track].audio_file)
            currentsong.src = songs[track].audio_file
            currentsong.play()
            play.src = "static/SpotiFind/img/pause.svg"
            let title = songs[track].title
            document.querySelector(".songinfo").innerHTML = title
            document.querySelector(".songtime").innerHTML = "00:00 / 00:00"

        });
}

async function main() {


    fetch('/api/songs/')
        .then(response => response.json())
        .then(songs => {
            console.log(songs)

            Songs = []
            for (const song of songs) {
                const element = song
                Songs.push(element)
            }
            console.log(Songs)


            currentsong.src = songs[0].audio_file
            let title = songs[0].title
            document.querySelector(".songinfo").innerHTML = title

            // show all songs in the playlist
            let songUl = document.querySelector(".songList").getElementsByTagName("ul")[0]
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
                                <img class="invert" src="static/SpotiFind/img/play.svg" alt="">
                            </div>
                        </li>`;
            }

            // attach an event listener to each song
            Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
                e.addEventListener("click", element => {
                    console.log(e.querySelector(".info").firstElementChild.innerHTML)
                    let s = (e.querySelector(".info").firstElementChild.innerHTML.trim()) - true
                    PlayMusic(s)
                    //     var audio = new Audio(songs[s].audio_file)
                    //     console.log(songs[s].audio_file)
                    //     audio.play()
                })
                // console.log(e.querySelector(".info").firstElementChild.innerHTML)
            })

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


            // var audio = new Audio(songs[0].audio_file)
            // console.log(songs[s].audio_file)
            // audio.play()

            // audio.addEventListener("loadeddata", () => {
            //     let duration = audio.duration;
            //     console.log(duration)
            // })
            // for (let song of songs) {
            //     let audio = new Audio(song.audio_file);
            //     audio.play();

            //     audio.addEventListener("loadeddata",()=>{
            //         let duration = audio.duration;
            //         console.log(duration)
            //     })
            // }
        });

    // listen for timeupdate event
    currentsong.addEventListener("timeupdate", () => {
        console.log(currentsong.currentTime, currentsong.duration);
        document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentsong.currentTime)} / ${secondsToMinutesSeconds(currentsong.duration)}`
        document.querySelector(".circle").style.left = (currentsong.currentTime / currentsong.duration) * 100 + "%";
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
        console.log("Previous clicked")
        console.log(currentsong.src)

        let slicedUrl = currentsong.src.substring(currentsong.src.indexOf("songs/"));

        console.log(slicedUrl)

        function findId(slicedUrl) {
            for (let i = 0; i < Songs.length; i++) {
                if (Songs[i].audio_file === slicedUrl) {
                    return Songs[i].id
                }
            }
            return null;
        }

        console.log(findId(slicedUrl));
        console.log(Songs.length);
        var track = findId(slicedUrl) - 2
        console.log(track)

        if ((track) >= 0) {
            PlayMusic(track)
        }

    })

    // Add an event listener to next
    next.addEventListener("click", () => {
        currentsong.pause()
        play.src = "static/SpotiFind/img/play.svg"
        console.log("Next clicked")
        console.log(currentsong.src)

        let slicedUrl = currentsong.src.substring(currentsong.src.indexOf("songs/"));
        console.log(slicedUrl)

        function findId(slicedUrl) {
            for (let i = 0; i < Songs.length; i++) {
                if (Songs[i].audio_file === slicedUrl) {
                    return Songs[i].id
                }
            }
            return null;
        }

        console.log(findId(slicedUrl));
        console.log(Songs.length);
        var track = findId(slicedUrl) + 1
        console.log(track)

        if (track <= Songs.length) {
            PlayMusic(track - 1)
        }
    })

    // Add an event to volume
    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e) => {
        console.log("Setting volume to", e.target.value, "/ 100")
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
}

main()
