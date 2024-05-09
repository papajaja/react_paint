import { useEffect, useRef, useState } from "react";

const Counter = ({ text, value = 100, setValue, min = 1, max = 999, step = 1 }) => {
  const [count, setCount] = useState(value);
  const [isActive, setActive] = useState(false);

  const slowInterval = useRef();
  const slowTimeout = useRef();

  const fastInterval = useRef();
  const fastTimeout = useRef();

  const veryFastInterval = useRef();
  const veryFastTimeout = useRef();

  const handleUpdate = (action) => {
    let updatedCount = count;

    setCount((prevCount) => {
      if (action === "increase") {
        updatedCount = prevCount + step <= max ? prevCount + step : prevCount;
      } else {
        updatedCount = prevCount - step >= min ? prevCount - step : prevCount;
      }
      return updatedCount;
    });

    // setValue(updatedCount);
    // console.log(updatedCount);
  };

  useEffect(() => {
    setValue(count);
  }, [count]);

  useEffect(() => {
    setCount(value);
  }, [value]);

  const handleMouseDown = (e) => {
    slowTimeout.current = setTimeout(() => {
      setActive(true);
      slowInterval.current = setInterval(() => {
        if (e.target.className === "counter_decrease") {
          handleUpdate("decrease");
        } else {
          handleUpdate("increase");
        }
      }, 100);
    }, 400);

    fastTimeout.current = setTimeout(() => {
      clearInterval(slowInterval.current);
      fastInterval.current = setInterval(() => {
        if (e.target.className === "counter_decrease") {
          handleUpdate("decrease");
        } else {
          handleUpdate("increase");
        }
      }, 20);
    }, 1600);

    veryFastTimeout.current = setTimeout(() => {
      clearInterval(fastInterval.current);
      veryFastInterval.current = setInterval(() => {
        if (e.target.className === "counter_decrease") {
          handleUpdate("decrease");
        } else {
          handleUpdate("increase");
        }
      }, 1);
    }, 3500);

    const clearActions = (e) => {
      setActive(false);

      clearTimeout(fastTimeout.current);
      clearTimeout(slowTimeout.current);
      clearTimeout(veryFastTimeout.current);
      clearInterval(slowInterval.current);
      clearInterval(fastInterval.current);
      clearInterval(veryFastInterval.current);

      e.target.onpointerout = null;
      e.target.onpointerup = null;
    };

    e.target.onpointerout = clearActions;
    e.target.onpointerup = clearActions;
  };

  // useEffect(() => {
  //   setCount(value);
  //   setValue(value);
  // }, [value]);

  return (
    <div className="counter">
      <div
        style={{
          display: isActive ? "flex" : "none",
        }}
        className="counter_display"
      >
        {Math.round(count * 100) / 100}
      </div>
      <div className="counter_text">{text}</div>
      <div className="counter_controls">
        <button
          onPointerDown={handleMouseDown}
          onClick={() => handleUpdate("decrease")}
          className="counter_decrease"
        >
          -
        </button>
        <div className="counter_value">{Math.round(count * 100) / 100}</div>
        <button
          onPointerDown={handleMouseDown}
          onClick={() => handleUpdate("increase")}
          className="counter_increase"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Counter;
