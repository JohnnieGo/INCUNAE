import "../App";

export default function HelpComponent(props) {
  return (
    <div className="info-container" style={{ backgroundColor: props.color }}>
      <div>
        <h2>Instrukcja:</h2>
        <ol type="1">
          <li>
            Wybierz model rozpoznawania z listy „Wybierz model”. Każdy model
            daje inne rezultaty, zwykle najwyższą skuteczność w rozpoznawaniu
            pisma gotyckiego ma domyślnie wybrany „frak2021_1.069”.
          </li>
          <li>
            Naciśnij na pole „Umieść plik” i wybierz obraz w formacie png, jpeg,
            jpg, tif. Możesz także przeciągnąć i upuścić obraz w polu.
          </li>
          <li>
            Proces transliteracji rozpocznie się automatycznie. Jego postęp
            pokazuje pasek u dołu ekranu. Szybkość zależy od połączenia
            internetowego (musi zostać pobrany wybrany model, rozpoznawanie
            odbywa się lokalnie na komputerze użytkownika i żaden obraz nie jest
            wysyłany na serwer).
          </li>
          <li>
            Po ukończeniu procesu tekst wyświetlany jest w polu na środku
            ekranu, można go poprawiać za pomocą wbudowanego edytora. Na pasku
            narzędzi edytora znajduje się funkcja „Popraw automatycznie”, która
            poprawia błędnie rozpoznane znaki. Zmiana modelu powoduje ponowne
            przetworzenie obrazu. Na prawej stronie ekranu wyświetlany jest
            podgląd obrazu.
          </li>
          <li>
            By transliterować kolejny obraz, należy go dodać w sposób opisany w
            punkcie 2.
          </li>
        </ol>
      </div>
      <div>
        <h2>Wymagania dotyczące obrazu:</h2>
        <ol>
          <li>Najlepiej, gdy ma on min. 300-400 dpi.</li>
          <li>
            Nie powinien mieć zagięć i innych utrudniających odczytanie skaz.
          </li>
          <li>
            Nie powinien być zbinaryzowany, czyli czarnobiały (nieznacznie
            obniża to skuteczność).
          </li>
        </ol>
      </div>
      <div>
        <h2>O projekcie:</h2>
        <p>
          Aplikacja działa w oparciu o opensourcowy silnik Tesseract w wersji
          5.1.0, a konkretnie jego port udostępniony w ramach projektu Naptha.
          Za podstawę do rozpoznawania obrazu posłużyły modele dla druków
          historycznych stworzone w Bibliotece Uniwersytetu w Mannheim, gdzie w
          ostatnim czasie, w ramach projektu OCR-BW, prowadzone są intensywne i
          różnorodne inicjatywy dotyczące automatyzacji rozpoznawania tekstu i
          jego transkrypcji. Modele te dostępne są przez bibliotekę bezpłatnie.
          Zostały one wytrenowane na historycznej niemieckiej frakturze oraz
          wczesnych drukach łacińskich, w związku z czym nie rozpoznają wielu
          polskich znaków diakrytycznych.
        </p>
        <p>
          W obecnym stanie Incunae może służyć raczej jako ciekawostka,
          pokazująca, że możliwe jest automatyczne transkrybowanie nawet
          najstarszych polskich druków. Najlepszą jakość transkrypcji dawnych
          druków oraz rękopisów zapewnia{" "}
          <a href="https://readcoop.eu/transkribus/" target={"blank"}>
            Transkribus
          </a>
          .
        </p>
        <h2>Aplikacja powstała przy użyciu:</h2>
        <ol>
          <li>
            <a href="https://pl.reactjs.org/" target={"blank"}>
              React
            </a>
          </li>
          <li>
            <a href="https://tesseract.projectnaptha.com/" target={"blank"}>
              Tesseract.js
            </a>
          </li>
          <li>
            <a href="https://quilljs.com/" target={"blank"}>
              Quill
            </a>
          </li>
          <li>
            <a
              href="https://github.com/prc5/react-zoom-pan-pinch"
              target={"blank"}
            >
              React Zoom Pan Pinch
            </a>
          </li>
          <li>
            <a href="https://create-react-app.dev/" target={"blank"}>
              Create React App
            </a>
          </li>
          <li>
            <a
              href="https://reactcommunity.org/react-transition-group/"
              target={"blank"}
            >
              React Transition Group
            </a>
          </li>
          <li>
            <a href="https://github.com/" target={"blank"}>
              Github Pages
            </a>
          </li>
        </ol>
      </div>
      <div>
        <h2>Lista użytych modeli</h2>
        <ol>
          <li>
            <a
              href="https://github.com/tesseract-ocr/tesstrain/wiki/GT4HistOCR#frak2021"
              target={"blank"}
            >
              frak2021
            </a>{" "}
            – najdokładniejszy model służący do rozpoznawania dawnej niemieckiej
            fraktury wypracowny w Bibliotece Uniwersytetu w Mannheim
          </li>
          <li>
            <a
              href="https://github.com/tesseract-ocr/tesstrain/wiki/GT4HistOCR#frak2021"
              target={"blank"}
            >
              Fraktur_5000000
            </a>{" "}
            – model służący do rozpoznawania dawnej niemieckiej fraktury
            wypracowny w Bibliotece Uniwersytetu w Mannheim
          </li>
          <li>
            <a
              href="https://github.com/tesseract-ocr/tesstrain/wiki/GT4HistOCR#frak2021"
              target={"blank"}
            >
              GT4HistOCR
            </a>{" "}
            – model służący do rozpoznawania dawnej niemieckiej fraktury oraz
            wczesnej łaciny wypracowny w Bibliotece Uniwersytetu w Mannheim
          </li>
          <li>
            <a
              href="https://is.muni.cz/th/422162/fi_b/?lang=en"
              target={"blank"}
            >
              ces_frak
            </a>{" "}
            – model służący do rozpoznawania czeskiej fraktury wypracowny w
            ramach pracy dyplomowej Martina Mejzlíka
          </li>
          <li>
            <a
              href="https://tesseract-ocr.github.io/tessdoc/tess3/Data-Files.html"
              target={"blank"}
            >
              frk
            </a>{" "}
            – podstawowy model służący do rozpoznawania dwudziestowiecznej
            niemieckiej fraktury
          </li>
          <li>
            <a
              href="https://tesseract-ocr.github.io/tessdoc/tess3/Data-Files.html"
              target={"blank"}
            >
              pol
            </a>{" "}
            – podstawowy model służący do rozpoznawania współczesnej polskiej
            antykwy, sprawdza się dobrze w rozpoznawaniu tekstów wydanych od
            połowy 18 wieku
          </li>
        </ol>
      </div>
    </div>
  );
}
