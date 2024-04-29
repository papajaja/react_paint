import { useRef, useState } from "react";

const DoubleRange = ({ text, min, max }) => {
  const leftThumb = useRef();
  const rightThumb = useRef();
  const track = useRef();
  const maxShift = 190;

  const handleMove = (e) => {
    const offsetLeft = track.current.getBoundingClientRect().x;
    const trackWidth = track.current.getBoundingClientRect().width;
    if (leftThumb.current.classList.contains("thumb_active")) {
      let leftShift = e.clientX - offsetLeft;
      if (leftShift >= rightThumb.current.style.left) leftShift = rightThumb.current.style.left - 1;
      console.log(leftShift, rightThumb.current.style.left);
      if (leftShift < 0) leftShift = 0;
      console.log(leftShift);
      if (leftShift > trackWidth) leftShift = trackWidth;
      leftThumb.current.style.left = leftShift + "px";
    } else {
      let leftShift = e.clientX - offsetLeft;
      if (leftShift < 0) leftShift = 0;
      console.log(leftShift);
      if (leftShift > trackWidth - 4) leftShift = trackWidth - 4;
      rightThumb.current.style.left = leftShift + "px";
    }
  };

  const handleUp = (e) => {
    leftThumb.current.classList.remove("thumb_active");
    rightThumb.current.classList.remove("thumb_active");

    document.body.style.cursor = "";
    document.removeEventListener("mousemove", handleMove);
    document.removeEventListener("mouseup", handleUp);
  };

  const handleDown = (e) => {
    e.target.classList.add("thumb_active");

    document.body.style.cursor = "pointer";
    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseup", handleUp);
  };

  return (
    <div className="doublerange">
      <div className="doublerange_text">Hello</div>
      <div className="doublerange_range">
        <div ref={track} className="doublerange_track">
          <div onMouseDown={handleDown} ref={leftThumb} className="dr_left_thumb"></div>
          <div onMouseDown={handleDown} ref={rightThumb} className="dr_right_thumb"></div>
        </div>
      </div>
    </div>
  );
};

export default DoubleRange;
