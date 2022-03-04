
ws.addEventListener("message", (mes) => {
    const m = JSON.parse(mes.data);
    if (m.now) {
        console.info(m.speakers, Number(m.now))
        updateList(m.speakers, Number(m.now));
    } else {
        return
    }
})

function updateList(data, now){
    for (let i=0;i<4;i++){
        console.info(i,data[i])
        if (!data[now + i]){
            document.getElementById(`lt-${i}-container`).style.display = "none";
            continue;
        }
        if (document.getElementById(`lt-${i}-container`).style.display === "none") {
            document.getElementById(`lt-${i}-container`).style.display = "block";
        }
        document.getElementById(`lt-${i}-title`).innerText = data[i + now].title;
        document.getElementById(`lt-${i}-author`).innerText = data[i + now].author;
    }
}
