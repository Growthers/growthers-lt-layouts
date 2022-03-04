const ws = new WebSocket("ws://lt.sv12.laminne33569.net:8080/");
document.getElementById("tweetContainer").innerHTML = "<div class='dummyTweet'></div>";

ws.addEventListener("open", () =>{
   console.log("opened");
});

ws.addEventListener("message", (mes) => {
    const m = JSON.parse(mes.data);
    if (typeof m.id === "string"){
        console.error(m);
        addTweetToContainer(m);
    }else {
        return
    }
})

// let c = 0;
// setInterval(() => {
//     c++
//     document.getElementById("tweetContainer").scrollTop = document.getElementById("tweetContainer").scrollHeight;
//     document.getElementById("tweetContainer").innerHTML += `
//         <div class="tweet">
//             <div class="tweetData">
//                 <p class="content">${a.content} ${c}</p>
//                 <hr>
//                 <p class="userName">${a.name} (@${a.id})</p>
//             </div>
//         </div>
//     `;
// }, 1000)


function addTweetToContainer(a) {
    document.getElementById("tweetContainer").scrollTop = document.getElementById("tweetContainer").scrollHeight;

    if (a.id === "Discord"){
        document.getElementById("tweetContainer").innerHTML += `
        <div class="tweet">
            <div class="tweetData">
                <p class="content">${a.content}</p>
                <hr>
                <p class="userName">${a.name} (#${a.id})</p>
            </div>
        </div>
    `;
        document.getElementById("tweetContainer").scrollTop = document.getElementById("tweetContainer").scrollHeight;
        return
    }
    document.getElementById("tweetContainer").innerHTML += `
        <div class="tweet">
            <div class="tweetData">
                <p class="content">${a.content}</p>
                <hr>
                <p class="userName">${a.name} (@${a.id})</p>
            </div>
        </div>
    `;
    document.getElementById("tweetContainer").scrollTop = document.getElementById("tweetContainer").scrollHeight;

}