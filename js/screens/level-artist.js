import getElementFromTemplate from '../utils/getElementFromTemplate';
import renderScreen from "../utils/renderScreen";
import genreSelection from './level-genre';
import header from './header';

// Игра на выбор исполнителя
const template = `
<section class="main main--level main--level-artist">
    ${header}
    
    <div class="main-wrap">
      <h2 class="title main-title">Кто исполняет эту песню?</h2>
      <div class="player-wrapper">
        <div class="player">
          <audio></audio>
          <button class="player-control player-control--pause"></button>
          <div class="player-track">
            <span class="player-status"></span>
          </div>
        </div>
      </div>
      <form class="main-list">
        <div class="main-answer-wrapper">
          <input class="main-answer-r" type="radio" id="answer-1" name="answer" value="val-1"/>
          <label class="main-answer" for="answer-1">
            <img class="main-answer-preview" src="http://placehold.it/134x134"
                 alt="Пелагея" width="134" height="134">
            Пелагея
          </label>
        </div>

        <div class="main-answer-wrapper">
          <input class="main-answer-r" type="radio" id="answer-2" name="answer" value="val-2"/>
          <label class="main-answer" for="answer-2">
            <img class="main-answer-preview" src="http://placehold.it/134x134"
                 alt="Краснознаменная дивизия имени моей бабушки" width="134" height="134">
            Краснознаменная дивизия имени моей бабушки
          </label>
        </div>

        <div class="main-answer-wrapper">
          <input class="main-answer-r" type="radio" id="answer-3" name="answer" value="val-3"/>
          <label class="main-answer" for="answer-3">
            <img class="main-answer-preview" src="http://placehold.it/134x134"
                 alt="Lorde" width="134" height="134">
            Lorde
          </label>
        </div>
      </form>
    </div>
  </section>
`;
const screen = getElementFromTemplate(template);
const answersBtn = [...screen.querySelectorAll(`.main-answer`)];

answersBtn.forEach((btn) => btn.addEventListener(`click`, () => renderScreen(genreSelection)));

export default screen;