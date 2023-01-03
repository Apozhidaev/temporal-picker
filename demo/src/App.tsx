import { useRef, useEffect } from "react";
import {
  Picker,
  ExtraOptionsPlugin,
  coreCss,
  extraOptionsCss,
} from "../../src";

function App() {
  const inputRef = useRef(null);

  useEffect(() => {
    new Picker({
      element: inputRef.current!,
      css: `${coreCss}${extraOptionsCss}`,
      plugins: [ExtraOptionsPlugin],
      ExtraOptionsPlugin: {
        dropdown: {
          months: true,
          years: true,
          minYear: 2000,
        },
        resetButton: true,
      },
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
