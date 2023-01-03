export const timeCss: string = /* css */ `
.container.preset-plugin main {
  display: grid;
}
.container.preset-plugin main.preset-left > .calendars,
.container.preset-plugin main.preset-top > .calendars {
  order: 2;
}
.container.preset-plugin main.preset-left > .preset-plugin-container,
.container.preset-plugin main.preset-top > .preset-plugin-container {
  order: 1;
}
.container.preset-plugin main.preset-left,
.container.preset-plugin main.preset-right {
  grid-template-columns: auto auto;
}
.container.preset-plugin main.preset-left .preset-plugin-container,
.container.preset-plugin main.preset-right .preset-plugin-container {
  grid-row: span 2;
  width: 130px;
}
.container.preset-plugin main.preset-bottom > .preset-plugin-container {
  order: 4;
}
.container.preset-plugin main.preset-bottom,
.container.preset-plugin main.preset-top {
  grid-template-columns: auto;
}
.container.preset-plugin main > .time-plugin-container {
  order: 3;
}
.container > main:not([class*="preset-"]) {
  flex-direction: column;
}
.time-plugin-container {
  background-color: var(--color-bg-secondary);
  border-bottom: 1px solid var(--color-border-default);
  display: flex;
  justify-content: space-around;
  padding: 10px;
}
.time-plugin-container input[type="time"] {
  font-size: 18px;
}
.time-plugin-container input[type="time"],
.time-plugin-container select {
  background-color: var(--color-bg-default);
  border: 1px solid transparent;
  border-radius: 4px;
  color: var(--color-fg-default);
}
.time-plugin-container select {
  margin: 0 3px;
}
`;