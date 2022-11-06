import '../App';


export default function InputImage(props){
    const inputMessege =
        props.inputData.isProcessing ? "Przetwarzanie..." :
        !props.inputData.isDragged && !props.inputData.isHovered ? <span>Dodaj lub upuść obraz<br/>(png, jpeg, jpg, tif)"</span> :
        !props.inputData.isDragged && props.inputData.isHovered ? "Naciśnij, by dodać plik" :
        props.inputData.isDragged && !props.inputData.isHovered ? "Upuść plik" :
        "Przetwarzanie..." 
    
    return (
    <div className='input-photo-container'>
        <label htmlFor="file"><h1>Umieść plik:</h1>
            <div className="input-field">
                <span className='input-message'>{inputMessege}</span>
                <input name="inputPhoto" className="custom-file-input" type="file" accept="image/png, image/jpeg, image/tif" onChange={(event) => props.imageChange(event)} onDrop={(event) => props.handleDrop(event)} />
            </div>
        </label>
    </div>
    )
}