const body = document.getElementsByTagName('body')[0];
const colorPalette = document.getElementsByClassName('color-palette')[0];
const textElem = document.getElementsByClassName('text')[0];
const fpsElem = document.getElementsByClassName('fps')[0];
const colorsElem = document.getElementsByClassName('colors')[0];

let count = 0;
let colors = 2;

function clickBtn(plusOrMinus) {
  switch (plusOrMinus) {
    case '+':
      colors++;
      prepareColors();
      break;
    case '-':
      if (colors !== 1) {
        colors--;
        prepareColors();
      }
      break;
    default:
      throw new Error('This should not happen!!');
  }
}

function prepareColors() {
  colorsElem.innerHTML = `${colors} colors`;
  colorPalette.innerHTML = '';
  for (let i = 0; i < colors; i++) {
    const div = document.createElement('div');
    div.style.backgroundColor = `hsl(${i * 360 / colors}, 100%, 50%)`;
    colorPalette.appendChild(div);
  }
}

prepareColors();

let tempTime;
let prevTime;
let lastFpsTime = 0;

function animate() {
  requestAnimationFrame(animate);

  count++;

  prevTime = tempTime;
  tempTime = new Date().getTime();
  if ( new Date().getTime() - lastFpsTime > 100 ) {
    lastFpsTime = new Date().getTime();
    const fps = 1 / ((tempTime - prevTime) / 1000);
    fpsElem.innerHTML = `${Math.floor(fps)} FPS`;
  }

  textElem.style.color = `hsl(${(count % colors) * 360 / colors}, 100%, 50%)`;
}

animate();
