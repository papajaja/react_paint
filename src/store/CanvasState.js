import { makeAutoObservable } from "mobx";

class CanvasState_c {
  canvas = null;
  canvasShell = null;
  redoList = [];
  undoList = [];
  globalCompositeOperation = "source-over";
  filter = "";
  angleSpeed = 0.1;

  constructor() {
    makeAutoObservable(this);
  }

  setAngleSpeed(value) {
    console.log(value);
    this.angleSpeed = value;
  }

  setGlobalCompositeOperation(value) {
    this.globalCompositeOperation = value;
    if (this.canvas) {
      this.canvas.getContext("2d").globalCompositeOperation = value;
    }
  }

  setFilter(value) {
    this.filter = value;
    if (this.canvas) {
      this.canvas.getContext("2d").filter = value;
    }
  }

  pushUndo() {
    const ctx = this.canvas.getContext("2d", { willReadFrequently: true });
    const img = ctx.getImageData(0, 0, this.canvas.width, this.canvas.height, {
      willReadFrequently: true,
    });
    ctx.beginPath();
    this.undoList.push(img);
    ctx.closePath();
  }

  redo() {
    const ctx = this.canvas.getContext("2d", { willReadFrequently: true });

    const img = this.redoList.pop();
    if (img !== undefined) {
      const undoImg = ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
      this.undoList.push(undoImg);

      ctx.beginPath();
      ctx.putImageData(img, 0, 0);
      ctx.closePath();
    }
  }

  undo() {
    const ctx = this.canvas.getContext("2d", { willReadFrequently: true });

    const img = this.undoList.pop();
    if (img) {
      const redoImg = ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
      this.redoList.push(redoImg);
      ctx.putImageData(img, 0, 0);
    }
  }

  cleanRedo() {
    this.redoList = [];
  }
}

const CanvasState = new CanvasState_c();
export default CanvasState;
