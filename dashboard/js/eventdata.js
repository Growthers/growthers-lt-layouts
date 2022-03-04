import {ws, send} from "./websocketcontrol.js";

const upload = document.getElementById("loadbutton");
const file = document.getElementById("upload");
const eventTitle = document.getElementById("eventTitle");
const startTime = document.getElementById("eventStartTime");
const listContainer = document.getElementById("ltList");

const nowLtTitle = document.getElementById("nowLtTitle");
const nowLtSpeaker = document.getElementById("nowLtSpeaker");
const nowLtTimeFrame = document.getElementById("nowLtTimeFrame");
const nowLtTime = document.getElementById("nowLtTime");
const nowLtCalculatedTime = document.getElementById("nowLtCalculatedTime");

const nextLtTitle = document.getElementById("nextLtTime");
const nextLtSpeaker = document.getElementById("nextLtSpeaker");
const nextLtTimeFrame = document.getElementById("nextLtTimeFrame");
const nextLtTime = document.getElementById("nextLtTime");
const nextLtCalculatedTime = document.getElementById("nextLtCalculatedTime");

// setInterval(calculateTime, 1000);

upload.onclick = () => {
    if (localStorage.getItem("EventData")) {
        // console.log(localStorage.getItem("EventData"));
        loadEventData(JSON.parse(localStorage.getItem("EventData")));
        return;
    }
    const fileData = file.files;
    const reader = new FileReader();

    reader.readAsText(fileData[0]);
    reader.onload = () => {
        // console.log(localStorage.getItem("EventData"));
        localStorage.setItem("EventData", reader.result);
        const eventData = JSON.parse(reader.result);
        loadEventData(eventData);
    }
}

export function loadEventData(eventData){
    updateLtData();
    setInterval(updateLtData,1000)
    eventTitle.innerText = eventData.eventName;
    startTime.innerText = (new Date(eventData.startTime)).toLocaleString("ja-JP");
    listContainer.innerHTML = ""
    // const dataForUpdate ={
    //     now: localStorage.getItem("Now") ?? 0,
    //     speakers: eventData.speakers
    // }
    send(eventData);
    // send(dataForUpdate);

    for (let i=0;i<eventData.speakers.length; i++){
        if (!localStorage.getItem("Now") && i===0){
            listContainer.innerHTML += `<div class="bg-amber-500 m-5 rounded" id="data-0">
                <p>Title: ${eventData.speakers[i].title}</p>
                <p>Speaker: ${eventData.speakers[i].author}</p>
                <p>Duration: ${eventData.speakers[i].duration}</p>
            </div>`
            continue;
        }
        if (Number(localStorage.getItem("Now")) === i) {
            listContainer.innerHTML += `<div class="bg-amber-500 m-5 rounded" id="data-${i}">
                <p>Title: ${eventData.speakers[i].title}</p>
                <p>Speaker: ${eventData.speakers[i].author}</p>
                <p>Duration: ${eventData.speakers[i].duration}</p>
            </div>`
            continue;
        }
        if (Number(localStorage.getItem("Now")) > i) {
            listContainer.innerHTML += `<div class="bg-gray-500 m-5 rounded" id="data-${i}">
                <p>Title: ${eventData.speakers[i].title}</p>
                <p>Speaker: ${eventData.speakers[i].author}</p>
                <p>Duration: ${eventData.speakers[i].duration}</p>
            </div>`
            continue;
        }
        listContainer.innerHTML += `<div class="bg-blue-500 m-5 rounded" id="data-${i}">
                <p>Title: ${eventData.speakers[i].title}</p>
                <p>Speaker: ${eventData.speakers[i].author}</p>
                <p>Duration: ${eventData.speakers[i].duration}</p>
            </div>`
    }
}

function updateLtData(){
    const data = JSON.parse(localStorage.getItem("EventData"));
    const now = localStorage.getItem("Now") || 0;
    const calculatedTime = calculateTime();

    nowLtTitle.innerText = `タイトル: ${data.speakers[now].title}`;
    nowLtSpeaker.innerText = `発表者: ${data.speakers[now].author}`;
    nowLtTimeFrame.innerText = `発表枠: ${data.speakers[now].duration}`;
    if (now === 0 || !now){
        nowLtTime.innerText = `開始/終了時間(予定): ${data.startTime} | ${calculatedTime[now]}`
    } else {
        nowLtTime.innerText = `開始/終了時間(予定): ${calculatedTime[now-1]} | ${calculatedTime[now]}`
    }
    const delay = calculateDelay(calculatedTime[now]);
    const [Min,Sec] = [Math.floor(delay / 60), delay % 60];
    if (delay >= 0) {
        nowLtCalculatedTime.innerText = `開始/終了時間: | ${Min -1}:${Sec} 早い`
    } else {
        nowLtCalculatedTime.innerText = `開始/終了時間: | ${Math.abs(Min)}:${Math.abs(Sec)} 遅い`
    }

}

// イベントデータから予定終了時間を求める
function calculateTime(){

    // ToDo: LTの"時間"に質疑応答なども含める
    const data = JSON.parse(localStorage.getItem("EventData"));
    const startTime = new Date(data.startTime); // イベントの開始時間
    // console.log(startTime)
    let ScheduledLtTime = []; // LTの予定*終了*時間
    for (let i=0; data.speakers.length > i; i++){
        if (i!==0){
            ScheduledLtTime.push(new Date(new Date(ScheduledLtTime[i-1]).getTime() + ((Number(data.speakers[i].duration) * 60) * 1000)).toLocaleString("ja-JP"));

            // console.log(Number(data.speakers[i].duration),
            //     new Date(new Date(ScheduledLtTime[i-1]).getTime() + ((Number(data.speakers[i].duration) * 60) * 1000)).toLocaleString("ja-JP")
            // );
            continue
        }
        if (i===0){
            ScheduledLtTime.push(
                new Date(
                    startTime.getTime() + ((Number(data.speakers[i].duration) * 60 )* 1000)
                ).toLocaleString("ja-JP")
            );
            // console.log(new Date(
            //     startTime.getTime() + ((Number(data.speakers[i].duration) * 60 )* 1000)
            // ).toLocaleString("ja-JP"))
        }
    }
    // console.table(ScheduledLtTime)

    return ScheduledLtTime;
}

// 実時間と予定時刻とのずれを計算する
function calculateDelay(calculateEndTime){
    const now = new Date();

    return Math.floor((new Date(calculateEndTime).getTime() - now.getTime()) / 1000);

}
