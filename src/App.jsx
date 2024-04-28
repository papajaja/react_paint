import { useEffect, useRef } from "react";
import Settings from "./components/Settings";
import CanvasState from "./store/CanvasState";
import ToolState from "./store/ToolsState";

const App = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    CanvasState.canvas = canvasRef.current;
  }, [canvasRef]);

  return (
    <div className="app">
      <section className="app_canvas">
        <canvas
          onMouseDown={() => {
            if (ToolState.tool) {
              CanvasState.pushUndo();
              CanvasState.cleanRedo();
            }
          }}
          width={window.innerWidth - 300 + "px"}
          height={window.innerHeight - 100 + "px"}
          ref={canvasRef}
          className="canvas"
        />
      </section>
      <section className="app_settings">
        <Settings />
      </section>
    </div>
  );
};

export default App;
