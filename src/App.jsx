import { useEffect, useRef } from "react";
import Settings from "./components/Settings";
import CanvasState from "./store/CanvasState";
import ToolState from "./store/ToolsState";
import MouseFollower from "./components/MouseFollower";

const App = () => {
  const canvasRef = useRef(null);
  const canvasShellRef = useRef(null);

  useEffect(() => {
    CanvasState.canvas = canvasRef.current;
    CanvasState.canvasShell = canvasShellRef.current;
  }, [canvasRef]);

  return (
    <div className="app">
      <section className="app_canvas">
        <div
          onMouseDown={() => {
            if (ToolState.tool) {
              CanvasState.pushUndo();
              CanvasState.cleanRedo();
            }
          }}
          ref={canvasShellRef}
          className="canvas_shell"
        >
          <canvas width={1000} height={600} ref={canvasRef} className="canvas" />
        </div>
      </section>
      <section className="app_settings">
        <Settings />
      </section>
      {/* <MouseFollower /> */}
    </div>
  );
};

export default App;
