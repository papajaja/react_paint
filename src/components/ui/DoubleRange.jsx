import { useEffect, useRef, useState } from "react";

const DoubleRange = ({ text, leftval, rightval, setleft, setright }) => {
  const leftThumb = useRef();
  const rightThumb = useRef();
  const track = useRef();
  const [leftPerc, setLeftPerc] = useState(leftval);
  const [rightPerc, setRightPerc] = useState(rightval);
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded((i) => !i);
  }, []);

  const handleMove = (e) => {
    const thumbSize = leftThumb.current?.getBoundingClientRect().width;
    const trackWidth = track.current?.getBoundingClientRect().width;
    const onePx = 100 / trackWidth;

    const offsetLeft = track.current.getBoundingClientRect().x;

    const leftThumb_shift = leftThumb.current.offsetLeft;
    const rightThumb_shift = rightThumb.current.offsetLeft;

    if (leftThumb.current.classList.contains("thumb_active")) {
      let leftShift = e.clientX - offsetLeft;

      if (leftShift > rightThumb_shift) leftShift = rightThumb_shift;
      if (leftShift < 0) leftShift = 0;
      if (leftShift > trackWidth) leftShift = trackWidth;
      console.log("left", leftShift * onePx);

      setLeftPerc(onePx * leftShift);
      setleft(onePx * leftShift);
    } else if (rightThumb.current.classList.contains("thumb_active")) {
      let leftShift = e.clientX - offsetLeft;

      if (leftShift < leftThumb_shift + thumbSize) leftShift = leftThumb_shift + thumbSize;
      if (leftShift < 0) leftShift = 0;

      if (leftShift > trackWidth) leftShift = trackWidth;
      console.log("right", leftShift * onePx);

      setRightPerc(onePx * leftShift);
      setright(onePx * leftShift);
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
    isLoaded && (
      <div className="doublerange">
        <div className="doublerange_text">{text}</div>
        <div className="doublerange_range">
          <div ref={track} className="doublerange_track">
            <div className="dr_track" />
            <div
              style={{ left: leftPerc + "%" }}
              onMouseDown={handleDown}
              ref={leftThumb}
              className="dr_left_thumb"
            ></div>
            <div
              style={{ left: rightPerc + "%" }}
              onMouseDown={handleDown}
              ref={rightThumb}
              className="dr_right_thumb"
            ></div>
          </div>
        </div>
      </div>
    )
  );
};

export default DoubleRange;
