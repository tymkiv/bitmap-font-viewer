import { nameWithoutExt } from "./utils";

export class Store {
    constructor() {
        this.fonts = {};
        this.choosedFont = null;
        this.text = null;

        masterStream.subscribe("onXMLReady", ({ name, fontSize, status }) => {
            if (!status) return;

            this.fonts[name] = fontSize;
        });
        masterStream.subscribe("onChooseFont", ({ font }) => this.choosedFont = font);
        masterStream.subscribe("onText", ({ text }) => this.text = text);
    }
}