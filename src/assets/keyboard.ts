export const keyboardCss: string = /* css */ `
:host {
  --focus-color: var(--temporal-picker-focus-color, #94a3b8);
}
.unit:focus-visible {
  outline-width: 1px;
  outline-style: dashed;
  outline-color: var(--focus-color);
  z-index: 1;
  outline-offset: 1px;
}
select.unit:focus-visible {
  outline-color: var(--focus-color);
  outline-style: solid;
}
`;