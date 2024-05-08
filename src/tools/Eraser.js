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
    const cnvSh = CanvasState.canvasShell;

    cnvSh.onpointerdown = this.mouseDown.bind(this);
    cnvSh.onpointerup = this.mouseUp.bind(this);
    cnvSh.oncontextmenu = (e) => {
      e.preventDefault();
    };

    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    ) {
      cnvSh.ontouchmove = this.mouseMove.bind(this);
    } else {
      cnvSh.onpointermove = this.mouseMove.bind(this);
    }

    // cnvSh.ontouchstart = this.mouseDown.bind(this);
    // cnvSh.ontouchend = this.mouseUp.bind(this);
  }

  getPosition(event) {
    const rect = this.canvas.getBoundingClientRect();
    const touch = event.touches ? event.touches[0] : event;
    // console.log("touch", touch);
    return {
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
    };
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
    // this.startX = e.clientX - this.canvas.offsetLeft + CanvasState.canvasShell.scrollLeft;
    // this.startY = e.clientY - this.canvas.offsetTop + CanvasState.canvasShell.scrollTop;
    const { x, y } = this.getPosition(e);
    this.startX = x;
    this.startY = y;

    this.setProps();
    const ctx = this.context;
    ctx.beginPath();
    ctx.moveTo(this.startX, this.startY);
  }

  mouseUp(e) {
    if (!this.isDrawn) {
      // const x = e.clientX - this.canvas.offsetLeft + CanvasState.canvasShell.scrollLeft;
      // const y = e.clientY - this.canvas.offsetTop + CanvasState.canvasShell.scrollTop;
      const { x, y } = this.getPosition(e);
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
      // const x = e.clientX - this.canvas.offsetLeft + CanvasState.canvasShell.scrollLeft;
      // const y = e.clientY - this.canvas.offsetTop + CanvasState.canvasShell.scrollTop;
      const { x, y } = this.getPosition(e);

      ctx.lineTo(x, y);
      ctx.stroke();
    }
  }
}

export default Eraser;
