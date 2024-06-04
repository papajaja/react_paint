import CanvasState from "../store/CanvasState";
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
      cnvSh.onmousemove = this.mouseMove.bind(this);
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
    // this.startX = e.clientX - this.canvas.offsetLeft;

    // this.startY = e.clientY - this.canvas.offsetTop;
    const { x, y } = this.getPosition(e);
    this.startX = x;
    this.startY = y;

    // this.setProps();

    const ctx = this.context;
    ctx.beginPath();
    ctx.moveTo(this.startX, this.startY);
    ctx.closePath();
  }

  mouseUp(e) {
    if (!this.isDrawn) {
      this.isDrawn = true;
      const ctx = this.context;

      // const x = e.clientX - this.canvas.offsetLeft + CanvasState.canvasShell.scrollLeft;
      // const y = e.clientY - this.canvas.offsetTop + CanvasState.canvasShell.scrollTop;
      const { x, y } = this.getPosition(e);

      for (let i = 0; i < ToolState.shapes.length; i++) {
        const shape = ToolState.shapes[i];
        if (shape.isDraw) {
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(this.angle);
          this.setProps(shape);
          this.drawShape(
            0 + shape.offsetX,
            0 + shape.offsetY,
            shape.radius,
            shape.inset,
            shape.corners,
            shape
          );
          ctx.restore();
        }
      }
      this.angle += CanvasState.angleSpeed;
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

      for (let i = 0; i < ToolState.shapes.length; i++) {
        const shape = ToolState.shapes[i];
        if (shape.isDraw) {
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(this.angle);
          this.setProps(shape);
          this.drawShape(
            0 + shape.offsetX,
            0 + shape.offsetY,
            shape.radius,
            shape.inset,
            shape.corners,
            shape
          );
          ctx.restore();
        }
      }
      this.angle += CanvasState.angleSpeed;
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
