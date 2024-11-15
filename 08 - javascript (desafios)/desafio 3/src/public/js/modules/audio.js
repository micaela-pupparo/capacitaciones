const grabarBoton = document.querySelector("#grabarBoton");
const pararBoton = document.querySelector("#pararBoton");
const audio = document.querySelector("#audio");

let mediaRecorder;
let audioChunks = [];
let audioURL;

grabarBoton.addEventListener("click", empezarGrabacion);
pararBoton.addEventListener("click", detenerGrabacion);

async function empezarGrabacion(event) {
  event.preventDefault();
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  mediaRecorder = new MediaRecorder(stream);

  mediaRecorder.ondataavailable = (event) => {
    audioChunks.push(event.data);
  };

  mediaRecorder.onstop = () => {
    const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
    audioURL = URL.createObjectURL(audioBlob);
    audio.src = audioURL;

    console.log("audio grabado", audioURL);
  };

  mediaRecorder.start();
  grabarBoton.disabled = true;
  pararBoton.disabled = false;
}

function detenerGrabacion(event) {
  event.preventDefault();
  mediaRecorder.stop();
  grabarBoton.disabled = false;
  pararBoton.disabled = true;
}

export function obtenerAudioURL() {
  return audioURL;
}
