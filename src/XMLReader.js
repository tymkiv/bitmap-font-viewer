import { nameWithoutExt } from "./utils";

export class XMLReader {
    constructor() {
        masterStream.subscribe("readXML", ({ file, pngPath }) => this._read(file, pngPath));
    }

    _read(file, pngPath) {
        if (file.type !== "text/xml") {
            this._emitXMLReady({ status: false });
            throw new Error(`Тип файла ${file.type} не соответствует text/xml`);
        }

        const reader = new FileReader();
        reader.onloadend = () => this._onloadend(reader.result, pngPath, file);
        reader.readAsText(file);
    }

    _onloadend(result, pngPath, file) {
        // превращаем результат в xml документ
        const xmlDoc = this._parseInXML(result);

        // заменяем путь к png файлу
        xmlDoc.querySelector("pages page").setAttribute("file", pngPath);

        // превращаем в blob для того, что бы записать файл по ссылке
        const xmlBlob = this._parseInBlob(xmlDoc);

        // файл по ссылке
        const url = URL.createObjectURL(xmlBlob);

        PIXI.Loader.shared.add(nameWithoutExt(file.name), url).load(() => {
            // эмитим результат
            this._emitXMLReady({ file });
        });
    }

    _parseInXML(result) {
        return new DOMParser().parseFromString(result, 'text/xml');
    }

    _parseInBlob(xmlDoc) {
        const serializer = new XMLSerializer();
        return new Blob([serializer.serializeToString(xmlDoc)], { type: 'text/xml' });
    }

    _emitXMLReady({ file, status = true }) {
        masterStream.emit("onXMLReady", { file, status });
    }
}