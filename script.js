"use strict";
//!For Radio Starts
(function () {
    let catchRadioPlayBtn = document.getElementById('radioPlayBtn');
    let catchRadioOutput = document.getElementById('radioOutput');
    function apiRes() {
        fetch(`https://mp3quran.net/api/v3/radios?language=eng`)
            .then(res => res.json())
            .then(data => apiShow(data))
    }
    apiRes();
    function apiShow(dataRec) {
        let apiDataNew = dataRec;
        catchRadioOutput.innerHTML = `<audio id="radioPlay" style="display:none" src="${apiDataNew.radios[11].url}" controls autoplay unmuted></audio>`;
        let catchRadioPlay = document.getElementById('radioPlay');
        catchRadioPlayBtn.onclick = function () {
            if (catchRadioPlay.paused) {
                catchRadioPlay.play();
                catchRadioPlayBtn.innerHTML = `<span style="color:green"><i class="fa-solid fa-pause"></i></span>`;
            } else {
                catchRadioPlay.pause();
                catchRadioPlayBtn.innerHTML = `<span style="color:red"><i class="fa-solid fa-play"></i></span>`;
            }
        }
    }
})();
//!For Radio Ends
//*For Surah Section Starts
(function () {
    let catchInputForSurah = document.getElementById('inputForSurah');
    let catchButtonForSurah = document.getElementById('buttonForSurah');
    let catchOutputBySurah = document.getElementById('outputBySurah');
    function getUserInput() {
        let inputValue = catchInputForSurah.value;
        if (isNaN(inputValue)) {
            alert('Please Enter Only Number');
        } else if (inputValue > 114) {
            alert('Please Enter 1 to 114 Number');
        } else {
            responseApiData(inputValue);
        }
    }
    function responseApiData(recInputValue) {
        let userInput = recInputValue;
        let apiLinkOne = fetch(`https://api.alquran.cloud/v1/surah/${userInput}/en.asad`)
        let apiLinkTwo = fetch(`https://api.alquran.cloud/v1/surah/${userInput}/ar.alafasy`)
        let apiLinkThree = fetch(`https://api.alquran.cloud/v1/surah/${userInput}/bn.bengali`)
        Promise.all([apiLinkOne, apiLinkTwo, apiLinkThree])
            .then(responses => Promise.all(responses.map(res => res.json())))
            .then(data => showApiData(data))
    }
    function showApiData(recData) {
        let apiData = recData;
        let count = 0;
        function playAudio() {
            let ayahCount = apiData[1].data.ayahs.length;
            if (count < ayahCount) {
                catchOutputBySurah.innerHTML = `
            <div class="surah_name"><div class="surah_name_ar"><p>${apiData[0].data.name}</p></div><div class="surah_name_en"><p>${apiData[0].data.englishName}</p></div></div>
            <div class="surah_audio"><audio id="surahPlay" src="${apiData[1].data.ayahs[count].audio}" controls autoplay></audio></div>
            <button id="playPauseBtn" onclick="playPause()"><span><i class="fa-solid fa-pause"></i></span></button>
            <div class="surah_ayah_ar"><p>${apiData[1].data.ayahs[count].text}</p></div>
            <div class="surah_ayah_en"><p>${apiData[0].data.ayahs[count].text}</p></div>
            <div class="surah_ayah_bn"><p>${apiData[2].data.ayahs[count].text}</p></div>
            `;
                let catchSurahPlay = document.getElementById('surahPlay');
                catchSurahPlay.onended = function () {
                    count++;
                    playAudio();
                }
                let catchPlayPauseBtn = document.getElementById('playPauseBtn');
                catchPlayPauseBtn.onclick = function () {
                    if (catchSurahPlay.paused) {
                        catchSurahPlay.play();
                        catchPlayPauseBtn.innerHTML = `<span><i class="fa-solid fa-pause"></i></span>`;
                    } else {
                        catchSurahPlay.pause();
                        catchPlayPauseBtn.innerHTML = `<span><i class="fa-solid fa-play"></i></span>`;
                    }
                }
            }
        }
        playAudio();
    }
    catchButtonForSurah.addEventListener('click', function () {
        getUserInput();
        catchInputForSurah.value = '';
    })
})();
//*For Surah Section Ends
//*For Live TV Section Starts
(function () {
    const videoo = document.getElementById('videoPlayer');
    const m3u8Url = 'https://media2.streambrothers.com:1936/8122/8122/playlist.m3u8';
    function tvFunc() {
        if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(m3u8Url);
            hls.attachMedia(videoo);
            hls.on(Hls.Events.MANIFEST_PARSED, () => video.play());
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = m3u8Url;
            video.addEventListener('loadedmetadata', () => video.play());
        } else {
            alert('Your browser does not support HLS streaming.');
        }
    }
    let catchMakkahBtn = document.getElementById('makkahBtn');
    catchMakkahBtn.addEventListener('click', function () {
        tvFunc();
    })
    let catchVideoClose = document.getElementById('videoClose');
    catchVideoClose.addEventListener('click', function () {
        videoo.pause();
    })
})();
const videoPeace = document.getElementById('videoPlayerPeace');
const m3u8UrlPeace = 'https://dzkyvlfyge.erbvr.com/PeaceTvBangla/index.m3u8';
function tvFuncPeace() {
    if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(m3u8UrlPeace);
        hls.attachMedia(videoPeace);
        hls.on(Hls.Events.MANIFEST_PARSED, () => video.play());
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = m3u8UrlPeace;
        video.addEventListener('loadedmetadata', () => video.play());
    } else {
        alert('Your browser does not support HLS streaming.');
    }
}
tvFuncPeace();
let catchVideoClosePeace = document.getElementById('videoClosePeace');
catchVideoClosePeace.addEventListener('click', function () {
    videoPeace.pause();
})
//*For Live TV Section Ends
