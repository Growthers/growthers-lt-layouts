const CLOCK = document.getElementById("clock");

setInterval(updateClockTime, 1000)
function updateClockTime (){
    const Time = new Date();

    const [Hour,Min,Sec] = [Time.getHours(), Time.getMinutes(), Time.getSeconds()]

    CLOCK.innerText = `${Hour}:${Min}:${Sec}`
}
