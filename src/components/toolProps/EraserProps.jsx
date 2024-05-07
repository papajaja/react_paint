import ToolState from "../../store/ToolsState";
import Counter from "../ui/Counter";

const EraserProps = () => {
  return (
    <>
      <div className="toolname">Ластик</div>
      <Counter
        text={"Толщина линии"}
        value={ToolState.eraserProps.lineWidth}
        setValue={(v) => ToolState.setEraserProps("lineWidth", v)}
      />
    </>
  );
};

export default EraserProps;
