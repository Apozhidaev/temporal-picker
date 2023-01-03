import { useRef, useEffect } from "react";
import { Picker, coreCss } from "../../src";

function App() {
  const inputRef = useRef(null);

  useEffect(() => {
    new Picker({
      element: inputRef.current!,
      css: coreCss,
    });
  }, []);

  return (
    <div className="">
      <h1>Vite + React</h1>
      <input ref={inputRef} type="text" />
    </div>
  );
}

export default App;
