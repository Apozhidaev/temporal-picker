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
    //   date: DateTime.now().toISODate(),
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
      strict: false,
      // autoApply: false,
      startDate: DateTime.now().minus({ month: 1 }).toISODate(),
      endDate: DateTime.now().toISODate(),
      activeInput: "end",
      lockOptions: {
        minDate: "2022-01-01",
        maxDate: DateTime.now().toISODate(),
      },
      presetOptions: {
        presets: [
          {
            label: "Test",
            start: "2022-01-01",
            end: "2023-01-01",
          },
          {
            label: "Test 2",
            start: "",
            end: DateTime.now().toISODate(),
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
