import { Component } from "./Component";
import { shallowEqual } from "./utils";

export const contextHtmlKey = Symbol("CONTEXT_KEY");

export abstract class Context<T, P> extends Component<P> {
  public context: T;

  constructor(context: T) {
    super();
    this.context = context;
  }

  update(el: HTMLElement, props: P, namespace = "", key = "") {
    if (shallowEqual(this.props[key], props)) {
      return;
    }
    el.innerHTML = "";
     // @ts-ignore
     el[contextHtmlKey] = this.context;
    this.layout(el, props, namespace, key);
  }
}
