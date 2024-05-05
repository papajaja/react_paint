import CanvasState from "../store/CanvasState";
import ToolState from "../store/ToolsState";
import Tool from "./Tool";

class Brush extends Tool {
  isDown = false;
  isDrawn = false;
  startX = null;
  startY = null;

  constructor(canvas) {
    super(canvas);
    this.name = "brush";
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
    const props = ToolState.brushProps;
    ctx.lineCap = props.lineCap;
    ctx.lineJoin = props.lineJoin;
    ctx.lineWidth = props.lineWidth;
    ctx.shadowBlur = props.shadowBlur;
    ctx.shadowColor = props.shadowColor;
    ctx.strokeStyle = props.strokeStyle;
  }

  mouseDown(e) {
    const ctx = this.context;

    this.isDown = true;
    this.startX = e.clientX - this.canvas.offsetLeft + CanvasState.canvasShell.scrollLeft;
    this.startY = e.clientY - this.canvas.offsetTop + CanvasState.canvasShell.scrollTop;

    this.setProps();

    ctx.beginPath();
    ctx.moveTo(this.startX, this.startY);
    ctx.closePath();
  }

  mouseUp(e) {
    if (!this.isDrawn) {
      const ctx = this.context;
      const x = e.clientX - this.canvas.offsetLeft + CanvasState.canvasShell.scrollLeft;
      const y = e.clientY - this.canvas.offsetTop + CanvasState.canvasShell.scrollTop;
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
    if (this.isDown && e.buttons & 1) {
      this.isDrawn = true;
      const ctx = this.context;
      const props = ToolState.brushProps;

      const x =
        e.clientX - this.canvas.offsetLeft - window.scrollX + CanvasState.canvasShell.scrollLeft;
      const y =
        e.clientY - this.canvas.offsetTop - window.scrollY + CanvasState.canvasShell.scrollTop;

      ctx.beginPath();
      ctx.moveTo(this.startX, this.startY);
      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.closePath();

      this.startX = x;
      this.startY = y;
    }
  }
}

export default Brush;
