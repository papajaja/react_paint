import CanvasState from "../store/CanvasState";
import Tool from "./Tool";

class Move extends Tool {
  shell = null;
  startX = null;
  startY = null;
  isMouseDown = false;
  scale = 1;

  constructor(canvas) {
    super(canvas);
    this.name = "move";
    this.listen();
  }

  listen() {
    const cnvSh = CanvasState.canvasShell;
    this.shell = cnvSh;

    cnvSh.onmousedown = this.mouseDown.bind(this);
    cnvSh.onmousemove = this.mouseMove.bind(this);
    cnvSh.onmouseup = this.mouseUp.bind(this);
    cnvSh.onwheel = this.mouseWheel.bind(this); // Добавляем обработчик события колесика мыши
  }

  mouseDown(e) {
    const scrollLeft = this.shell.scrollLeft;
    const scrollTop = this.shell.scrollTop;

    this.scrollLeft = scrollLeft;
    this.scrollTop = scrollTop;

    this.startX = e.clientX;
    this.startY = e.clientY;

    this.isMouseDown = true;
  }

  mouseUp(e) {
    this.isMouseDown = false;
  }

  mouseMove(e) {
    if (this.isMouseDown && e.buttons & 1) {
      const scrollLeft = this.shell.scrollLeft;
      const scrollTop = this.shell.scrollTop;

      const x = this.startX - e.clientX + this.scrollLeft;
      const y = this.startY - e.clientY + this.scrollTop;

      this.shell.scroll(x, y);
    }
  }

  mouseWheel(e) {
    const scaleSpeed = 0.5; // Скорость прокрутки
    const delta = Math.max(-1, Math.min(1, e.deltaY)); // Получаем направление колесика
    const computedStyle = window.getComputedStyle(this.shell);

    // Изменяем масштаб с учетом направления колесика
    if (delta < 0) {
      this.canvas.style.scale = Math.min(this.scale + scaleSpeed, 100);
      this.scale = Math.min(this.scale + scaleSpeed, 100);
      // console.log(computedStyle.scale);
    } else {
      this.canvas.style.scale = Math.max(this.scale - scaleSpeed, 0.5);
      this.scale = Math.max(this.scale - scaleSpeed, 0.5);
    }
    console.log(this.scale);

    // Отменяем стандартное поведение страницы при прокрутке колесиком
    e.preventDefault();
  }
}

export default Move;
