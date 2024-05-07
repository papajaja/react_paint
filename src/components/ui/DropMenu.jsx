import { useState } from "react";
import CanvasState from "../../store/CanvasState";
import { observer } from "mobx-react";

const DropMenu = observer(({ items, name }) => {
  const [isActive, setActive] = useState(CanvasState.globalCompositeOperation !== "source-over");
  const switchActive = (item) => {
    item.callback();
    CanvasState.setGlobalCompositeOperation(item.name);
  };

  return (
    <div className="dropdown">
      <div onClick={() => setActive((i) => !i)} className="dropdown_menu">
        <div className="dropdown_text">{name}</div>
        <span style={{ rotate: isActive ? "90deg" : "0deg" }} className={"color_dir"} />
      </div>
      <div style={{ height: isActive ? "80px" : "0px" }} className="dropdown_content">
        {items.map((item, i) => (
          <div
            className={
              "dropdown_item" +
              (item.name === CanvasState.globalCompositeOperation ? " active" : "")
            }
            onClick={() => switchActive(item)}
            key={i}
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
});

export default DropMenu;
