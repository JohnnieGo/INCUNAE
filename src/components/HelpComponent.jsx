import '../App';


export default function HelpComponent(){
    return(
        <div className='help-container'>
            <h2>Incunae to program służący do automatycznego transliterowania dawnych tekstów.</h2>
            <p>Dzięki optycznemu rozpoznawaniu znaków (OCR) oraz modelom opartym na uczeniu maszynowym program odczytuje druki wydawane od XVI wieku.</p>
            <p>Niestety nie istnieją jeszcze modele stworzone stricte dla polskich znaków, konieczne jest korzystanie z modeli niemieckich. W polu „Wybierz model” dostępne są cztery modele wytrenowane przez pracowników Biblioteki Uniwersytetu w Mannheim. Mają one dobrą skuteczność w rozpoznawaniu znaków, jednak w zdecydowanej większości nie rozpoznają poprawnie samogłosek pochylonych. Sytuację poprawia znajdująca się w edytorze funkcja „znajdź pochylone”, która automatycznie zmienia nierozpoznane znaki na samogłoski pochylone.</p>
        </div>
    )
}