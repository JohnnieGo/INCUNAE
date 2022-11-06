// export default function OutputText(props){
//     return (
//     <div className='white-space-pre-wrap'>
//         <input className="output-text-input" type="text" id="fname" name="fname" value={props.ocr}></input>
//     </div>
//     )
// }

import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import QuillToolbar, { modules, formats } from "../components/QuillToolbar";

import 'react-quill/dist/quill.snow.css';
import '../App'

export default function OutputText(props){
        const helpText = 'Scriptio to strona służąca do transkrypcji tekstów dawnych. By odczytywać to, co napisane, program korzysta z wyuczonych modeli opartych na uczeniu maszynowym (zob. więcej). Niestety nie istnieją jeszcze dobre modele dla dawnych polskich czcionek, w związku z czym konieczne jest posiłkowanie się modelami dla czcionek niemieckich. W polu “wybierz model” można skorzystać z różnych rozwiązań, jednak większość z nich niepoprawnie wykrywa specyficzne dla polskiego drukarstwa znaki (np. á, é). Warto jednak eksperymentować, by osiągnąć najlepsze rezultaty.'
        const [value, setValue] = useState("");
        useEffect(() => {
            console.log(props.ocr)
            const ocrText = props.ocr.replace(/\n\s*\n/g, '\n').trim()
            console.log(ocrText)
            setValue(ocrText);
          }, [props.ocr]);
        return(
            <div className='quil-toolbar-quill'>
              <QuillToolbar/>
              <ReactQuill theme="snow" onChange={setValue} value={value} readOnly={false}  modules={modules} formats={formats} className={"output-text-field"}/>
            </div>
        )
    }
    
    
