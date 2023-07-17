export class CustomElement extends HTMLElement {
  private _loaded = false;

  constructor() {
    super();
  }

  protected getBooleanAttribute(qualifiedName: string): boolean | null {
    if (this.hasAttribute(qualifiedName)) {
      const attr = this.getAttribute(qualifiedName);
      return !attr || String(attr) !== "false";
    }
    return null;
  }

  protected getNumberAttribute(qualifiedName: string): number | null {
    if (this.hasAttribute(qualifiedName)) {
      return Number(this.getAttribute(qualifiedName));
    }
    return null;
  }

  protected getStringValue(attributeName: string, defaultValue: string = ""): string {
    return this.getAttribute(attributeName) || defaultValue;
  }

  protected getBooleanValue(attributeName: string, defaultValue: boolean = false): boolean {
    return this.getBooleanAttribute(attributeName) || defaultValue;
  }

  // --- Component Lifecycle Methods ---
  protected connectedCallback() {
    // console.log("Custom square element added to page.")

    if (!this._loaded) {
      this.componentDidLoad();
      this._loaded = true;
    }
  }

  protected disconnectedCallback() {
    // console.log("Custom square element removed from page.");
  }

  protected adoptedCallback() {
    // console.log("Custom square element moved to new page.");
  }

  protected attributeChangedCallback(name?: string, oldValue?: string, newValue?: string) {
    // console.log("Custom square element attributes changed.");

    if (this._loaded) {
      this.componentDidUpdate(name, oldValue, newValue);
    }
  }

  protected componentDidLoad() {}

  protected componentDidUpdate(name?: string, oldValue?: string, newValue?: string) {}
}
