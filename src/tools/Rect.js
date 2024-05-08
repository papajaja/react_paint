import CanvasState from "../store/CanvasState";
import ToolState from "../store/ToolsState";
import Tool from "./Tool";

class Rect extends Tool {
  isDown = false;
  startX = null;
  startY = null;
  startImg = null;
  isFill = null;
  isStroke = null;

  constructor(canvas) {
    super(canvas);
    this.name = "rect";
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
    const props = ToolState.rectProps;
    ctx.fillStyle = props.fillStyle;
    ctx.lineCap = props.lineCap;
    ctx.lineJoin = props.lineJoin;
    ctx.lineWidth = props.lineWidth;
    ctx.shadowBlur = props.shadowBlur;
    ctx.shadowColor = props.shadowColor;
    ctx.strokeStyle = props.strokeStyle;
    this.isFill = props.isFill;
    this.isStroke = props.isStroke;
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
      ctx.rect(this.startX, this.startY, x - this.startX, y - this.startY);
      if (this.isFill) ctx.fill();
      if (this.isStroke) ctx.stroke();
      ctx.moveTo(this.startX, this.startY);
      ctx.closePath();
    }
  }
}

export default Rect;
