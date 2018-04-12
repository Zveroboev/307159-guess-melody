import getElementFromTemplate from '../utils/get-element-from-template';
import countScored from '../utils/count-scored';
import getLivesTemplate from './lives';
import getTimeTemplate from './time';
import store from '../data/store';

// Игра на выбор исполнителя
const getArtistLevelScreen = (state, level) => {
  const artistLevelTemplate = `
    <section class="main main--level main--level-artist">
      ${getTimeTemplate(state)}
      
      ${getLivesTemplate(state)}
        
      <div class="main-wrap">
        <h2 class="title main-title">${level.title}</h2>
        <div class="player-wrapper">
          <div class="player">
            <audio src="${level.audio.src}" preload></audio>
            <button class="player-control player-control--pause"></button>
            <div class="player-track">
              <span class="player-status"></span>
            </div>
          </div>
        </div>
        <form class="main-list">
          ${level.answers.map((it) => `
            <div class="main-answer-wrapper">
              <input class="main-answer-r" type="radio" id="${it.id}" name="answer" value="${it.value}"/>
              <label class="main-answer" for="${it.id}" data-id="${it.id}">
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
  const artistLevelScreen = getElementFromTemplate(artistLevelTemplate);
  const answersBtn = [...artistLevelScreen.querySelectorAll(`.main-answer`)];
  const audio = artistLevelScreen.querySelector(`.player audio`);
  const playBtn = artistLevelScreen.querySelector(`.player-control`);

  const handlePlayClick = () => {
    if (audio.paused) {
      audio.play();
      playBtn.classList.add(`player-control--pause`);
    } else {
      audio.pause();
      playBtn.classList.remove(`player-control--pause`);
    }
  };

  const handleAnswerClick = (evt) => {
    const answerID = evt.currentTarget.dataset.id;
    const correctAnswerID = level.answers.find((answer) => answer.isTrue).id;
    const isCorrect = answerID === correctAnswerID;
    const newState = countScored(state, isCorrect, false);

    newState.level = level.next.name;
    newState.type = level.next.type;
    store.setState(newState);
  };

  playBtn.classList.remove(`player-control--pause`);
  playBtn.addEventListener(`click`, handlePlayClick);
  answersBtn.forEach((btn) => btn.addEventListener(`click`, handleAnswerClick));

  return artistLevelScreen;
};

export default getArtistLevelScreen;
