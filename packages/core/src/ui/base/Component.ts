export abstract class Component<T> {
  abstract get type(): string;
  protected props: Record<string, T> = {};

  protected layout(
    el: HTMLElement,
    props: T,
    namespace: string,
    key: string,
    cancelable = false
  ) {
    this.props[key] = props;

    const component = namespace ? `${namespace}.${this.type}` : this.type;

    const renderEvent = new CustomEvent("render", {
      cancelable: true,
      bubbles: true,
      composed: true,
      detail: {
        component,
        key,
        props,
        el,
      },
    });
    el.dispatchEvent(renderEvent);

    if (!renderEvent.defaultPrevented) {
      this.render(el, props, component);
    }

    const layoutEvent = new CustomEvent("layout", {
      cancelable,
      bubbles: true,
      composed: true,
      detail: {
        component,
        key,
        props,
        el,
      },
    });
    el.dispatchEvent(layoutEvent);

    return layoutEvent.defaultPrevented;
  }

  protected abstract render(el: HTMLElement, props: T, namespace: string): void;
}
