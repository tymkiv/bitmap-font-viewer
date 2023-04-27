import { nameWithoutExt } from "./utils";

export class SelectInputHandler {
    constructor(DOMElement) {
        this.DOMElement = DOMElement;

        store.fonts.forEach(font => this._createOption(font));

        masterStream.subscribe("onXMLReady", ({ file, status }) => {
            if (!status) return;

            this._createOption(nameWithoutExt(file.name));
            this._handler();
        });

        this.DOMElement.addEventListener("change", () => this._handler());
    }

    _handler() {
        masterStream.emit("onChooseFont", { font: this.DOMElement.value });
    }

    _createOption(name) {
        const option = document.createElement("option");
        option.value = name;
        option.innerText = name;
        option.selected = true;
        this.DOMElement.appendChild(option);
    }

}