import { nameWithoutExt, getPNGPath, createResolver } from "./utils";

export class Loader {
    _loading;
    constructor() {
        this._unusedFiles = {
            xml: [],
            png: []
        };

        this._queue = [];

        masterStream.subscribe("addFiles", ({ files }) => this.addFiles(files));
    }

    async addFiles(files) {
        if (this._loading) {
            this._queue.push(...files);
            return;
        }

        this._loading = true;
        for (const file of files) {
            let type;
            switch (file.type) {
                case "image/png":
                    type = "png";
                    break;
                case "text/xml":
                    type = "xml";
                    break;
                default:
                    throw new Error(`Тип файла ${file.type} не соответствует text/xml или image/png`);
            }

            await this._addFile(file, type);
        }
        this._loading = false;

        if (this._queue.length) {
            await this.addFiles(this._queue);
        }
    }

    _addFile(file, type) {
        const name = file.name;
        const otherType = ({
            "xml": "png",
            "png": "xml",
        })[type];


        const otherFile = this._find(name, otherType);

        if (otherFile) {
            this._remove(name, otherType);

            const pngPath = getPNGPath(type === "png" ? file : otherFile);

            masterStream.emit("readXML", { file: type === "xml" ? file : otherFile, pngPath });

            const resolver = createResolver();
            const subscriber = masterStream.subscribe("onXMLReady", () => {
                subscriber.unsubscribe();
                resolver.resolve();
            });
            return resolver;
        } else {
            this._unusedFiles[type].push(file);
        }
    }

    _find(name, type) {
        return this._unusedFiles[type].find(file => nameWithoutExt(file.name) === nameWithoutExt(name));
    }

    _remove(name, type) {
        this._unusedFiles[type] = this._unusedFiles[type].filter(file => nameWithoutExt(file.name) !== nameWithoutExt(name));
    }
}