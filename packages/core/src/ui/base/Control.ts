import { Component, Context } from "./Component";

export abstract class Control<P, C extends Context = Context> extends Component<P, C> {
  private tagName: string;

  constructor(host: HTMLElement, context: C, tagName: string = "div") {
    super(host, context);
    this.tagName = tagName;
  }

  render(container: HTMLElement, props: P, key = "") {
    const el = document.createElement(this.tagName);

    this.layout(el, props, key);

    if (
      !this.context.customLayout ||
      this.host.dispatchEvent(
        new CustomEvent("t-mount", {
          cancelable: true,
          detail: {
            type: this.type,
            key,
            props,
            el,
          },
        })
      )
    ) {
      container.appendChild(el);
      this.el[key] = el;
    }
  }
}
