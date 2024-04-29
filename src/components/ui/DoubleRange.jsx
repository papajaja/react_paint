import { useRef, useState } from "react";

const DoubleRange = ({ text }) => {
  const leftThumb = useRef();
  const rightThumb = useRef();
  const track = useRef();
  const thumbSize = 0;

  const trackWidth = track.current?.getBoundingClientRect().width;
  const onePercent = trackWidth / 100;
  const onePx = 100 / trackWidth;

  const setPercentage = (thumb, percentage) => {
    console.log(percentage);
    const leftShift = percentage * onePercent;

    if (thumb === "left") {
      leftThumb.current.style.left = leftShift + "px";
    } else {
      rightThumb.current.style.left = leftShift + "px";
    }
  };

  const handleMove = (e) => {
    const offsetLeft = track.current.getBoundingClientRect().x;
    const trackWidth = track.current.getBoundingClientRect().width;

    const leftThumb_shift = leftThumb.current.offsetLeft;
    const rightThumb_shift = rightThumb.current.offsetLeft;
    console.log(leftThumb_shift, rightThumb_shift);

    if (leftThumb.current.classList.contains("thumb_active")) {
      let leftShift = e.clientX - offsetLeft;

      if (leftShift > rightThumb_shift) leftShift = rightThumb_shift;
      if (leftShift < 0) leftShift = 0;

      setPercentage("left", onePx * leftShift);
    } else if (rightThumb.current.classList.contains("thumb_active")) {
      let leftShift = e.clientX - offsetLeft;

      if (leftShift < leftThumb_shift + thumbSize) leftShift = leftThumb_shift + thumbSize;
      if (leftShift > trackWidth) leftShift = trackWidth;

      setPercentage("right", onePx * leftShift);
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
      <div className="doublerange_text">if</div>
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
