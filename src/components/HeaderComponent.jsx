import '../App';

export default function HeaderComponent(props){
    console.log(props.theme.nextColor)
    const nextColor = props.theme.nextColor
    return( 
        <div className='main-header no_highlights'>
            <h3 className='main-share' onClick={props.share}>Udostępnij</h3>
            <span className='main-logo'>incunae<sub>beta</sub></span>
            <div className='main-header-right-elements'>
                <span className='main-change-background' onClick={props.change} style={{backgroundColor: nextColor}}></span>
                <h1 className='main-get-help' onClick={props.help}>{!props.isHelpShown ? "?" : "Zamknij"}</h1>
            </div>
      </div>
    )
}