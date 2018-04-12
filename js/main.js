import store from './data/store';
import getWelcomeScreen from './screens/welcome';
import renderScreen from "./utils/render-screen";

const state = store.getState();
const welcomeScreen = getWelcomeScreen(state);

renderScreen(welcomeScreen);
