import renderNextScreen from './utils/render-next-screen';
import store from './data/store';

store.subscribe(renderNextScreen);

renderNextScreen();
