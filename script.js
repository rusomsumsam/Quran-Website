"use strict"
//*For Surah Section Starts
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
//*For Surah Section Ends

