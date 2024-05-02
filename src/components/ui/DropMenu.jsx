import { useState } from "react";

const DropMenu = () => {
  const [isActive, setActive] = useState(false);

  return (
    <div onClick={() => setActive((_) => !_)} className="dropdown">
      <div className="dropdown_text">Here is dropdown!</div>
      {isActive && <div className="dropdown_content"></div>}
    </div>
  );
};

export default DropMenu;
