import React from "react";
import * as quillToWord from "quill-to-word";
import { saveAs } from "file-saver";
import Select, { components } from "react-select";


import { useState } from "react";
import { Quill } from "react-quill";
import '../App';


// Custom Undo button icon component for Quill editor. You can import it directly
// from 'quill/assets/icons/undo.svg' but I found that a number of loaders do not
// handle them correctly
const CustomUndo = () => (
  <svg viewBox="0 0 18 18">
    <polygon className="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10" />
    <path
      className="ql-stroke"
      d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9"
    />
  </svg>
);

// Redo button icon component for Quill editor
const CustomRedo = () => (
  <svg viewBox="0 0 18 18">
    <polygon className="ql-fill ql-stroke" points="12 10 14 12 16 10 12 10" />
    <path
      className="ql-stroke"
      d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5"
    />
  </svg>
);


const CorrectCharacters = () => <span>Popraw tekst</span>;

const ExportDoc = () => <span>Eksportuj</span>;

// Undo and redo functions for Custom Toolbar
function undoChange() {
  this.quill.history.undo();
}

function redoChange() {
  this.quill.history.redo();
}

function intelligentCorrect() {
        const toChange = this.quill.getContents().ops[0].insert
            .replaceAll(" /" || "/", ",") 
            .replaceAll("ſſ", "sz")
            .replaceAll("ſ", "s")
            .replaceAll("ꝛ", "r")
            .replaceAll("ö"|"ö"|"ð"|"óͤ"|"óͤ"|"oͤ"|"òͤ"|"õ"|"ô", "ó")
            .replaceAll("ä"|"aͤ"|"ã"|"aͤ"|"à", "á")
            .replaceAll("ã", "á")
            .replaceAll("ß", "sz")
            .replaceAll("ü"|"ů", "u")
            .replaceAll("V", "U")
            .replaceAll("ʒ", "z")
            .replaceAll("ẽ", "é")
            .replaceAll("⸗", "-")
            .replaceAll(" ᷣ", " ")
            .replaceAll("ͤ", "")
            .replaceAll("ff", "sz")
            .replaceAll("ñ", "ń")
            .replaceAll("ů", "u")
            .replaceAll("v", "u")
            .replaceAll("ssz", "sz")
            .replaceAll("rzz", "rz")
            .replaceAll("'", "")
            .replaceAll("è", "ć")

       this.quill.setContents([{insert: toChange}])
}
// Add sizes to whitelist and register them
// const Size = Quill.import("formats/size");
// Size.whitelist = ["extra-small", "small", "medium", "large"];
// Quill.register(Size, true);

// Add fonts to whitelist and register them
// const Font = Quill.import("formats/font");
// Font.whitelist = [
//   "arial",
//   "comic-sans",
//   "courier-new",
//   "georgia",
//   "helvetica",
//   "lucida"
// ];
// Quill.register(Font, true);

// Modules object for setting up the Quill editor
export const modules = {
  toolbar: {
    container: "#toolbar",
    handlers: {
      undo: undoChange,
      redo: redoChange,
      intelligentCorrect: intelligentCorrect,
      exportText: exportText
    }
  },
  history: {
    delay: 500,
    maxStack: 100,
    userOnly: true
  }
};

// Formats objects for setting up the Quill editor
export const formats = [
  "header",
  "size",
  "bold",
  "italic",
  "underline",
  "align",
  "strike",
  "script",
  "blockquote",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "color",
  "code-block"
];

async function exportText() {
  const delta = this.quill.getContents();
  const quillToWordConfig = {
    exportAs: "blob"
  };
  const docAsBlob = await quillToWord.generateWord(delta, quillToWordConfig);
  saveAs(docAsBlob, "Transkrypcja.docx");
}

// Quill Toolbar component
export const QuillToolbar = () => (
  
  <div id="toolbar">
    <span className="ql-formats">
      <button className="ql-bold" />
      <button className="ql-italic" />
      <button className="ql-underline" />
      <button className="ql-strike" />
    </span>

    <span className="ql-formats">
      <button className="ql-undo">
        <CustomUndo />
      </button>
      <button className="ql-redo">
        <CustomRedo />
      </button>
    </span>

    <span className="ql-formats">
      <button className="ql-intelligentCorrect" style={{width: "fit-content"}}>
        <CorrectCharacters />
      </button>
    </span>
    <span className="ql-formats">
      <button className="ql-exportText">
        <ExportDoc />
      </button>
    </span>
  </div>
);

export default QuillToolbar;
