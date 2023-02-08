import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import QuillToolbar, { modules, formats } from "../components/QuillToolbar";

import "react-quill/dist/quill.snow.css";
import "../App";

export default function OutputText(props) {

  const [value, setValue] = useState("");
  useEffect(() => {
    console.log(props.ocr);
    const ocrText = props.ocr.replace(/\n\s*\n/g, "\n").trim();
    console.log(ocrText);
    setValue(ocrText);
  }, [props.ocr]);
  return (
    <div className="quil-toolbar-quill">
      <QuillToolbar />
      <ReactQuill
        theme="snow"
        onChange={setValue}
        value={value}
        readOnly={false}
        modules={modules}
        formats={formats}
        className={"output-text-field"}
      />
    </div>
  );
}
