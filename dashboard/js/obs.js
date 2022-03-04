const obs = new OBSWebSocket();

let StreamingStartTime = undefined;

obs.connect({address: 'localhost:4444'}).then(r => getStatus()).catch((e) => {
    console.error(e);
});

setInterval(getStatus, 1000);
setInterval(updateStreamingDuration, 1000);

async function getStatus(){
    const status = document.getElementById("status");
    const streamingStatus = await obs.send('GetStreamingStatus');
    if (streamingStatus.streaming === true) {
        if (StreamingStartTime === undefined) {
            StreamingStartTime = new Date();
        }
        status.innerText = "ON AIR";
        status.setAttribute("class", "text-3xl text-red-700");
    }else {
        StreamingStartTime = undefined;
        status.innerText = "STAND BY";
        status.setAttribute("class", " text-3xl text-blue-700");
    }
}

function updateStreamingDuration(){
    const duration = Math.floor((new Date() - StreamingStartTime) / 1000);
    let [Hour, Min, Sec] = [Math.floor(duration / 3600), Math.floor(duration/60) % 60, duration % 60];
    document.getElementById("streamingDuration").innerText = `${Hour}:${Min}:${Sec}`;
}
