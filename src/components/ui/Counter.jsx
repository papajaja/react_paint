import { useEffect, useRef, useState } from "react";

const Counter = ({ text, value = 100, setValue, min = 1, max = 999, step = 1 }) => {
  const [count, setCount] = useState(value);
  const slowInterval = useRef();
  const slowTimeout = useRef();

  const fastInterval = useRef();
  const fastTimeout = useRef();

  const veryFastInterval = useRef();
  const veryFastTimeout = useRef();

  const handleUpdate = (action) => {
    if (action === "increase") {
      setCount((count) => (count + step <= max ? count + step : count));
      setValue(count + step <= max ? count + step : count);
    } else {
      setCount((count) => (count - step >= min ? count - step : count));
      setValue(count - step >= min ? count - step : count);
    }
  };

  const handleMouseDown = (e) => {
    slowTimeout.current = setTimeout(() => {
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
      clearTimeout(fastTimeout.current);
      clearTimeout(slowTimeout.current);
      clearTimeout(veryFastTimeout.current);
      clearInterval(slowInterval.current);
      clearInterval(fastInterval.current);
      clearInterval(veryFastInterval.current);

      e.target.onmouseout = null;
      e.target.onmouseup = null;
    };

    e.target.onmouseout = clearActions;
    e.target.onmouseup = clearActions;
  };

  useEffect(() => {
    setCount(value);
  }, [value]);

  return (
    <div className="counter">
      <div className="counter_text">{text}</div>
      <div className="counter_controls">
        <button
          onMouseDown={handleMouseDown}
          onClick={() => handleUpdate("decrease")}
          className="counter_decrease"
        >
          -
        </button>
        <div className="counter_value">{Math.round(count * 100) / 100}</div>
        <button
          onMouseDown={handleMouseDown}
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
