// select DOM ----------------------------------------------------------------
const status = document.getElementById('status');
const root = document.getElementById('root');

const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const recognition = new speechRecognition();

// to toggle between activation of speech recognition
var recognitionActivated = false;

// speech recognition ---------------------------------------------------------
recognition.onstart = () =>
{
    recognitionActivated = true;
    status.innerHTML = '<i>Voice recognition activated. You may speak now.</i>';
}

recognition.onend = () =>
{
    recognitionActivated = false;
    status.innerHTML = '<i>Speech recognition deactivated. Press Space Bar to activate it.</i>';
};

recognition.onerror = (event) =>
{
    recognitionActivated = false;
    console.log('Speech recognition error detected: ' + event.error);
};

//------------------------------------------------------------------------------

// functions -------------------------------------------------------------------
const readText = (msg) =>
{
    if(msg == 'exit') root.innerHTML = '';

    else
    {
        const speech = new SpeechSynthesisUtterance();
        speech.text = msg;
        speech.volume = 2; speech.rate = 1.5; speech.pitch = 1;

        root.innerHTML += '<li>' + msg + '</li><br>';
        window.speechSynthesis.speak(speech);
    }
}

// get text & talk
recognition.onresult = (event) =>
{
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript;

    readText(transcript);
}

// event listener
window.addEventListener("keyup", (event) =>
{
    if(event.keyCode === 32 && recognitionActivated === true) recognition.stop();

    else if(event.keyCode === 32) recognition.start();
});

// -----------------------------------------------------------------------------