// const ws = new WebSocket("ws://lt.sv12.laminne33569.net:8080/");

ws.addEventListener("open", () =>{
    console.log("opened");
});

ws.addEventListener("message", (mes) => {
    const m = JSON.parse(mes.data);
    if (typeof m.title === "string"){
        updateLtData(m)
    }else {
        return
    }
})

function updateLtData(data){
    document.getElementById("slide-title").innerText = data.title;
    document.getElementById("slide-author").innerText = data.author;
}
