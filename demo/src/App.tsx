import { useRef, useEffect } from "react";
import {
  ExtraOptionsPlugin,
  coreCss,
  extraOptionsCss,
  DatePicker,
  RangePicker,
} from "../../src";
import { DateTime } from "luxon";

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
    // new DatePicker({
    //   element: inputRef.current!,
    //   extraOptions: {
    //     resetButton: true,
    //     dropdown:{
    //       months: true,
    //       years: true,
    //     }
    //   },
    //   lockOptions: {
    //     minDate: DateTime.now().minus({months: 2})
    //   }
    // });
    new RangePicker({
      element: inputRef.current!,
      presetOptions: {
        presets: [
          {
            label: "Test",
            start: "2022-01-01",
            end: "2023-01-01",
          },
        ],
      },
    });
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
