const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

//DIsable/Enable button
function toggleButton() {
    button.disabled = !button.disabled;
}

//passing joke to VoiceRSS API
function tellMe(joke) {
    VoiceRSS.speech({
        key: 'fbb458f2f5da4adb8086234944377d83',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

//get joke from joke API
async function getJoke() {
    const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Programming,Dark?blacklistFlags=nsfw,religious,political,racist,sexist';
    let joke = '';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if(data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        };
        //convret text o speech
        tellMe(joke);
        //disable button
        toggleButton()
    } catch (error) {
        console.log('Something went wrong', error);
    }
}

//add event listener on btton to get joke
button.addEventListener('click', getJoke);
audioElement.addEventListener('ended', toggleButton);