import '../App';


export default function InfoComponent(){
    return(
        <div className='info-container'>
            <h2>Incunae to program służący do automatycznego transliterowania dawnych tekstów.</h2>
            <p>Dzięki optycznemu rozpoznawaniu znaków (OCR) oraz modelom opartym na uczeniu maszynowym program transliteruje druki wydawane od XVI wieku.</p>
            <p>Niestety nie istnieją jeszcze modele stworzone stricte dla polskich znaków, konieczne jest korzystanie z modeli niemieckich. W polu „Wybierz model” dostępne są cztery modele wytrenowane przez pracowników Biblioteki Uniwersytetu w Mannheim. Mają one dobrą skuteczność, jednak w zdecydowanej większości nie rozpoznają poprawnie znaków charakterystcznych dla dawnej polszczyzny.</p>
            <p>Sytuację poprawia znajdująca się w edytorze funkcja „znajdź pochylone”, która automatycznie zmienia nierozpoznane znaki, jadnak wciąż w większości litery takie jak: ż, ź, ą, ę itd. nie są poprawnie wykrywane.</p>
        </div>
    )
}