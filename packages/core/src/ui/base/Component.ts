import { shallowEqual } from "./utils";

export type Context = { customLayout?: boolean };

export abstract class Component<P, C extends Context = Context> {
  abstract get type(): string;
  protected props: Record<string, P> = {};
  protected el: Record<string, HTMLElement> = {};

  constructor(protected host: HTMLElement, public context: C) {}

  protected layout(el: HTMLElement, props: P, key: string) {
    const prevProps = this.props[key];
    this.props[key] = props;

    if (
      !this.context.customLayout ||
      this.host.dispatchEvent(
        new CustomEvent("t-render", {
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
      this.onRender(el, props, prevProps);
    }
  }

  public update(props: P, key = "") {
    if (shallowEqual(this.props[key], props)) {
      return;
    }
    const prevProps = this.props[key];
    this.props[key] = props;

    const el = this.el[key];
    if (el) {
      if (
        !this.context.customLayout ||
        this.host.dispatchEvent(
          new CustomEvent("t-update", {
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
        this.onUpdate(el, props, prevProps);
      }
    }
  }

  protected onUpdate(el: HTMLElement, props: P, prevProps?: P): void {}

  protected abstract onRender(el: HTMLElement, props: P, prevProps?: P): void;
}
