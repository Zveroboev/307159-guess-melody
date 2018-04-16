import renderNextScreen from './utils/render-next-screen';
import store from './data/store';

store.subscribe(() => console.log(`--- new State: `, store.getState()));
store.subscribe(renderNextScreen);

renderNextScreen();
