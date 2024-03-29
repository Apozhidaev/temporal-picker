import { DatePicker, RangePicker } from "@temporal-picker/react";


function App() {
  return (
    <table style={{ width: "100%", padding: 150 }}>
      <tbody>
        <tr>
          <td>
            <DatePicker
              // value="2022-01-01"
              plain="month"
              resetButton={false}
              onValueChange={(date) => {
                console.log(date);
              }}
              onFocus={(e) => {
                console.log(e);
              }}
            />
          </td>
          <td>
            <RangePicker
              // plain="month"
              // start="2022-01-01"
              // end="2022-08-01"
              onRangeChange={(start, end) => {
                console.log(start, end);
              }}
              onViewChange={(e) => {
                console.log(e);
                // e.detail.el.innerHTML = "";
                // e.preventDefault();
              }}
              customLayout
              placement="bottom-end"
              // autoApply={false}
              resetButton
              // extraSelect
              pickLabel
              // readonly
              presets={[
                { label: "Last Month", start: "2023-01-01", end: "2023-02-15" },
                { label: "Last Quarter", start: "2023-01-01", end: "2023-04-15" },
                { label: "Last Year", start: "2022-01-01", end: "2023-01-01" },
                { label: "YTD", start: "2023-01-01" },
              ]}
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default App;
