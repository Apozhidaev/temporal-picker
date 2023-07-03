import { Component } from "./Component";

export const context_key = Symbol("context_key");

export abstract class Container<T, P> extends Component<P> {
  public context: T;

  constructor(context: T) {
    super();
    this.context = context;
  }

  render(el: HTMLElement, props: P, key = "") {
    el.innerHTML = "";
    (el as HTMLElement & { [context_key]?: T })[context_key] = this.context;
    this.layout(el, props, key);
  }
}
