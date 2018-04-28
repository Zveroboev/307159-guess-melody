import renderScreen from '../../utils/render-screen';
import ReplayView from '../replay-view.js';

export default class ErrorScreen extends ReplayView {
  constructor(onLoadReplay) {
    super();

    this.replayLoad = onLoadReplay;
  }

  get template() {
    return `
      <section class="main main--result">
        <section class="logo" title="Угадай мелодию"><h1>Ошибка!</h1></section>
        <h2 class="title">Данные не загружены</h2>
        <span class="main-comparison">Ой-ой-ой, кажется РКН добрался и до нас</span>
        <span role="button" tabindex="0" class="main-replay">Попытаться еще раз</span>
      </section>
    `;
  }

  init() {
    this.onReplayClick = this.replayLoad;

    renderScreen(this.element);
  }
}
