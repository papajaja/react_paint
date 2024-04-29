import ToolState from "../../store/ToolsState";
import Checkbox from "../ui/Checkbox";
import Color from "../ui/Color";
import Counter from "../ui/Counter";

const LineProps = () => {
  return (
    <>
      <Checkbox
        text={"Спам - режим"}
        value={ToolState.lineProps.isSpam}
        setValue={(v) => ToolState.setLineProps("isSpam", v)}
      />
      <Counter
        text={"Толщина обводки"}
        value={ToolState.lineProps.lineWidth}
        setValue={(v) => ToolState.setLineProps("lineWidth", v)}
      />
      <Color
        value={ToolState.lineProps.strokeStyle}
        setValue={(v) => ToolState.setLineProps("strokeStyle", v)}
        text={"Цвет обводки"}
      />
      <Counter
        text={"Тень"}
        value={ToolState.lineProps.shadowBlur}
        setValue={(v) => ToolState.setLineProps("shadowBlur", v)}
        min={0}
      />
      <Color
        value={ToolState.lineProps.shadowColor}
        setValue={(v) => ToolState.setLineProps("shadowColor", v)}
        text={"Цвет тени"}
      />
    </>
  );
};

export default LineProps;
