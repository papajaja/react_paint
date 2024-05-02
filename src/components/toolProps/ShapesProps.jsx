import { useState } from "react";
import Counter from "../ui/Counter";
import ToolState from "../../store/ToolsState";
import Color from "../ui/Color";
import Checkbox from "../ui/Checkbox";
import { observer } from "mobx-react";

const ShapesProps = observer(() => {
  const [currShape, setCurrShape] = useState(0);
  // console.log(ToolState.shapes);
  return (
    <>
      <div className="choose_shape">
        {ToolState.shapes.map((shape, i) => (
          <div
            style={{
              backgroundColor: currShape === i ? "rgba(0, 0, 0, 0.2)" : "rgba(255, 255, 255, 0.1)",
            }}
            onClick={() => setCurrShape(i)}
            key={i}
            className="shape"
          >
            {i + 1}
          </div>
        ))}
        {ToolState.shapes.length <= 4 ? (
          <div onClick={() => ToolState.addShape()} className="add_shape shape">
            +
          </div>
        ) : null}
      </div>
      <div
        onClick={() => {
          ToolState.removeShape(currShape);
          if (currShape > 0) setCurrShape(currShape - 1);
        }}
        className="remove_shape"
      >
        Удалить фигуру {currShape + 1}
      </div>
      <Counter
        text={"Радиус"}
        min={3}
        max={999}
        value={ToolState.shapes[currShape]?.radius}
        setValue={(v) => ToolState.setShapesProps(currShape, "radius", v)}
      />{" "}
      <Counter
        text={"Инсет"}
        min={0}
        max={10}
        step={0.1}
        value={ToolState.shapes[currShape]?.inset}
        setValue={(v) => ToolState.setShapesProps(currShape, "inset", v)}
      />
      <Counter
        text={"Смещение по X"}
        min={3}
        max={999}
        value={ToolState.shapes[currShape]?.offsetX}
        setValue={(v) => ToolState.setShapesProps(currShape, "offsetX", v)}
      />
      <Counter
        text={"Смещение по Y"}
        min={3}
        max={999}
        value={ToolState.shapes[currShape]?.offsetY}
        setValue={(v) => ToolState.setShapesProps(currShape, "offsetY", v)}
      />
      <Counter
        text={"Кол-во углов"}
        min={2}
        max={999}
        value={ToolState.shapes[currShape]?.corners}
        setValue={(v) => ToolState.setShapesProps(currShape, "corners", v)}
      />
      <Checkbox
        text={"Заливка"}
        value={ToolState.shapes[currShape]?.isFill}
        setValue={(v) => ToolState.setShapesProps(currShape, "isFill", v)}
      />
      <Color
        value={ToolState.shapes[currShape]?.fillStyle}
        setValue={(v) => ToolState.setShapesProps(currShape, "fillStyle", v)}
        text={"Цвет заливки"}
      />
      <Checkbox
        text={"Обводка"}
        value={ToolState.shapes[currShape]?.isStroke}
        setValue={(v) => ToolState.setShapesProps(currShape, "isStroke", v)}
      />
      <Counter
        text={"Толщина обводки"}
        value={ToolState.shapes[currShape]?.lineWidth}
        setValue={(v) => ToolState.setShapesProps(currShape, "lineWidth", v)}
      />
      <Color
        value={ToolState.shapes[currShape]?.strokeStyle}
        setValue={(v) => ToolState.setShapesProps(currShape, "strokeStyle", v)}
        text={"Цвет обводки"}
      />
      <Counter
        text={"Тень"}
        value={ToolState.shapes[currShape]?.shadowBlur}
        setValue={(v) => ToolState.setShapesProps(currShape, "shadowBlur", v)}
        min={0}
      />
      <Color
        value={ToolState.shapes[currShape]?.shadowColor}
        setValue={(v) => ToolState.setShapesProps(currShape, "shadowColor", v)}
        text={"Цвет тени"}
      />
    </>
  );
});

export default ShapesProps;
