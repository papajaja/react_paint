import CanvasState from "../store/CanvasState";
import ToolState from "../store/ToolsState";
import Tool from "./Tool";

class Line extends Tool {
  isDown = false;
  startX = null;
  startY = null;
  startImg = null;

  constructor(canvas) {
    super(canvas);
    this.name = "line";
    this.listen();
  }

  listen() {
    // const cnv = this.canvas;
    const cnvSh = CanvasState.canvasShell;

    cnvSh.onpointerdown = this.mouseDown.bind(this);
    cnvSh.onpointerup = this.mouseUp.bind(this);
    cnvSh.oncontextmenu = (e) => {
      e.preventDefault();
      console.log("context");
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
    return {
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
    };
  }

  setProps() {
    const ctx = this.context;
    const props = ToolState.lineProps;
    ctx.lineCap = props.lineCap;
    ctx.lineJoin = props.lineJoin;
    ctx.lineWidth = props.lineWidth;
    ctx.shadowBlur = props.shadowBlur;
    ctx.shadowColor = props.shadowColor;
    ctx.strokeStyle = props.strokeStyle;
    this.isSpam = props.isSpam;
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
    this.img = ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
  }

  mouseUp(e) {
    this.isDown = false;
  }

  mouseMove(e) {
    if (this.isDown) {
      const ctx = this.context;

      // const x = e.clientX - this.canvas.offsetLeft + CanvasState.canvasShell.scrollLeft;
      // const y = e.clientY - this.canvas.offsetTop + CanvasState.canvasShell.scrollTop;
      const { x, y } = this.getPosition(e);

      if (!this.isSpam) ctx.putImageData(this.img, 0, 0);
      ctx.beginPath();
      ctx.moveTo(this.startX, this.startY);
      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.moveTo(this.startX, this.startY);
      ctx.closePath();
    }
  }
}

export default Line;
