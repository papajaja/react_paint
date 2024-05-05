import CanvasState from "../store/CanvasState";
import Tool from "./Tool";

class SettingsTool extends Tool {
  shell = null;
  startX = null;
  startY = null;
  isMouseDown = false;
  scale = 1;

  constructor(canvas) {
    super(canvas);
    this.name = "settings";
    this.listen();
  }

  listen() {
    const cnvSh = CanvasState.canvasShell;
    this.shell = cnvSh;

    cnvSh.onmousedown = this.mouseDown.bind(this);
    cnvSh.onmousemove = this.mouseMove.bind(this);
    cnvSh.onmouseup = this.mouseUp.bind(this);
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
}

export default SettingsTool;
