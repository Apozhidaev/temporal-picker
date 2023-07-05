import { Component, Context } from "./Component";

export abstract class Container<P, C extends Context = Context> extends Component<P, C> {
  render(el: HTMLElement, props: P, key = "") {
    el.innerHTML = "";
    this.layout(el, props, key);
    this.el[key] = el;

    this.host.dispatchEvent(
      new CustomEvent("t-layout", {
        detail: {
          type: this.type,
          key,
          props,
          el,
        },
      })
    );
  }
}
