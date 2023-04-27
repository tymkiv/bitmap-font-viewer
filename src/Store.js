import { nameWithoutExt } from "./utils";

export class Store {
    constructor() {
        this.fonts = [];
        this.choosedFont = null;
        this.text = null;

        masterStream.subscribe("onXMLReady", ({ file, status }) => {
            if (!status) return;

            this.fonts.push(nameWithoutExt(file.name));
        });
        masterStream.subscribe("onChooseFont", ({ font }) => this.choosedFont = font);
        masterStream.subscribe("onText", ({ text }) => this.text = text);
    }
}