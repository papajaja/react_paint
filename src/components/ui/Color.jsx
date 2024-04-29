import { useState } from "react";
import { HexAlphaColorPicker } from "react-colorful";

const Color = ({ text, value, setValue }) => {
  const [isActive, setActive] = useState(true);

  return (
    <div className="color">
      <div onClick={() => setActive((i) => !i)} className="color_menu">
        <div className="color_text">{text}</div>
        <span style={{ rotate: isActive ? "90deg" : "0deg" }} className={"color_dir"} />
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
