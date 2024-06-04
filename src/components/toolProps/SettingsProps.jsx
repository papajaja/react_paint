import CanvasState from "../../store/CanvasState";
import Counter from "../ui/Counter";
import DropMenu from "../ui/DropMenu";

const SettingsProps = () => {
  const items = [
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
  ];

  const handleDownload = () => {
    const canvas = CanvasState.canvas;
    const link = document.createElement("a");
    link.download = `image_${Date.now()}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <>
      <div className="toolname">Настройки</div>
      <Counter
        text={"Скорость вращ."}
        value={CanvasState.angleSpeed * 100}
        setValue={(v) => CanvasState.setAngleSpeed(v / 100)}
        step={1}
        min={0}
        max={20}
      />
      {/* <div className="warning">- !! -</div> */}
      <DropMenu name={"Фильтры"} items={items} />
      <button onClick={handleDownload} className="download">
        Сохранить изображение
      </button>
    </>
  );
};

export default SettingsProps;
