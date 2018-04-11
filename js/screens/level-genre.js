import getElementFromTemplate from '../utils/getElementFromTemplate';
import renderScreen from "../utils/renderScreen";
import getRandomValue from '../utils/getRandomValue';
import initialState from '../data/initialState';

import getLivestemplate from './lives';
import getTimeTemplate from './time';
import winResult from './win';
import timeIsOver from './lose-time';
import attemptsEnded from './lose-lives';

// Игра на выбор жанра
const template = `
<section class="main main--level main--level-genre">
    
  ${getTimeTemplate(initialState)}
  
  ${getLivestemplate(initialState)}

  <div class="main-wrap">
    <h2 class="title">Выберите инди-рок треки</h2>
    <form class="genre">
      <div class="genre-answer">
        <div class="player-wrapper">
          <div class="player">
            <audio></audio>
            <button class="player-control player-control--pause"></button>
            <div class="player-track">
              <span class="player-status"></span>
            </div>
          </div>
        </div>
        <input type="checkbox" name="answer" value="answer-1" id="a-1">
        <label class="genre-answer-check" for="a-1"></label>
      </div>
      
      <div class="genre-answer">
        <div class="player-wrapper">
          <div class="player">
            <audio></audio>
            <button class="player-control player-control--play"></button>
            <div class="player-track">
              <span class="player-status"></span>
            </div>
          </div>
        </div>
        <input type="checkbox" name="answer" value="answer-1" id="a-2">
        <label class="genre-answer-check" for="a-2"></label>
      </div>
      
      <div class="genre-answer">
        <div class="player-wrapper">
          <div class="player">
            <audio></audio>
            <button class="player-control player-control--play"></button>
            <div class="player-track">
              <span class="player-status"></span>
            </div>
          </div>
        </div>
        <input type="checkbox" name="answer" value="answer-1" id="a-3">
        <label class="genre-answer-check" for="a-3"></label>
      </div>
      
      <div class="genre-answer">
        <div class="player-wrapper">
          <div class="player">
            <audio></audio>
            <button class="player-control player-control--play"></button>
            <div class="player-track">
              <span class="player-status"></span>
            </div>
          </div>
        </div>
        <input type="checkbox" name="answer" value="answer-1" id="a-4">
        <label class="genre-answer-check" for="a-4"></label>
      </div>
      
      <button class="genre-answer-send" type="submit">Ответить</button>
    </form>
  </div>
</section>
`;
const screen = getElementFromTemplate(template);
const answers = [...screen.querySelectorAll(`input[name="answer"]`)];
const answerBtn = screen.querySelector(`.genre-answer-send`);

const disableIfNotSelected = () => {
  const checkedAnswer = answers.find((answer) => answer.checked);

  if (checkedAnswer) {
    answerBtn.disabled = false;
    return;
  }

  answerBtn.disabled = true;
};

const renderRandomScreen = () => {
  const screens = [winResult, timeIsOver, attemptsEnded];
  const index = getRandomValue(0, 2);

  renderScreen(screens[index]);
};

disableIfNotSelected();
answers.forEach((answer) => answer.addEventListener(`change`, disableIfNotSelected));
answerBtn.addEventListener(`click`, renderRandomScreen);

export default screen;
