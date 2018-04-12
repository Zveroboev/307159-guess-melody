import getElementFromTemplate from '../utils/get-element-from-template';
import renderScreen from '../utils/render-screen';
import countScored from '../utils/count-scored';
// import genreSelection from './level-genre';
import getLivesTemplate from './lives';
import getTimeTemplate from './time';
import store from '../data/store';

// Игра на выбор исполнителя
const getArtistLevelScreen = (state, levels) => {
  const currentLevel = levels[state.currentLevel];

  const artistLevelScreen = `
    <section class="main main--level main--level-artist">
      ${getTimeTemplate(state)}
      
      ${getLivesTemplate(state)}
        
      <div class="main-wrap">
        <h2 class="title main-title">${currentLevel.title}</h2>
        <div class="player-wrapper">
          <div class="player">
            <audio src="${currentLevel.audio.src}" preload></audio>
            <button class="player-control player-control--pause"></button>
            <div class="player-track">
              <span class="player-status"></span>
            </div>
          </div>
        </div>
        <form class="main-list">
          ${currentLevel.answers.map((it) => `
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
  const screen = getElementFromTemplate(artistLevelScreen);
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

  const handleAnswerClick = (evt) => {
    const answerID = evt.currentTarget.dataset.id;
    const correctAnswerID = levels[state.currentLevel].answers.find((answer) => answer.isTrue).id;
    const isCorrect = answerID === correctAnswerID;
    const newLevel = currentLevel.next;
    const diffState = countScored(state, isCorrect, false);

    diffState.currentLevel = newLevel;
    store.setState(diffState);

    const newState = store.getState();

    if (newState.gameStatus === `playing`) {
      const nextScreen = getArtistLevelScreen(newState, levels);

      renderScreen(nextScreen);
    } else if (newState.gameStatus === `lose`) {
      const nextScreen = getArtistLevelScreen(newState, levels);

      renderScreen(nextScreen);
    }


  };

  playBtn.classList.remove(`player-control--pause`);
  playBtn.addEventListener(`click`, handlePlayClick);
  answersBtn.forEach((btn) => btn.addEventListener(`click`, handleAnswerClick));

  return screen;
};

export default getArtistLevelScreen;
