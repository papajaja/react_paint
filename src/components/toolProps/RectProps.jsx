import ToolState from "../../store/ToolsState";
import Checkbox from "../ui/Checkbox";
import Color from "../ui/Color";
import Counter from "../ui/Counter";

const RectProps = () => {
  return (
    <>
      <div className="toolname">Квадрат</div>
      <Checkbox
        text={"Спам - режим"}
        value={ToolState.rectProps.isSpam}
        setValue={(v) => ToolState.setRectProps("isSpam", v)}
      />
      <Checkbox
        text={"Заливка"}
        value={ToolState.rectProps.isFill}
        setValue={(v) => ToolState.setRectProps("isFill", v)}
      />
      <Color
        value={ToolState.rectProps.fillStyle}
        setValue={(v) => ToolState.setRectProps("fillStyle", v)}
        text={"Цвет заливки"}
      />
      <Checkbox
        text={"Обводка"}
        value={ToolState.rectProps.isStroke}
        setValue={(v) => ToolState.setRectProps("isStroke", v)}
      />
      <Counter
        text={"Толщина обводки"}
        value={ToolState.rectProps.lineWidth}
        setValue={(v) => ToolState.setRectProps("lineWidth", v)}
      />
      <Color
        value={ToolState.rectProps.strokeStyle}
        setValue={(v) => ToolState.setRectProps("strokeStyle", v)}
        text={"Цвет обводки"}
      />
      <Counter
        text={"Тень"}
        value={ToolState.rectProps.shadowBlur}
        setValue={(v) => ToolState.setRectProps("shadowBlur", v)}
        min={0}
      />
      <Color
        value={ToolState.rectProps.shadowColor}
        setValue={(v) => ToolState.setRectProps("shadowColor", v)}
        text={"Цвет тени"}
      />
    </>
  );
};

export default RectProps;
