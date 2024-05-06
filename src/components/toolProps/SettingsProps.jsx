import { useEffect } from "react";
import CanvasState from "../../store/CanvasState";
import ToolState from "../../store/ToolsState";
import Counter from "../ui/Counter";

const SettingsProps = () => {
  const handleSet = () => {
    const ctx = CanvasState.canvas.getContext("2d");

    // ctx.globalCompositeOperation = "lighter";
    ctx.globalCompositeOperation = "color-dodge";
    // ctx.globalCompositeOperation = "difference";

    // ctx.filter = "blur(2px)";
    // ctx.filter = "brightness(150%)";
  };
  useEffect(() => {
    handleSet();
  }, []);
  return (
    <>
      <Counter
        text={"Скорость вращения"}
        value={ToolState.brushProps.lineWidth}
        setValue={(v) => ToolState.setBrushProps("lineWidth", v)}
        step={0.01}
      />
      <button onClick={handleSet}>clci</button>
    </>
  );
};

export default SettingsProps;
