import getElementFromTemplate from '../utils/getElementFromTemplate';
import renderScreen from "../utils/renderScreen";
import genreSelection from './level-genre';
import initialState from '../data/initialState';
import levels from '../data/artistLevels';

import getLivestemplate from './lives';
import getTimeTemplate from './time';

// Игра на выбор исполнителя
const template = (state = initialState, level) => `
    <section class="main main--level main--level-artist">
      ${getTimeTemplate(state)}
      
      ${getLivestemplate(state)}
        
      <div class="main-wrap">
        <h2 class="title main-title">${level[state.currentLevel].title}</h2>
        <div class="player-wrapper">
          <div class="player">
            <audio src="${level[state.currentLevel].audio.src}" preload></audio>
            <button class="player-control player-control--pause"></button>
            <div class="player-track">
              <span class="player-status"></span>
            </div>
          </div>
        </div>
        <form class="main-list">
          ${level[state.currentLevel].answers.map((it) => `
            <div class="main-answer-wrapper">
            <input class="main-answer-r" type="radio" id="${it.id}" name="answer" value="${it.value}"/>
            <label class="main-answer" for="${it.id}">
              <img class="main-answer-preview" src="http://placehold.it/134x134"
                   alt="${it.name}" width="134" height="134">
              ${it.name}
            </label>
          </div>
          `)}
        </form>
      </div>
    </section>
`;
const screen = getElementFromTemplate(template(initialState, levels));
const answersBtn = [...screen.querySelectorAll(`.main-answer`)];
const audio = screen.querySelector(`.player audio`);
const playBtn = screen.querySelector(`.player-control`);

const handlePlayClick = () => {
  if (audio.paused) {
    audio.play();
    playBtn.classList.add(`player-control--pause`);
  } else {
    audio.pause();
    playBtn.classList.remove(`player-control--pause`);
  }
};

const handleAnswerClick = () => {
  renderScreen(genreSelection);
};

playBtn.classList.remove(`player-control--pause`);
playBtn.addEventListener(`click`, handlePlayClick);
answersBtn.forEach((btn) => btn.addEventListener(`click`, handleAnswerClick));

export default screen;
