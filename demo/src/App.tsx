import { useRef, useEffect } from "react";
import {
  Picker,
  ExtraOptionsPlugin,
  coreCss,
  extraOptionsCss,
  DatePicker,
  RangePicker,
} from "../../src";

function App() {
  const inputRef = useRef(null);

  useEffect(() => {
    // new Picker({
    //   element: inputRef.current!,
    //   css: `${coreCss}${extraOptionsCss}`,
    //   plugins: [ExtraOptionsPlugin],
    //   ExtraOptionsPlugin: {
    //     dropdown: {
    //       months: true,
    //       years: true,
    //       minYear: 2000,
    //     },
    //     resetButton: true,
    //   },
    // });
    new DatePicker({
      element: inputRef.current!,
    });
    // new RangePicker({
    //   element: inputRef.current!,
    //   position: "right",
    //   presetOptions: {
    //     presets: [
    //       {
    //         label: "Last Week",
    //         start: "2022-01-01",
    //         end: "2023-01-01",
    //       },
    //       {
    //         label: "Last Month",
    //         start: "2021-01-01",
    //         end: "2023-01-01",
    //       },
    //     ],
    //   },
    // });
  }, []);

  return (
    <div>
      <h1>Demo</h1>
      <div className="container">
        <input ref={inputRef} type="text" />
      </div>
    </div>
  );
}

export default App;
