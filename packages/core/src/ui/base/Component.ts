import { shallowEqual } from "./utils";

export abstract class Component<P> {
  abstract get type(): string;
  protected props: Record<string, P> = {};
  protected el: Record<string, HTMLElement> = {};

  protected layout(
    el: HTMLElement,
    props: P,
    key: string,
    cancelable = false
  ) {
    this.props[key] = props;

    const renderEvent = new CustomEvent("t-render", {
      cancelable: true,
      bubbles: true,
      composed: true,
      detail: {
        type: this.type,
        key,
        props,
        el,
      },
    });
    el.dispatchEvent(renderEvent);

    if (!renderEvent.defaultPrevented) {
      this.onRender(el, props);
    }

    const layoutEvent = new CustomEvent("t-layout", {
      cancelable,
      bubbles: true,
      composed: true,
      detail: {
        type: this.type,
        key,
        props,
        el,
      },
    });
    el.dispatchEvent(layoutEvent);

    if (layoutEvent.defaultPrevented) {
      el.remove();
    } else {
      this.el[key] = el;
    }
  }

  update(props: P, key = "") {
    if (shallowEqual(this.props[key], props)) {
      return;
    }
    this.props[key] = props;

    const el = this.el[key];
    if (el) {
      const updateEvent = new CustomEvent("t-update", {
        cancelable: true,
        bubbles: true,
        composed: true,
        detail: {
          type: this.type,
          key,
          props,
          el,
        },
      });
      el.dispatchEvent(updateEvent);

      if (!updateEvent.defaultPrevented) {
        this.onUpdate(el, props);
      }
    }
  }

  protected onUpdate(el: HTMLElement, props: P): void {}

  protected abstract onRender(el: HTMLElement, props: P): void;
}
