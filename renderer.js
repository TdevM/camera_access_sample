// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const MediaStreamRecorder = require('./msr');
const {ipcRenderer} = require("electron");

let mediaRecorder = null
const onDataAvailable = (blob) => {
    ipcRenderer.send("download", {
        url: URL.createObjectURL(blob),
        properties: {directory: '/Users/tdevm/Downloads'}
    });
}

document.getElementById("download_file").onclick = (event) => {
    console.log('Event recorded')
    mediaRecorder.stop()
}

navigator.getUserMedia({audio: true, video: true}, onMediaSuccess, onMediaError);


function onMediaSuccess(stream) {
    document.getElementById("video").srcObject = stream
    mediaRecorder = new MediaStreamRecorder(stream);
    mediaRecorder.mimeType = 'video/webm';
    mediaRecorder.ondataavailable = onDataAvailable
    mediaRecorder.start();
}

function onMediaError(e) {
    console.error('media error', e);
}
