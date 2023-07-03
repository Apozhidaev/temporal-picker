import { Component } from "./Component";
import { context_key } from "./Container";

export abstract class Control<P, C = any> extends Component<P> {
  private context?: C;
  private tagName: string;

  constructor(tagName: string = "div") {
    super();
    this.tagName = tagName;
  }

  protected getContext(el: HTMLElement): C {
    if (this.context) {
      return this.context;
    }
    if (context_key in el) {
      this.context = el[context_key] as C;
      return this.context;
    }
    if (el.parentElement) {
      return this.getContext(el.parentElement);
    }
    throw new Error(`Context not found: ${this.type}`);
  }

  render(container: HTMLElement, props: P, key = "") {
    const el = document.createElement(this.tagName);
    container.appendChild(el);

    this.layout(el, props, key, true);
  }
}
