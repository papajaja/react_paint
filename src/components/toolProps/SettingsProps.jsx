import { useEffect, useState } from "react";
import CanvasState from "../../store/CanvasState";
import ToolState from "../../store/ToolsState";
import Counter from "../ui/Counter";
import DropMenu from "../ui/DropMenu";

const SettingsProps = () => {
  console.log("render");
  const handleSet = () => {
    const ctx = CanvasState.canvas?.getContext("2d");

    // ctx.globalCompositeOperation = "lighter";
    // ctx.globalCompositeOperation = "color-dodge";
    // ctx.globalCompositeOperation = "source-over";
    // ctx.globalCompositeOperation = "difference";

    // ctx.filter = "blur(2px) brightness(150%)";
    // ctx.filter = "blur(0px) brightness(100%)";
    // ctx.filter = "brightness(150%)";
  };

  const [items, setItems] = useState([
    {
      name: "source-over",
      callback: () => {
        CanvasState.setGlobalCompositeOperation("source-over");
      },
      isActive: true,
    },
    {
      name: "lighter",
      callback: () => {
        CanvasState.setGlobalCompositeOperation("lighter");
      },
      isActive: false,
    },
    {
      name: "color-dodge",
      callback: () => {
        CanvasState.setGlobalCompositeOperation("color-dodge");
      },
      isActive: false,
    },
    {
      name: "difference",
      callback: () => {
        CanvasState.setGlobalCompositeOperation("difference");
      },
      isActive: false,
    },
  ]);

  useEffect(() => {
    handleSet();
  }, []);
  return (
    <>
      <Counter
        text={"Скорость вращ."}
        value={ToolState.brushProps.lineWidth}
        setValue={(v) => ToolState.setBrushProps("lineWidth", v)}
        step={0.01}
      />
      <DropMenu name={"Composite G.O."} items={items} setItems={setItems} />
    </>
  );
};

export default SettingsProps;
