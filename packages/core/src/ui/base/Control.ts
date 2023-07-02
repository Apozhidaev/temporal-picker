import { Component } from "./Component";
import { contextHtmlKey } from "./Context";
import { shallowEqual } from "./utils";

export abstract class Control<P, C = any> extends Component<P> {
  private context?: C;
  private tagName: string;
  private el: Record<string, HTMLElement> = {};

  constructor(tagName: string = "div") {
    super();
    this.tagName = tagName;
  }

  appendTo(container: HTMLElement, props: P, namespace: string, key = "") {
    const el = document.createElement(this.tagName);
    container.appendChild(el);

    const defaultPrevented = this.layout(el, props, namespace, key, true);

    if (defaultPrevented) {
      container.removeChild(el);
    }

    return { el, defaultPrevented };
  }

  memo(container: HTMLElement, props: P, namespace: string, key = "") {
    if (shallowEqual(this.props[key], props)) {
      if (this.el[key]) {
        container.appendChild(this.el[key]);
      }
      return;
    }

    const { el, defaultPrevented } = this.appendTo(
      container,
      props,
      namespace,
      key
    );

    if (!defaultPrevented) {
      this.el[key] = el.cloneNode(true) as HTMLElement;
    }
  }

  protected getContext(el: HTMLElement): C {
    if (this.context) {
      return this.context;
    }
    if (contextHtmlKey in el) {
      this.context = el[contextHtmlKey] as C;
      return this.context;
    }
    if (el.parentElement) {
      return this.getContext(el.parentElement);
    }
    throw new Error(`Context not found: ${this.type}`);
  }
}
