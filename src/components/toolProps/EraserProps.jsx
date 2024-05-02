import ToolState from "../../store/ToolsState";
import Counter from "../ui/Counter";
import DropMenu from "../ui/DropMenu";

const EraserProps = () => {
  return (
    <>
      <Counter
        text={"Толщина линии"}
        value={ToolState.eraserProps.lineWidth}
        setValue={(v) => ToolState.setEraserProps("lineWidth", v)}
      />
      <DropMenu />
    </>
  );
};

export default EraserProps;
