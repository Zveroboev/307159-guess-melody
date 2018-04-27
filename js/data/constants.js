import levels from "./levels";

export const ALL_LEVELS = Object.keys(levels).length;
export const FAST_ANSWER_TIME = 30; // 30 sec
export const INITIAL_TIME = 300; // 5 min
export const FAIL_SCORE = 2;
export const MAX_LIVES = 3;
export const URL = `https://es.dump.academy/guess-melody/questions`;

export const Genre = {
  COUNTRY: `country`,
  BLUES: `blues`,
  FOLK: `folk`,
  CLASSICAL: `classical`,
  ELECTRONIC: `electronic`,
  HIP_HOP: `hip-hop`,
  JAZZ: `jazz`,
  POP: `pop`,
  ROCK: `rock`
};

export const QuestionType = {
  GENRE: `genre`,
  ARTIST: `artist`
};

export const GameStatus = {
  PLAYING: `playing`,
  WIN: `win`,
  LOSE: `lose`,
  WELCOME: `welcome`
};
