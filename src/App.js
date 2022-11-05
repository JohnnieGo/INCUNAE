import React, { useEffect, useState } from 'react';
import { createWorker } from 'tesseract.js';
import InputImage from './components/InputImage'
import OutputText from './components/OutputText'
import ImageDisplay from './components/ImageDisplay'
import HelpComponent from './components/HelpComponent'

// import frak2021 from '../frak2021_1.069'

import './App.css';
// import '../node_modules/react-grid-layout/css/styles'
// import '../node_modules/react-resizable/css/styles'

function App() {

  const [ocr, setOcr] = useState("");
  const [imageData, setImageData] = useState(null);
  const [languageData, setLanguageData] = useState('frak2021_1.069')
  const [inputData, setInputData] = useState({isDragged: false, isHovered: true, isProcessing: false})
  const [progress, setProgress] = useState(0)
  const [isInputAreaShown, setIsInputAreaShown] = useState(true)
  const [isHelpShown, setIsHelpShown] = useState(false)
  // const [quillData, setQuillData] = useState()

  function setInputDataWithAProp(key, val){
    setInputData((prevInputData) => {
      return {...prevInputData,
      [key]: val}
    })
  }

  const languagesAPI = 'https://raw.githubusercontent.com/JohnnieGo/INCUNAE/main/tess-trainedata' 
  console.log(languagesAPI)
  const worker = createWorker({
    logger: m => {
      setProgress(parseInt(m.progress * 100))},
      langPath: languagesAPI,
    gzip: false
  });
  
  const doOCR = async () => {
    setInputDataWithAProp("isProcessing", true)
    await worker.load();
    await worker.loadLanguage(languageData);
    await worker.initialize(languageData);
    await worker.setParameters({
      preserve_interword_spaces: '1',
      tessjs_create_hocr: "'1",
    });  
    const { data } = await worker.detect(imageData);
    console.log(data)
    const { data: { text } } = await worker.recognize(imageData);
    setOcr(text);
    setInputDataWithAProp("isProcessing", false)
    setInputDataWithAProp("isDragged", false)
  };
  
  useEffect(() => {
    if (imageData){doOCR()}
  }, [imageData]);



  async function handleImageChange(data){
    const file = data.target.files[0];
    console.log(file)
    const reader = new FileReader();
    reader.onloadend = () => {
      const imageDataUri = reader.result;
      setImageData(imageDataUri);
    };
    reader.readAsDataURL(file);
  }

  function handleLanguageChange(event) {
    console.log(imageData)
    setLanguageData(event.target.value)
    if (imageData){doOCR()}
  }

  const handleDrop = (event) => {
    const allowedTypes = [event.target.accept.split(",")];
    const fileType = event.dataTransfer.files[0].type
    if(allowedTypes[0].includes(fileType)){
    } else {
      event.preventDefault();
    }
  };

 
  function dragEnterInput(){
    setInputDataWithAProp("isDragged", true)
  }

  function dragExitInput(){
    setInputDataWithAProp("isDragged", false)
  }

  function mouseEnterInput(){
    setInputDataWithAProp("isHovered", true)
  }
  function mouseExitInput(){
    setInputDataWithAProp("isHovered", false)
  }

  function setInputAreaDisplay(){
    setIsInputAreaShown(prev => !prev)
  }

  console.log("APP.js zmiana")
  return (
    <main className={`main ${isInputAreaShown ? "" : "main-grid-no-left-column"}`}>
      <div className='main-header'>
        <h3 className='main-share'>Udostępnij</h3>
        <p className='main-logo'>incunae</p>
        <h1 className='main-get-help'>?</h1>
      </div>
      <div className='main-left-column'>
        <h3 onClick={setInputAreaDisplay}className={`left-column-show-hide no_highlights ${imageData ? "show-left-column" : "hide"}`}>{isInputAreaShown ? "Schowaj panel" : "Pokaż panel"}</h3>
        {isInputAreaShown && <div className=''>
          <h1>Wybierz model:</h1>
          <div className="select">
          <select 
              className='select-model'
              id="languageData"
              value={languageData}
              onChange={handleLanguageChange}
              name="languageData"
          >
            <optgroup label="Fraktura i gotyk">
              <option value="frak2021_1.069">frak2021_1.069</option>
              <option value="frak2021-09">frak2021-09</option>
              <option value="GT4HistOCR">GT4HistOCR</option>
              <option value="Fraktur_50000000">Fraktur_50000000</option>
              <option value="gothall">gothall</option>
            </optgroup>
            <optgroup label="Antykwa">
              <option value="pol">pol</option>
              <option value="frak2021-0.905">frak2021-0.905</option>
              <option value="ces_frak">ces_frak</option>
            </optgroup>
          </select>  
          </div>  
          <div className='input-container' onDragEnter={dragEnterInput} onDragLeave={dragExitInput} onMouseEnter={mouseEnterInput} onMouseLeave={mouseExitInput}>
              <InputImage imageChange={handleImageChange} handleDrop={handleDrop} inputData={inputData}/>
          </div>
        </div>}
      </div>
      {imageData && <div className='main-middle-column'>
        <div className='output-container'>
          <OutputText ocr={ocr}/>
          {/* <MyComponent ocr={ocr}/> */}
          {/* <button onClick={doOCR}>Run</button> */}
        </div>
      </div>}
      {imageData && <div className='main-right-column'>
          {/* <img className={imageData ? 'input-picture' : undefined} src={imageData} alt="" /> */}
          {imageData && <ImageDisplay imageData={imageData}/>}
      </div>}
      <div className='main-footer'>
        {inputData.isProcessing ? <h5>{progress}%</h5> : undefined}
        <h4 className="footer-text">Jan Żaborowski, Kraków 2022 halko</h4>
        {inputData.isProcessing ? <hr className='main-progress-line' style={{width: `${progress}%`}}/> : undefined}
      </div>
      {imageData ? undefined : <HelpComponent/>}
    </main>
  );

}

export default App;