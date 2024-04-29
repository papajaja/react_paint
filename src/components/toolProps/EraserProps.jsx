import ToolState from "../../store/ToolsState";
import Counter from "../ui/Counter";
import DoubleRange from "../ui/DoubleRange";

const EraserProps = () => {
  return (
    <>
      <Counter
        text={"Толщина линии"}
        value={ToolState.eraserProps.lineWidth}
        setValue={(v) => ToolState.setEraserProps("lineWidth", v)}
      />
      <DoubleRange />
    </>
  );
};

export default EraserProps;
