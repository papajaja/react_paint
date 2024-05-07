import { useState } from "react";

const DropMenu = ({ items, name, setItems }) => {
  const [isActive, setActive] = useState(false);
  const switchActive = (item) => {
    item.callback();
    setItems(items.map((i) => ({ ...i, isActive: i.name === item.name })));
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
            className={"dropdown_item" + (item.isActive ? " active" : "")}
            onClick={() => switchActive(item)}
            key={i}
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DropMenu;
