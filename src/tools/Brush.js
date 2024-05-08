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
  }

  getPosition(event) {
    const rect = this.canvas.getBoundingClientRect();
    const touch = event.touches ? event.touches[0] : event;
    return {
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
    };
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
    e.preventDefault();
    const ctx = this.context;

    this.isDown = true;
    const { x, y } = this.getPosition(e);
    // this.startX = e.clientX - this.canvas.offsetLeft + CanvasState.canvasShell.scrollLeft;
    // this.startY = e.clientY - this.canvas.offsetTop + CanvasState.canvasShell.scrollTop;
    this.startX = x;
    this.startY = y;
    // console.log("down", this.isDown);

    this.setProps();

    ctx.beginPath();
    ctx.moveTo(this.startX, this.startY);
    ctx.closePath();
  }

  mouseUp(e) {
    e.preventDefault();
    // console.log("up", this.isDrawn);
    if (!this.isDrawn) {
      const ctx = this.context;
      const { x, y } = this.getPosition(e);
      // const x = e.clientX - this.canvas.offsetLeft + CanvasState.canvasShell.scrollLeft;
      // const y = e.clientY - this.canvas.offsetTop + CanvasState.canvasShell.scrollTop;
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
    e.preventDefault();
    if (this.isDown) {
      // console.log("movving!");
      // console.log("just move");
      this.isDrawn = true;
      const ctx = this.context;
      const props = ToolState.brushProps;

      // const x =
      //   e.clientX - this.canvas.offsetLeft - window.scrollX + CanvasState.canvasShell.scrollLeft;
      // const y =
      //   e.clientY - this.canvas.offsetTop - window.scrollY + CanvasState.canvasShell.scrollTop;
      const { x, y } = this.getPosition(e);

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
