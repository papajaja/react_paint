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
    const scrollLeft =
      canvasRef.current.offsetLeft - (window.innerWidth - canvasRef.current.width) / 2 + 120; // fix 120
    const scrollTop =
      canvasRef.current.offsetTop - (window.innerHeight - canvasRef.current.height) / 2;
    canvasShellRef.current.scroll(scrollLeft, scrollTop);
  }, [canvasRef]);

  return (
    <div className="app">
      <section className="app_canvas">
        <div
          onPointerUp={() => {
            document.querySelector(".settings_block").style.pointerEvents = "all";
          }}
          onPointerDown={() => {
            document.querySelector(".settings_block").style.pointerEvents = "none";
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
      <Settings />
    </div>
  );
};

export default App;
