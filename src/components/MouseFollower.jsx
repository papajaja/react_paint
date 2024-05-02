import { useState } from "react";
import Mouse from "../store/Mouse";
import { observer } from "mobx-react-lite";

const MouseFollower = observer(() => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  document.addEventListener("mousemove", (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  });
  return (
    <div
      className="mousefollower"
      style={{
        height: Mouse.radius * 2,
        width: Mouse.radius * 2,
        top: position.y - Mouse.radius,
        left: position.x - Mouse.radius,
      }}
    ></div>
  );
});

export default MouseFollower;
