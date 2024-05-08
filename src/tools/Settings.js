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

    cnvSh.onpointerdown = this.mouseDown.bind(this);
    cnvSh.onpointerup = this.mouseUp.bind(this);
    cnvSh.oncontextmenu = (e) => {
      e.preventDefault();
    };

    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    ) {
      cnvSh.ontouchmove = this.mouseMove.bind(this);
      document.body.oncontextmenu = (e) => {
        e.preventDefault();
      };
    } else {
      cnvSh.onpointermove = this.mouseMove.bind(this);
    }
  }

  getPosition(event) {
    const touch = event.touches ? event.touches[0] : event;
    return {
      x: touch.clientX,
      y: touch.clientY,
    };
  }

  mouseDown(e) {
    const scrollLeft = this.shell.scrollLeft;
    const scrollTop = this.shell.scrollTop;

    this.scrollLeft = scrollLeft;
    this.scrollTop = scrollTop;

    const { x, y } = this.getPosition(e);

    this.startX = x;
    this.startY = y;

    this.isMouseDown = true;
  }

  mouseUp(e) {
    this.isMouseDown = false;
  }

  mouseMove(e) {
    if (this.isMouseDown) {
      const { x, y } = this.getPosition(e);

      const x1 = this.startX - x + this.scrollLeft;
      const y1 = this.startY - y + this.scrollTop;

      this.shell.scroll(x1, y1);
    }
  }
}

export default SettingsTool;
