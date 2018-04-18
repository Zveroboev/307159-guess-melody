import LevelGenreView from './level-genre-view';
import countScored from "../../utils/count-scored";
import store from "../../data/store";

// Игра на выбор жанра
export default (state, level) => {
  const screen = new LevelGenreView(state, level);

  screen.onSubmit = (evt) => {
    evt.preventDefault();

    const checkedAnswersID = screen.answers
        .filter((answer) => answer.checked)
        .map((checkedAnswer) => parseInt(checkedAnswer.dataset.id, 10));

    const correctAnswersID = level.audios.filter((audio) => audio.isTrue).map((correctAudio) => correctAudio.audio.id);
    const isCorrect = checkedAnswersID.toString() === correctAnswersID.toString();
    const newState = countScored(state, isCorrect, false);

    store.setState(newState);
  };

  return screen.element;
};
