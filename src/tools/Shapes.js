import ToolState from "../store/ToolsState";
import Tool from "./Tool";

class Shapes extends Tool {
  isDown = false;
  isDrawn = false;
  startX = null;
  startY = null;
  shapeIndex = null;
  angle = 0;

  constructor(canvas) {
    super(canvas);
    this.name = "shapes";
    this.listen();
  }

  listen() {
    const cnv = this.canvas;
    cnv.onmousedown = this.mouseDown.bind(this);
    cnv.onmousemove = this.mouseMove.bind(this);
    cnv.onmouseup = this.mouseUp.bind(this);
  }

  setProps(shape) {
    const ctx = this.context;

    ctx.lineCap = shape.lineCap;
    ctx.fillStyle = shape.fillStyle;
    ctx.lineJoin = shape.lineJoin;
    ctx.lineWidth = shape.lineWidth;
    ctx.shadowBlur = shape.shadowBlur;
    ctx.shadowColor = shape.shadowColor;
    ctx.strokeStyle = shape.strokeStyle;
  }

  mouseDown(e) {
    this.isDown = true;
    this.startX = e.clientX - e.target.offsetLeft;
    this.startY = e.clientY - e.target.offsetTop;

    // this.setProps();

    const ctx = this.context;
    ctx.beginPath();
    ctx.moveTo(this.startX, this.startY);
    ctx.closePath();
  }

  mouseUp(e) {
    if (!this.isDrawn) {
      for (let i = 0; i < ToolState.shapes.length; i++) {
        const x = e.clientX - e.target.offsetLeft;
        const y = e.clientY - e.target.offsetTop;

        const shape = ToolState.shapes[i];
        this.setProps(shape);
        this.drawShape(
          x + shape.offsetX,
          y + shape.offsetY,
          shape.radius,
          shape.inset,
          shape.corners,
          shape
        );
      }
    }
    this.isDown = false;
    this.isDrawn = false;
  }

  mouseMove(e) {
    if (this.isDown && e.buttons & 1) {
      this.isDrawn = true;
      // const ctx = this.context;

      const x = e.clientX - e.target.offsetLeft;
      const y = e.clientY - e.target.offsetTop;

      for (let i = 0; i < ToolState.shapes.length; i++) {
        const shape = ToolState.shapes[i];
        this.setProps(shape);
        this.drawShape(
          x + shape.offsetX,
          y + shape.offsetY,
          shape.radius,
          shape.inset,
          shape.corners,
          shape
        );
      }
    }
  }

  drawShape(x, y, radius, inset, corners, shape) {
    const ctx = this.context;

    ctx.beginPath();
    ctx.save();
    ctx.translate(x, y);
    ctx.moveTo(0, 0 - radius);

    for (let i = 0; i < corners; i++) {
      ctx.rotate(Math.PI / corners);
      ctx.lineTo(0, 0 - radius * inset);
      ctx.rotate(Math.PI / corners);
      ctx.lineTo(0, 0 - radius);
    }

    ctx.restore();
    if (shape.isStroke) ctx.stroke();
    if (shape.isFill) ctx.fill();
  }
}

export default Shapes;
