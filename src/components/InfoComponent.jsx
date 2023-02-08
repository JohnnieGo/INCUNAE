import "../App";

export default function InfoComponent(props) {
  return (
    <div className="info-container">
      <div className="text-width-limiter">
        <h2>
          Incunae to program służący do automatycznego transliterowania dawnych
          tekstów.
        </h2>
        <p>
          Dzięki optycznemu rozpoznawaniu znaków (OCR) oraz modelom opartym na
          uczeniu maszynowym program transliteruje druki wydawane od XVI wieku.
        </p>
        <p>
          Program korzysta z różnych modeli rozpoznawania dawnych krojów, nie są
          to jednak modele przystosowane do pisma polskiego. W polu „Wybierz
          model” dostępne są cztery modele wytrenowane w Bibliotece Uniwersytetu
          w Mannheim. Mają one dobrą skuteczność, jednak w zdecydowanej
          większości nie rozpoznają poprawnie znaków charakterystycznych dla
          dawnej polszczyzny.
        </p>
        <p>
          Sytuację poprawia znajdująca się w edytorze funkcja „znajdź
          pochylone”, która automatycznie zmienia nierozpoznane znaki, jednak
          wciąż w większości litery takie jak: ż, ź, ą, ę itd. nie są poprawnie
          wykrywane.
        </p>
        <p>
          <b>
            Przetestuj Incunae, używając{" "}
            <a
              href="https://polona.pl/archive?uid=69993852&cid=70136477&name=download_fullJPG"
              target={"blank"}
              download
            >
              tej karty
            </a>{" "}
            z <i>Dworzanina polskiego</i> Łukasza Górnickiego z 1566 roku.
          </b>
          </p>
          <p><b>
            Najlepszym dostępnym obecnie rozwiązaniem pozwalającym na
            transkrypcję dawnych druków i pisma odręcznego jest{" "}
            <a href="https://readcoop.eu/transkribus/" target={"blank"}>
              Transkribus
            </a>
            .
          </b>
        </p>
        <p>
          By dowiedzieć się więcej, <a onClick={props.help}>kliknij tu</a> lub
          naciśnij na znak zapytania w prawym górnym rogu ekranu.
        </p>
      </div>
    </div>
  );
}
