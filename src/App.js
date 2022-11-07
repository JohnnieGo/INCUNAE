import React, { useEffect, useState } from 'react';
import { createWorker } from 'tesseract.js';
import InputImage from './components/InputImage'
import OutputText from './components/OutputText'
import ImageDisplay from './components/ImageDisplay'
import InfoComponent from './components/InfoComponent'
import HelpComponent from './components/HelpComponent'
import { CSSTransition } from "react-transition-group";


import './App.css';


function App() {

  const [ocr, setOcr] = useState("");
  const [imageData, setImageData] = useState(null);
  const [languageData, setLanguageData] = useState('frak2021_1.069')
  const [inputData, setInputData] = useState({isDragged: false, isHovered: true, isProcessing: false})
  const [progress, setProgress] = useState(0)
  const [isInputAreaShown, setIsInputAreaShown] = useState(true)
  const [isHelpShown, setIsHelpShown] = useState(false)
  const [themeData, setThemeData] = useState({currentColor: "#FFF6E6", nextColor: "#F5F5F5"})

  function changeThemeData(){
    const colors = ["#FFF6E6", "#F5F5F5", "#FFFFFF"]
    const currentColorIndex = colors.indexOf(themeData.currentColor)
    if (currentColorIndex === colors.length - 1){
      setThemeData({currentColor: colors[0], nextColor: colors[1]})
    } else if (currentColorIndex === colors.length - 2){
      setThemeData({currentColor: colors[colors.length - 1], nextColor: colors[0]})
    } else {
      setThemeData({currentColor: colors[currentColorIndex + 1], nextColor: colors[currentColorIndex + 2]})
    }
    console.log(themeData.currentColor)
    console.log(themeData.nextColor)
  } 

  function setInputDataWithAProp(key, val){
    setInputData((prevInputData) => {
      return {...prevInputData,
      [key]: val}
    })
  }

  const languagesAPI = 'https://raw.githubusercontent.com/JohnnieGo/INCUNAE/main/tess-trainedata' 

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
    const reader = new FileReader();
    reader.onloadend = () => {
      const imageDataUri = reader.result;
      setImageData(imageDataUri);
    };
    reader.readAsDataURL(file);
  }

  function handleLanguageChange(event) {
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

  function setHelp() {
    setIsHelpShown((prev)=>!prev)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "INCUNAE",
          text: "Narzędzie do transkrypcji dawnych tekstów online.",
          url: "https://johnniego.github.io/INCUNAE/",
        })
        .then(() => {
          console.log("Wysłano");
        })
        .catch((error) => {
          console.error("Ups... Coś poszło nie tak.", error);
        });
    }
  };

  const nodeRef = React.useRef(null)

  return (
    <CSSTransition
    in
    classNames="fade"
    appear={true}
    timeout={500}
    nodeRef={nodeRef}
    >
    <main ref={nodeRef} className={`main colorWhite ${isInputAreaShown ? "" : "main-grid-no-left-column"}`} style={{backgroundColor: themeData.currentColor}}>
      <div className='main-header no_highlights'>
        <h3 className='main-share' onClick={handleShare}>Udostępnij</h3>
        <span className='main-logo'>incunae<sub>beta</sub></span>
        <div className='main-header-right-elements'>
          <span className='main-change-background' onClick={changeThemeData} style={{backgroundColor: themeData.nextColor}}></span>
          <h1 className='main-get-help' onClick={setHelp}>?</h1>
        </div>
      </div>
      <div className='main-left-column no_highlights'>
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
              style={{backgroundColor: themeData.currentColor}}
          >
            <optgroup label="Fraktura i gotyk">
              <option value="frak2021_1.069">frak2021_1.069</option>
              <option value="frak2021-09">frak2021-09</option>
              <option value="GT4HistOCR">GT4HistOCR</option>
              <option value="Fraktur_50000000">Fraktur_50000000</option>
              <option value="gothall">gothall</option>
              <option value="frk">frk</option>
              <option value="ces_frak">ces_frak</option>
            </optgroup>
            <optgroup label="Antykwa">
              <option value="pol">pol</option>
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

        </div>
      </div>}
      {imageData && <div className='main-right-column'>
          {imageData && <ImageDisplay imageData={imageData}/>}
      </div>}
      <div className='main-footer'>
        {inputData.isProcessing ? <h5>{progress}%</h5> : undefined}
        <h4 className="footer-text">{"Laura <3"}</h4>
        {inputData.isProcessing ? <hr className='main-progress-line' style={{width: `${progress}%`}}/> : undefined}
      </div>
      {imageData ? undefined : <InfoComponent />}
      <CSSTransition
            in={isHelpShown}
            appear={true}
            timeout={300}
            classNames="Animation"
            unmountOnExit
        >
          <HelpComponent color={themeData.currentColor}/>
        </CSSTransition>
    </main>
    </CSSTransition>
  );

}

export default App;