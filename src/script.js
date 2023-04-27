import * as PIXI from 'pixi.js';
import "toolcool-color-picker";
import { MasterStream } from "./MasterStream";
import { Loader } from "./Loader";
import { XMLReader } from "./XMLReader";
import { Store } from "./Store";
import { FileInputHandler } from "./FileInputHandler";
import { TextareaInputHandler } from "./TextareaInputHandler";
import { SelectInputHandler } from "./SelectInputHandler";
import { Viewer } from "./Viewer";

window.PIXI = PIXI;
window.masterStream = new MasterStream();
window.store = new Store();

new Loader();
new XMLReader();
new FileInputHandler(document.getElementById("drop-area"), document.getElementById("file-input"));
new TextareaInputHandler(document.getElementById("textarea-input"));
new SelectInputHandler(document.getElementById("select-input"));
new Viewer(document.getElementById("canvas-container"));