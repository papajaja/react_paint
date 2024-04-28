import { useState } from "react";

const Checkbox = ({ text, value, setValue }) => {
  const [isActive, setActive] = useState(value);
  const handleSwitcher = () => {
    setActive((i) => !i);
    setValue(!isActive);
  };

  return (
    <div onClick={handleSwitcher} className="checkbox">
      <div className="checkbox_text">{text}</div>
      <span className={"checkbox_checker" + (isActive ? " checked" : "")} />
    </div>
  );
};

export default Checkbox;
