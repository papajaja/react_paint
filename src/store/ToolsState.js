import { makeAutoObservable } from "mobx";

class ToolState_c {
  tool = null;

  brushProps = JSON.parse(localStorage.getItem("brushProps")) || {
    fillStyle: "#000000",
    lineCap: "round",
    lineJoin: "round",
    lineWidth: 4,
    shadowBlur: 0,
    shadowColor: "#000000",
    strokeStyle: "#000000",
    isFill: false,
    isStroke: true,
  };

  circleProps = JSON.parse(localStorage.getItem("circleProps")) || {
    fillStyle: "#000000",
    lineCap: "round",
    lineJoin: "round",
    lineWidth: 4,
    shadowBlur: 0,
    shadowColor: "#000000",
    strokeStyle: "#000000",
    isFill: false,
    isStroke: true,
    isSpam: false,
  };

  eraserProps = JSON.parse(localStorage.getItem("eraserProps")) || {
    fillStyle: "#000000",
    lineCap: "round",
    lineJoin: "round",
    lineWidth: 40,
    shadowBlur: 0,
    shadowColor: "#000000",
    strokeStyle: "white",
    isFill: false,
    isStroke: true,
  };

  lineProps = JSON.parse(localStorage.getItem("lineProps")) || {
    fillStyle: "#000000",
    lineCap: "round",
    lineJoin: "round",
    lineWidth: 12,
    shadowBlur: 0,
    shadowColor: "#000000",
    strokeStyle: "#000000",
    isFill: false,
    isStroke: true,
    isSpam: false,
  };

  rectProps = JSON.parse(localStorage.getItem("rectProps")) || {
    fillStyle: "#000000",
    lineCap: "square",
    lineJoin: "square",
    lineWidth: 4,
    shadowBlur: 0,
    shadowColor: "#000000",
    strokeStyle: "#000000",
    isFill: false,
    isStroke: true,
    isSpam: false,
  };
  setLineProps
  shapes = [{}];

  constructor() {
    makeAutoObservable(this);
  }

  setTool(value) {
    this.tool = value;
  }

  setBrushProps(prop, value) {
    this.brushProps[prop] = value;
    localStorage.setItem("brushProps", JSON.stringify(this.brushProps));
  }

  setCircleProps(prop, value) {
    this.circleProps[prop] = value;
    localStorage.setItem("circleProps", JSON.stringify(this.circleProps));
  }

  setLineProps(prop, value) {
    this.lineProps[prop] = value;
    localStorage.setItem("lineProps", JSON.stringify(this.lineProps));
  }

  setRectProps(prop, value) {
    this.rectProps[prop] = value;
    localStorage.setItem("rectProps", JSON.stringify(this.rectProps));
  }

  setEraserProps(prop, value) {
    this.eraserProps[prop] = value;
    localStorage.setItem("eraserProps", JSON.stringify(this.eraserProps));
  }
}

const ToolState = new ToolState_c();
export default ToolState;
