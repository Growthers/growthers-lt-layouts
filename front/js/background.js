const Sleep = (ms) => new Promise((r) => setTimeout(r,ms))

async function drawBackGround(arg) {
  const backgroundContainer = document.getElementById("backGround");

  for (let i=0; i<120; i++) {
    // 位置決め
    let [x,y,size,speed] = [Math.floor(Math.random() * 100), Math.floor(Math.random() * 100) + arg,0,""]
    for (;;){
      const rand = Math.floor(Math.random() * 100);
      if (rand > 12 || rand < 2) {
      } else {
        switch (rand % 3) {
          case 0:
            speed = "star_normal star";
            break;
          case 1:
            speed = "star_slow star";
            break;
          case 2:
            speed = "star_fast star"
        }
        size = rand;
        break;
      }
    }

    const elm = document.createElement('img');
    elm.src = 'assets/star.svg';
    elm.setAttribute("style", `position:absolute; top: ${y}%; left: ${x}%;`)
    elm.setAttribute("class", speed);
    elm.height = size;
    elm.width = size;
    backgroundContainer.appendChild(elm);
  }
}

window.onload = drawBackGround(0);