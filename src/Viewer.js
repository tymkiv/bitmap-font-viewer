import * as PIXI from "pixi.js";

export class Viewer {
    constructor(DOMElement) {
        this.DOMElement = DOMElement;

        this.app = new PIXI.Application({
            width: this.DOMElement.clientWidth,
            height: this.DOMElement.clientHeight,
            backgroundColor: 0xcccccc,
        });

        this.DOMElement.appendChild(this.app.view);

        document.getElementById("color-picker").addEventListener("change", event => {
            this.app.renderer.backgroundColor = "0x" + event.detail.hex.slice(1);
        })

        masterStream.subscribe("onText", () => this._write());
        masterStream.subscribe("onChooseFont", () => this._changeFont());
    }

    _write() {
        if (!store.choosedFont) return;

        this.bitmapText.text = store.text;
    }

    _changeFont() {
        if (!store.choosedFont) {
            this.bitmapText.text = "";
        } else {
            this.bitmapText.text = store.text;
            this.bitmapText.fontName = store.choosedFont;
        }
    }

    get bitmapText() {
        this._bitmapText ||= new PIXI.BitmapText("", { fontName: store.choosedFont, fontSize: 50 });
        this.app.stage.addChild(this._bitmapText);
        return this._bitmapText;
    }
}