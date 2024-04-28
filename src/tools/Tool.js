class Tool {
  canvas = null;
  context = null;
  name = null;

  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d", {
      willReadFrequently: true,
    });
  }
}

export default Tool;
