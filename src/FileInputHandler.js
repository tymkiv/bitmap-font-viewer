export class FileInputHandler {
    constructor(DOMElementContainer, DOMElementInput) {
        this.DOMElementContainer = DOMElementContainer;
        this.DOMElementInput = DOMElementInput;


        ["dragenter", "dragover", "dragleave", "drop"].forEach(eventName => {
            this.DOMElementContainer.addEventListener(eventName, this._preventDefaults, false)
        });

        ["dragenter", "dragover"].forEach(eventName => {
            this.DOMElementContainer.addEventListener(eventName, () => this._highlight(), false)
        });

        ["dragleave", "drop"].forEach(eventName => {
            this.DOMElementContainer.addEventListener(eventName, () => this._unhighlight(), false)
        });

        this.DOMElementContainer.addEventListener("drop", (event) => this._handleDrop(event), false)

        this.DOMElementInput.addEventListener("change", event => this._handleChange(event), false);
    }

    _handleChange() {
        const files = [...this.DOMElementInput.files];
        this._handleFiles(files);
    }

    _preventDefaults(event) {
        event.preventDefault()
        event.stopPropagation()
    }

    _highlight() {
        this.DOMElementContainer.classList.add("highlight")
    }

    _unhighlight() {
        this.DOMElementContainer.classList.remove("highlight")
    }

    _handleDrop(event) {
        const files = [...event.dataTransfer.files]
        this._handleFiles(files);
    }

    _handleFiles(files) {
        masterStream.emit("addFiles", { files });
    }

}