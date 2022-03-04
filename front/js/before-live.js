// const ws = new WebSocket("ws://localhost:8080/");
let StartTime = undefined;
let remaining = document.getElementById("remaining");

ws.addEventListener("message", (mes) =>{
    console.log(mes.data)
    const m = JSON.parse(mes.data);
    if (!m.startTime) {return}
    StartTime = (new Date(m.startTime)).getTime();
    console.log(StartTime)
})

setInterval(updateTime,1000);

function updateTime() {
    if (StartTime === undefined) {
        return
    }else {
        let time = timeNormalizer(
            Math.floor((new Date(StartTime).getTime() - new Date().getTime()) / 1000)
        );
        // console.info(time, Math.floor((new Date(StartTime).getTime() - new Date().getTime()) / 1000))
        remaining.innerText = time;
    }
}

function timeNormalizer(time){
    let [Min,Sec] = [Math.floor(time / 60), Math.floor(time % 60)];
    if (Min < 10) {
        Min = "0" + Min;
    }
    if (Sec < 10) {
        Sec = "0" + Sec;
    }

    if (time < 0){
        return "まもなく";
    }
    return `${Min}:${Sec}`;
}
