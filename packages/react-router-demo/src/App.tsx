import { DatePicker, RangePicker } from "@temporal-picker/react-router";

function App() {
  return (
    <table style={{ width: "100%" }}>
      <tbody>
        <tr>
          <td>
            <DatePicker
              param="date"
              defaultValue="2023-01-01"
              resetButton
              aria-selected="false"
            />
          </td>
          <td>
            <RangePicker
              startParam="start"
              endParam="end"
              placement="bottom-end"
              autoApply
              resetButton
              monthSelect
              yearSelect
              presets={[
                { label: "Preset 1", start: "2023-01-01", end: "2023-02-15" },
                { label: "Preset 2", start: "2023-01-01" },
              ]}
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default App;
