const KEY_CODES = {
  arrowLeft: 37,
  arrowRight: 39
};
const FIRST_SCREEN_INDEX = 0;

const app = document.querySelector(`.app`);
const template = document.querySelector(`#templates`);
const screens = [...template.content.querySelectorAll(`.main`)];
let currentScreenIndex = FIRST_SCREEN_INDEX;

const showScreen = (index) => {
  if (typeof index !== `number` || index >= screens.length || index < 0) {
    return;
  }

  const currentScreen = app.querySelector(`.main`);
  const newScreen = screens[index];

  if (currentScreen === newScreen) {
    return;
  }

  currentScreen.parentElement.replaceChild(newScreen, currentScreen);
  currentScreenIndex = index;
};

const showNextScreen = () => {
  if (currentScreenIndex >= screens.length - 1) {
    return;
  }

  showScreen(++currentScreenIndex);
};

const showPrevScreen = () => {
  if (currentScreenIndex <= 0) {
    return;
  }

  showScreen(--currentScreenIndex);
};

const handleScreenChange = (evt) => {
  if (!evt.altKey) {
    return;
  }

  if (evt.keyCode === KEY_CODES.arrowRight) {
    showNextScreen();
  } else if (evt.keyCode === KEY_CODES.arrowLeft) {
    showPrevScreen();
  }
};

showScreen(FIRST_SCREEN_INDEX);

// Вешаю на keyup т.к. на keydown событие будет срабатывать постоянно пока я держу нажатой клавишу Alt
document.addEventListener(`keyup`, handleScreenChange);
