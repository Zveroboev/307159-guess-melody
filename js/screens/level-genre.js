import getElementFromTemplate from '../utils/get-element-from-template';
import getLivesTemplate from './lives';
import getTimeTemplate from './time';
import countScored from "../utils/count-scored";
import store from "../data/store";

// Игра на выбор жанра
const getGenreLevelScreen = (state, level) => {
  const genreLevelTemplate = `
    <section class="main main--level main--level-genre">
      
      ${getTimeTemplate(state)}
      
      ${getLivesTemplate(state)}
    
      <div class="main-wrap">
        <h2 class="title">Выберите инди-рок треки</h2>
        <form class="genre">
          ${level.audios.map((audio) => `
            <div class="genre-answer">
              <div class="player-wrapper">
                <div class="player">
                  <audio src="${audio.src}" preload></audio>
                  <button class="player-control player-control--pause"></button>
                  <div class="player-track">
                    <span class="player-status"></span>
                  </div>
                </div>
              </div>
              <input type="checkbox" name="answer" value="${audio.id}" id="${audio.id}">
              <label class="genre-answer-check" for="${audio.id}"></label>
            </div>
          `).join(` `)}
        
          <button class="genre-answer-send" type="submit">Ответить</button>
        </form>
      </div>
    </section>
`;
  const genreLevelScreen = getElementFromTemplate(genreLevelTemplate);
  const answers = [...genreLevelScreen.querySelectorAll(`input[name="answer"]`)];
  const answerBtn = genreLevelScreen.querySelector(`.genre-answer-send`);
  const form = genreLevelScreen.querySelector(`.genre`);

  const disableIfNotSelected = () => {
    const checkedAnswer = answers.find((answer) => answer.checked);

    if (checkedAnswer) {
      answerBtn.disabled = false;
      return;
    }

    answerBtn.disabled = true;
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const checkedAnswersID = answers.filter((answer) => answer.checked).map((checkedAnswer) => checkedAnswer.id);
    const correctAnswersID = level.audios.filter((audio) => audio.isTrue).map((correctAudio) => correctAudio.id);
    const isCorrect = checkedAnswersID.toString() === correctAnswersID.toString();
    const newState = countScored(state, isCorrect, false);

    if (level.next) {
      newState.level = level.next.name;
      newState.type = level.next.type;
    }

    store.setState(newState);
  };


  disableIfNotSelected();
  answers.forEach((answer) => answer.addEventListener(`change`, disableIfNotSelected));
  form.addEventListener(`submit`, handleSubmit);

  return genreLevelScreen;
};

export default getGenreLevelScreen;
