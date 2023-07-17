export class CustomElement extends HTMLElement {
  private _loaded = false;

  constructor() {
    super();
  }

  getBooleanAttribute(qualifiedName: string): boolean | null {
    if (this.hasAttribute(qualifiedName)) {
      const attr = this.getAttribute(qualifiedName);
      return !attr || String(attr) !== "false";
    }
    return null;
  }

  getNumberAttribute(qualifiedName: string): number | null {
    if (this.hasAttribute(qualifiedName)) {
      return Number(this.getAttribute(qualifiedName));
    }
    return null;
  }

  getStringValue(attributeName: string, defaultValue: string = ""): string {
    return this.getAttribute(attributeName) || defaultValue;
  }

  getBooleanValue(attributeName: string, defaultValue: boolean = false): boolean {
    return this.getBooleanAttribute(attributeName) || defaultValue;
  }

  // --- Component Lifecycle Methods ---
  connectedCallback() {
    // console.log("Custom square element added to page.")

    if (!this._loaded) {
      this.componentDidLoad();
      this._loaded = true;
    }
  }

  disconnectedCallback() {
    // console.log("Custom square element removed from page.");
  }

  adoptedCallback() {
    // console.log("Custom square element moved to new page.");
  }

  attributeChangedCallback(name?: string, oldValue?: string, newValue?: string) {
    // console.log("Custom square element attributes changed.");

    if (this._loaded) {
      this.componentDidUpdate(name, oldValue, newValue);
    }
  }

  componentDidLoad() {}

  componentDidUpdate(name?: string, oldValue?: string, newValue?: string) {}
}
