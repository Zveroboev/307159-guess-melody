const app = document.querySelector(`.app`);
let currentScreen = app.querySelector(`.main`);

export default (newScreen) => {
  if (currentScreen === newScreen) {
    return;
  }

  app.replaceChild(newScreen, currentScreen);
  currentScreen = newScreen;
};
