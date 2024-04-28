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
    const cnv = this.canvas;
    cnv.onmousedown = this.mouseDown.bind(this);
    cnv.onmousemove = this.mouseMove.bind(this);
    cnv.onmouseup = this.mouseUp.bind(this);
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

      ctx.putImageData(this.img, 0, 0);
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
