import {loadEventData} from "./eventdata.js";
import {ws,send} from "./websocketcontrol.js";

ws.addEventListener('message', m => {
    JSON.parse(m.data);
});

document.getElementById("backButton").onclick = () => {
    if (!localStorage.getItem("Now")) {
        // 現在のLTが何も入ってない時
        localStorage.setItem("Now", "0");
    } else {
        let Num = Number(localStorage.getItem("Now"));
        if (Number(Num) - 1 < 0){
            return
        }
        localStorage.setItem("Now", String(Num-1));
        loadEventData(JSON.parse(localStorage.getItem("EventData")));
    }
}

document.getElementById("nextButton").onclick = () => {
    if (!localStorage.getItem("Now")) {
        // 現在のLTが何も入ってない時
        localStorage.setItem("Now", "0");
    } else {
        let Num = Number(localStorage.getItem("Now"));
        localStorage.setItem("Now", String(Num+1));
        loadEventData(JSON.parse(localStorage.getItem("EventData")));
    }
}

document.getElementById("clear").onclick = () => {
    localStorage.clear();
    alert("キャッシュをすべて廃棄しました。\nLoadボタンを押してください");
}

document.getElementById("update").onclick = () => {
    const data = JSON.parse(localStorage.getItem("EventData"));
    const Num = Number(localStorage.getItem("Now"));
    console.info(data)
    send(data.speakers[Num]);
    const eventData = JSON.parse(localStorage.getItem("EventData"))
    const dataForUpdate ={
        now: localStorage.getItem("Now") ?? 0,
        speakers: eventData.speakers
    }
    console.info(dataForUpdate)
    send(dataForUpdate);

    console.info("配信画面の表示更新完了")
}
