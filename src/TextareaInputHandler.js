export class TextareaInputHandler {
    constructor(DOMElement) {
        this.DOMElement = DOMElement;

        this.DOMElement.addEventListener("input", () => this._handler());
        this._handler();
    }

    _handler() {
        const text = this.DOMElement.value;

        masterStream.emit("onText", { text });
    }
}