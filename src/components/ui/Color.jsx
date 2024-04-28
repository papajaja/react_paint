import { useState } from "react";
import { HexAlphaColorPicker } from "react-colorful";

const Color = ({ text, value, setValue }) => {
  const [isActive, setActive] = useState(true);

  return (
    <div className="color">
      <div onClick={() => setActive((i) => !i)} className="color_menu">
        <div className="color_text">{text}</div>
        <span className={"color_dir " + (isActive ? "down" : "right")} />
      </div>
      {isActive && (
        <div className="color_picker">
          <HexAlphaColorPicker color={value} onChange={setValue} />
        </div>
      )}
    </div>
  );
};

export default Color;
