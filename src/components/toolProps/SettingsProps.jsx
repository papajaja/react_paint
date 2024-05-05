import ToolState from "../../store/ToolsState";
import Counter from "../ui/Counter";

const SettingsProps = () => {
  return (
    <>
      <Counter
        text={"Скорость вращения"}
        value={ToolState.brushProps.lineWidth}
        setValue={(v) => ToolState.setBrushProps("lineWidth", v)}
        step={0.01}
      />
    </>
  );
};

export default SettingsProps;
