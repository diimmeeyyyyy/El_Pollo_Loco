let canvas;
let world;
let keyboard = new Keyboard();

let fullscreenIsActivated = false;

function showFullscreen() {
  let fullscreen = document.getElementById("Start_Screen");
  if (!fullscreenIsActivated) {
    enterFullscreen(fullscreen);
    fullscreenIsActivated = true;
  } else {
    exitFullscreen();
    fullscreenIsActivated = false;
  }
}

function enterFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.msRequestFullscreen) {
    // for IE11 (remove June 15, 2022)
    element.msRequestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    // iOS Safari
    element.webkitRequestFullscreen();
  }
}

function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

function startGame() {
  removeStartGameButton();
  centerKeyboardCommandDiv();
  addMobileButtons();
  canvas = document.getElementById("Canvas");
  initLevel();
  world = new World(canvas, keyboard);
  keyboard.bindButtonPressEvents();
  document.querySelector(".game-over-screen").classList.add("d-none");
}

function addMobileButtons() {
  if (window.innerWidth <= 800) {
    document.getElementById("Mobile_Movement_Left").style.display = "flex";
    document.getElementById("Mobile_Movement_Right").style.display = "flex";
  }
}

function removeStartGameButton() {
  document.getElementById("Start_Game_Button").style.display = "none";
  document.getElementById("Policy_Btn").style.display = "none";
}

function centerKeyboardCommandDiv() {
  document.getElementById("Keyboard_Command_Div").style.left = "50%";
  document.getElementById("Keyboard_Command_Div").style.transform =
    "translateX(-50%)";
}

function showKeyboardCommands() {
  let popUpBackground = document.createElement("div");
  popUpBackground.classList.add("pop-up-backdrop");
  popUpBackground.innerHTML = generateKeyboardCommandsHTML();

  document.body.appendChild(popUpBackground);
  document
    .getElementById("Close_Keyboard_Commands")
    .addEventListener("click", function () {
      document.body.removeChild(popUpBackground);
    });
}

function generateKeyboardCommandsHTML() {
  return /*html*/ `
<div class="keyboard-instructions">
  <img id="Close_Keyboard_Commands" src="./img/closePopUp.png" />

  <main class="arrange-keyboard-commands-content">
    <div class="keyboard-instructions-popUp-headline">
      <h2>Keyboard Instructions:</h2>
    </div>

    <section class="arrange-keyboard-instruction-section">
      <div class="keyboard-command-div">
        <p>Move Left:</p>
        <p>Move Right:</p>
        <p>Jump:</p>
        <p>Throw Bottle:</p>
      </div>

      <div class="keyboard-img-div">
        <img src="./img/moveLeft.png" />
        <img src="./img/moveRight.png" />
        <img src="./img/jump.png" />
        <img src="./img/throwBottle.png" />
      </div>
    </section>
  </main>
</div>
  `;
}

function showPolicy() {
  document.getElementById("Canvas").style.display = "none";
  document.getElementById("Start_Game_Button").style.display = "none";
  let policyElement = document.getElementById("Policy");
  policyElement.style.display = "flex";
  policyElement.innerHTML = /*html*/ `
    <img src="./img/closePopUp.png" class="closePolicy" onclick="closePolicy()">
    <div class='impressum'>
      <h1>Impressum</h1><p>Angaben gemäß § 5 TMG</p><p>Dimitrios Kapetanis <br>
      Teichstraße 24<br>
      33615 Bielefeld <br>
      </p><p> <strong>Vertreten durch: </strong><br>
      Dimitrios Kapetanis<br>
      </p><p><strong>Kontakt:</strong> <br>
      Telefon: 02301-912994<br>
      E-Mail: <a href='mailto:dimitrioskapetanis0110@gmail.com'>dimitrioskapetanis0110@gmail.com</a></br></p><p><strong>Haftungsausschluss: </strong><br><br><strong>Haftung für Inhalte</strong><br><br>
      Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.<br><br><strong>Haftung für Links</strong><br><br>
      Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.<br><br><strong>Urheberrecht</strong><br><br>
      Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.<br><br><strong>Datenschutz</strong><br><br>
      Die Nutzung unserer Webseite ist in der Regel ohne Angabe personenbezogener Daten möglich. Soweit auf unseren Seiten personenbezogene Daten (beispielsweise Name, Anschrift oder eMail-Adressen) erhoben werden, erfolgt dies, soweit möglich, stets auf freiwilliger Basis. Diese Daten werden ohne Ihre ausdrückliche Zustimmung nicht an Dritte weitergegeben. <br>
      Wir weisen darauf hin, dass die Datenübertragung im Internet (z.B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich. <br>
      Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten durch Dritte zur Übersendung von nicht ausdrücklich angeforderter Werbung und Informationsmaterialien wird hiermit ausdrücklich widersprochen. Die Betreiber der Seiten behalten sich ausdrücklich rechtliche Schritte im Falle der unverlangten Zusendung von Werbeinformationen, etwa durch Spam-Mails, vor.<br>
      </p><br>
      Website Impressum von <a href="https://www.impressum-generator.de">impressum-generator.de</a>
    </div>
    `;
}

function closePolicy() {
  document.getElementById("Policy").style.display = "none";
  document.getElementById("Canvas").style.display = "flex";
  document.getElementById("Start_Game_Button").style.display = "flex";
}
