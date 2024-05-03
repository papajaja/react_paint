import CanvasState from "../store/CanvasState";
import ToolState from "../store/ToolsState";
import Tool from "./Tool";

class Eraser extends Tool {
  constructor(canvas) {
    super(canvas);
    this.name = "eraser";
    this.listen();
  }

  listen() {
    const cnv = this.canvas;
    const cnvSh = CanvasState.canvasShell;

    cnvSh.onmousedown = this.mouseDown.bind(this);
    cnvSh.onmousemove = this.mouseMove.bind(this);
    cnvSh.onmouseup = this.mouseUp.bind(this);
  }

  setProps() {
    const ctx = this.context;
    const props = ToolState.eraserProps;
    ctx.lineCap = props.lineCap;
    ctx.lineJoin = props.lineJoin;
    ctx.lineWidth = props.lineWidth;
    ctx.shadowBlur = props.shadowBlur;
    ctx.shadowColor = props.shadowColor;
    ctx.strokeStyle = window
      .getComputedStyle(CanvasState.canvas)
      .getPropertyValue("background-color");
    // console.log(window.getComputedStyle(CanvasState.canvas).getPropertyValue("background-color"));
  }

  mouseDown(e) {
    this.isDown = true;
    this.startX = e.clientX - e.target.offsetLeft;
    this.startY = e.clientY - e.target.offsetTop;

    this.setProps();
    const ctx = this.context;
    ctx.beginPath();
    ctx.moveTo(this.startX, this.startY);
  }

  mouseUp(e) {
    if (!this.isDrawn) {
      const x = e.clientX - e.target.offsetLeft;
      const y = e.clientY - e.target.offsetTop;
      const ctx = this.context;
      ctx.beginPath();
      ctx.arc(x, y, ctx.lineWidth / 2, 0, 2 * Math.PI);
      ctx.fillStyle = ctx.strokeStyle;
      ctx.fill();
      ctx.closePath();
    }
    this.isDown = false;
    this.isDrawn = false;
  }

  mouseMove(e) {
    if (this.isDown) {
      this.isDrawn = true;
      const ctx = this.context;
      const x = e.clientX - e.target.offsetLeft;
      const y = e.clientY - e.target.offsetTop;

      ctx.lineTo(x, y);
      ctx.stroke();
    }
  }
}

export default Eraser;
