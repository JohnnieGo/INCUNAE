import React from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import '../App'

export default function ImageDisplay(props){
    return (
        // <div className="image-display">
            <TransformWrapper
                initialScale={1}
                initialPositionX={0}
                initialPositionY={0}
                >
                {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                <React.Fragment > 
                        <div className="image-transform-wrapper-tools">
                            <button className="image-transform-wrapper-tools-button" onClick={() => zoomIn()}>+</button>
                            <button className="image-transform-wrapper-tools-button" onClick={() => zoomOut()}>–</button>
                        </div>
                    <TransformComponent>
                        <img className={props.imageData ? 'input-picture' : 'undefined'} src={props.imageData} />
                    </TransformComponent>
                </React.Fragment>
                )}
            </TransformWrapper>
        // </div>
    )
}

// className={props.imageData ? 'input-picture' : 'undefined'}