import renderScreen from '../../utils/render-screen';
import AbstractView from '../abstract-view.js';

export default class LoadScreen extends AbstractView {

  get template() {
    return `
      <section class="main main--preload">
        <section class="logo" title="Угадай мелодию"><h1>Загрузка данных!</h1></section>
        <h2 class="title">Данные загружаются...</h2>
        <div class="main__preloader">
          <svg xmlns="http://www.w3.org/2000/svg" width="150px" height="150px" viewBox="0 0 128 128" xml:space="preserve">
            <g transform="rotate(350.23 63.9999 63.9999)">
              <path d="M75.4 126.63a11.43 11.43 0 0 1-2.1-22.65 40.9 40.9 0 0 0 30.5-30.6 11.4 11.4 0 1 1 22.27 4.87h.02a63.77 63.77 0 0 1-47.8 48.05v-.02a11.38 11.38 0 0 1-2.93.37z" fill="#fe9748" fill-opacity="1"/>
              <animateTransform attributeName="transform" type="rotate" from="0 64 64" to="360 64 64" dur="600ms" repeatCount="indefinite"/>
            </g>
          </svg>
        </div>  
      </section>
    `;
  }

  init() {
    renderScreen(this.element);
  }
}
