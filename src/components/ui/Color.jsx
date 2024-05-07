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
      {/* {isActive && ( */}
      <div
        // hidden={isActive ? false : true}
        style={{
          height: isActive ? "150px" : "0px",
          padding: isActive ? "6px 10px 10px 10px" : "0 10px 0 10px",
        }}
        className="color_picker"
      >
        <HexAlphaColorPicker color={value} onChange={setValue} />
      </div>
      {/* )} */}
    </div>
  );
};

export default Color;
