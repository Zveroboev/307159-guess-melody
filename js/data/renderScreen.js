const app = document.querySelector(`.app`);
let currentScreen = app.querySelector(`.main`);

const renderScreen = (newScreen) => {
  if (currentScreen === newScreen) {
    return;
  }

  app.replaceChild(newScreen, currentScreen);
  currentScreen = newScreen;
};

export default renderScreen;
