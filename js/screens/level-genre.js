import getElementFromTemplate from '../utils/get-element-from-template';
import getLivesTemplate from './lives';
import getTimeTemplate from './time';

// Игра на выбор жанра
const getGenreLevelScreen = (state, level) => {
  const genreLevelTemplate = `
    <section class="main main--level main--level-genre">
        
      ${getTimeTemplate(state)}
      
      ${getLivesTemplate(state)}
    
      <div class="main-wrap">
        <h2 class="title">Выберите инди-рок треки</h2>
        <form class="genre">
          ${level.audios.map((it) => `
            <div class="genre-answer">
              <div class="player-wrapper">
                <div class="player">
                  <audio src="${it.src}" preload></audio>
                  <button class="player-control player-control--pause"></button>
                  <div class="player-track">
                    <span class="player-status"></span>
                  </div>
                </div>
              </div>
              <input type="checkbox" name="answer" value="${it.id}" id="${it.id}">
              <label class="genre-answer-check" for="${it.id}"></label>
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

  const disableIfNotSelected = () => {
    const checkedAnswer = answers.find((answer) => answer.checked);

    if (checkedAnswer) {
      answerBtn.disabled = false;
      return;
    }

    answerBtn.disabled = true;
  };

  const renderRandomScreen = () => {
    console.log('---', `click`);
  };

  disableIfNotSelected();
  answers.forEach((answer) => answer.addEventListener(`change`, disableIfNotSelected));
  answerBtn.addEventListener(`click`, renderRandomScreen);

  return genreLevelScreen;
};

export default getGenreLevelScreen;
