import ToolState from "../../store/ToolsState";
import Checkbox from "../ui/Checkbox";
import Color from "../ui/Color";
import Counter from "../ui/Counter";
import DoubleRange from "../ui/DoubleRange";

const CircleProps = () => {
  return (
    <>
      <div className="toolname">Круг</div>
      <DoubleRange
        text={""}
        leftval={ToolState.circleProps.startAnglePerc}
        rightval={ToolState.circleProps.endAnglePerc}
        setleft={(v) => ToolState.setCircleProps("startAnglePerc", v)}
        setright={(v) => ToolState.setCircleProps("endAnglePerc", v)}
      />
      <Checkbox
        text={"Spam-mode"}
        value={ToolState.circleProps.isSpam}
        setValue={(v) => ToolState.setCircleProps("isSpam", v)}
      />
      <Checkbox
        text={"Заливка"}
        value={ToolState.circleProps.isFill}
        setValue={(v) => ToolState.setCircleProps("isFill", v)}
      />
      <Color
        value={ToolState.circleProps.fillStyle}
        setValue={(v) => ToolState.setCircleProps("fillStyle", v)}
        text={"Цвет заливки"}
      />
      <Checkbox
        text={"Обводка"}
        value={ToolState.circleProps.isStroke}
        setValue={(v) => ToolState.setCircleProps("isStroke", v)}
      />
      <Counter
        text={"Толщина обводки"}
        value={ToolState.circleProps.lineWidth}
        setValue={(v) => ToolState.setCircleProps("lineWidth", v)}
      />
      <Color
        value={ToolState.circleProps.strokeStyle}
        setValue={(v) => ToolState.setCircleProps("strokeStyle", v)}
        text={"Цвет обводки"}
      />
      <Counter
        text={"Тень"}
        value={ToolState.circleProps.shadowBlur}
        setValue={(v) => ToolState.setCircleProps("shadowBlur", v)}
        min={0}
      />
      <Color
        value={ToolState.circleProps.shadowColor}
        setValue={(v) => ToolState.setCircleProps("shadowColor", v)}
        text={"Цвет тени"}
      />
    </>
  );
};

export default CircleProps;
