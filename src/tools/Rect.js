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
    const cnv = this.canvas;
    cnv.onmousedown = this.mouseDown.bind(this);
    cnv.onmousemove = this.mouseMove.bind(this);
    cnv.onmouseup = this.mouseUp.bind(this);
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
    this.startX = e.clientX - e.target.offsetLeft;
    this.startY = e.clientY - e.target.offsetTop;

    this.setProps();

    const ctx = this.context;
    this.img = ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
  }

  mouseUp(e) {
    this.isDown = false;
  }

  mouseMove(e) {
    if (this.isDown && e.buttons & 1) {
      const ctx = this.context;

      const x = e.clientX - e.target.offsetLeft;
      const y = e.clientY - e.target.offsetTop;

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
