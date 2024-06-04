import { observer } from "mobx-react";
import CanvasState from "../store/CanvasState";
import ToolState from "../store/ToolsState";
import Brush from "../tools/Brush";
import Circle from "../tools/Circle";
import Eraser from "../tools/Eraser";
import Line from "../tools/Line";
import Rect from "../tools/Rect";
import Shapes from "../tools/Shapes";
import BrushProps from "./toolProps/BrushProps";
import CircleProps from "./toolProps/CircleProps";
import EraserProps from "./toolProps/EraserProps";
import LineProps from "./toolProps/LineProps";
import RectProps from "./toolProps/RectProps";
import ShapesProps from "./toolProps/ShapesProps";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import SettingsTool from "../tools/Settings";
import SettingsProps from "./toolProps/SettingsProps";
import { useState } from "react";

const Settings = () => {
  const [isActive, setActive] = useState(true);

  if (ToolState.tool?.name === "settings") {
    document.body.style.cursor = "grab";
  } else {
    document.body.style.cursor = "";
  }
  const tools = [
    {
      name: "brush",
      callback: () => {
        ToolState.setTool(new Brush(CanvasState.canvas));
      },
    },
    // {
    //   name: "move",
    //   callback: () => {
    //     ToolState.setTool(new Move(CanvasState.canvas));
    //   },
    // },
    {
      name: "eraser",
      callback: () => {
        ToolState.setTool(new Eraser(CanvasState.canvas));
      },
    },
    {
      name: "circle",
      callback: () => {
        ToolState.setTool(new Circle(CanvasState.canvas));
      },
    },
    {
      name: "line",
      callback: () => {
        ToolState.setTool(new Line(CanvasState.canvas));
      },
    },
    {
      name: "rect",
      callback: () => {
        ToolState.setTool(new Rect(CanvasState.canvas));
      },
    },
    {
      name: "shapes",
      callback: () => {
        ToolState.setTool(new Shapes(CanvasState.canvas));
      },
    },
    {
      name: "clean",
      callback: () => {
        CanvasState.pushUndo();
        const cnv = CanvasState.canvas;
        const ctx = cnv.getContext("2d");
        ctx.beginPath();
        ctx.clearRect(0, 0, cnv.width, cnv.height);
        ctx.fill();
        ctx.closePath();
      },
    },
    {
      name: "undo",
      callback: () => {
        CanvasState.undo();
      },
    },
    {
      name: "redo",
      callback: () => {
        CanvasState.redo();
      },
    },
    {
      name: "settings",
      callback: () => {
        ToolState.setTool(new SettingsTool(CanvasState.canvas));
      },
    },
  ];

  return (
    <section style={{ right: isActive ? 0 : "-200px" }} className="settings_block">
      <div
        onClick={() => setActive((i) => !i)}
        className="selector color_dir"
        style={{
          transform: isActive ? "" : "rotate(180deg)",
        }}
      ></div>
      <div className="settings_toolbar">
        {tools.map((tool, i) => (
          <button
            onClick={tool.callback}
            key={i}
            className={
              "tool " + tool.name + (tool.name === ToolState.tool?.name ? " tool_active" : "")
            }
          />
        ))}
      </div>
      <div className="settings_properties">
        <SimpleBar style={{ height: "100%" }}>
          {ToolState.tool?.name === "brush" ? <BrushProps /> : null}
          {ToolState.tool?.name === "circle" ? <CircleProps /> : null}
          {ToolState.tool?.name === "eraser" ? <EraserProps /> : null}
          {ToolState.tool?.name === "line" ? <LineProps /> : null}
          {ToolState.tool?.name === "rect" ? <RectProps /> : null}
          {ToolState.tool?.name === "shapes" ? <ShapesProps /> : null}
          {ToolState.tool?.name === "settings" ? <SettingsProps /> : null}
        </SimpleBar>
      </div>
    </section>
  );
};

export default observer(Settings);
