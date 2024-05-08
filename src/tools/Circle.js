import CanvasState from "../store/CanvasState";
import ToolState from "../store/ToolsState";
import Tool from "./Tool";

class Circle extends Tool {
  isDown = false;
  startX = null;
  startY = null;
  startImg = null;
  isFill = null;
  isStroke = null;

  constructor(canvas) {
    super(canvas);
    this.name = "circle";
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
    const props = ToolState.circleProps;
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
    this.startAnglePerc = props.startAnglePerc;
    this.endAnglePerc = props.endAnglePerc;
  }

  mouseDown(e) {
    this.isDown = true;
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
      const { x, y } = this.getPosition(e);
      const r1 = Math.abs(this.startX - x);
      const r2 = Math.abs(this.startY - y);
      const radius = Math.abs(Math.sqrt(r1 * r1 + r2 * r2));
      if (!this.isSpam) ctx.putImageData(this.img, 0, 0);
      ctx.beginPath();
      ctx.arc(
        this.startX,
        this.startY,
        Math.max(radius - ctx.lineWidth / 2, 0),
        Math.PI * ((this.startAnglePerc / 100) * 2),
        Math.PI * ((this.endAnglePerc / 100) * 2)
      );
      if (this.isFill) ctx.fill();
      ctx.closePath();
      ctx.beginPath();
      ctx.arc(
        this.startX,
        this.startY,
        radius,
        Math.PI * ((this.startAnglePerc / 100) * 2),
        Math.PI * ((this.endAnglePerc / 100) * 2)
      );
      if (this.isStroke) ctx.stroke();
      ctx.moveTo(this.startX, this.startY);
      ctx.closePath();
    }
  }
}

export default Circle;
