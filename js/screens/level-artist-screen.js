import LevelArtistView from './views/level-artist-view';
import countScored from '../utils/count-scored';
import store from '../data/store';

// Игра на выбор исполнителя
export default (state, level) => {
  const screen = new LevelArtistView(state, level);

  screen.onPlayClick = () => {
    if (screen.audio.paused) {
      screen.audio.play();
      screen.playBtn.classList.add(`player-control--pause`);
    } else {
      screen.audio.pause();
      screen.playBtn.classList.remove(`player-control--pause`);
    }
  };

  screen.onAnswerSelected = (evt) => {
    const answerID = parseInt(evt.currentTarget.dataset.id, 10);
    const correctAnswerID = level.answers.find((answer) => answer.isTrue).id;
    const isCorrect = answerID === correctAnswerID;
    const newState = countScored(state, isCorrect, false);

    if (level.next) {
      newState.level = level.next.name;
      newState.type = level.next.type;
    }

    store.setState(newState);
  };

  return screen.element;
};
