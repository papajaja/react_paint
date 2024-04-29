import ToolState from "../../store/ToolsState";
import Checkbox from "../ui/Checkbox";
import Color from "../ui/Color";
import Counter from "../ui/Counter";
import DoubleRange from "../ui/DoubleRange";

const BrushProps = () => {
  return (
    <>
      <Counter
        text={"Толщина линии"}
        value={ToolState.brushProps.lineWidth}
        setValue={(v) => ToolState.setBrushProps("lineWidth", v)}
      />
      <Color
        value={ToolState.brushProps.strokeStyle}
        setValue={(v) => ToolState.setBrushProps("strokeStyle", v)}
        text={"Цвет линии"}
      />
      <Counter
        text={"Тень"}
        value={ToolState.brushProps.shadowBlur}
        setValue={(v) => ToolState.setBrushProps("shadowBlur", v)}
        min={0}
      />
      <Color
        value={ToolState.brushProps.shadowColor}
        setValue={(v) => ToolState.setBrushProps("shadowColor", v)}
        text={"Цвет тени"}
      />
    </>
  );
};

export default BrushProps;
