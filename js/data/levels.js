const AUDIOS = [
  {
    id: 1,
    artist: `Kevin MacLeod`,
    name: `Long Stroll`,
    image: `https://yt3.ggpht.com/-fkDeGauT7Co/AAAAAAAAAAI/AAAAAAAAAAA/dkF5ZKkrxRo/s900-c-k-no-mo-rj-c0xffffff/photo.jpg`,
    src: `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`,
    genre: `Jazz`
  },
  {
    id: 2,
    artist: `Jingle Punks`,
    name: `In the Land of Rhinoplasty`,
    image: `https://i.vimeocdn.com/portrait/992615_300x300`,
    src: `https://www.youtube.com/audiolibrary_download?vid=dc3b4dc549becd6b`,
    genre: `Rock`
  },
  {
    id: 3,
    artist: `Audionautix`,
    name: `Travel Light`,
    image: `http://4.bp.blogspot.com/-kft9qu5ET6U/VPFUBi9W-MI/AAAAAAAACYM/UxXilXKYwOc/s1600/audionautix%2BHalf%2BSize.jpg`,
    src: `https://www.youtube.com/audiolibrary_download?vid=a127d9b7de8a17cf`,
    genre: `Country`
  },
  {
    id: 4,
    artist: `Riot`,
    name: `Level Plane`,
    image: `https://i.ytimg.com/vi/jzgM3m8Vp1k/maxresdefault.jpg`,
    src: `https://www.youtube.com/audiolibrary_download?vid=dfb828f40096184c`,
    genre: `R&B`
  },
  {
    id: 5,
    artist: `Jingle Punks`,
    name: `Lucky Day`,
    image: `https://i.vimeocdn.com/portrait/992615_300x300`,
    src: `https://www.youtube.com/audiolibrary_download?vid=bcbe5be936a32fb1`,
    genre: `Pop`
  },
  {
    id: 6,
    artist: `Gunnar Olsen`,
    name: `Home Stretch`,
    image: `https://f4.bcbits.com/img/0004181452_10.jpg`,
    src: `https://www.youtube.com/audiolibrary_download?vid=bcbe5be936a32fb1`,
    genre: `Electronic`
  }
];

export default [
  {
    title: `Кто исполняет эту песню?`,
    type: `artist`,
    audio: AUDIOS[0],
    answers: [AUDIOS[0], AUDIOS[4], AUDIOS[2]]
  },
  {
    title: `Кто исполняет эту песню?`,
    type: `artist`,
    audio: AUDIOS[1],
    answers: [AUDIOS[5], AUDIOS[3], AUDIOS[1]]
  },
  {
    title: `Кто исполняет эту песню?`,
    type: `artist`,
    audio: AUDIOS[2],
    answers: [AUDIOS[4], AUDIOS[0], AUDIOS[2]]
  },
  {
    title: `Кто исполняет эту песню?`,
    type: `artist`,
    audio: AUDIOS[3],
    answers: [AUDIOS[3], AUDIOS[1], AUDIOS[2]]
  },
  {
    title: `Кто исполняет эту песню?`,
    type: `artist`,
    audio: AUDIOS[4],
    answers: [AUDIOS[4], AUDIOS[3], AUDIOS[5]]
  },
  {
    title: `Кто исполняет эту песню?`,
    type: `artist`,
    audio: AUDIOS[5],
    answers: [AUDIOS[0], AUDIOS[5], AUDIOS[2]]
  },
  {
    title: `Выберите инди-рок треки`,
    type: `genre`,
    audios: [
      {
        audio: AUDIOS[5],
        isTrue: false
      },
      {
        audio: AUDIOS[4],
        isTrue: false
      },
      {
        audio: AUDIOS[2],
        isTrue: false
      },
      {
        audio: AUDIOS[1],
        isTrue: true
      }
    ]
  },
  {
    title: `Выберите кантри треки`,
    type: `genre`,
    audios: [
      {
        audio: AUDIOS[5],
        isTrue: false
      },
      {
        audio: AUDIOS[4],
        isTrue: false
      },
      {
        audio: AUDIOS[2],
        isTrue: true
      },
      {
        audio: AUDIOS[1],
        isTrue: false
      }
    ]
  },
  {
    title: `Выберите треки жанра электроника`,
    type: `genre`,
    audios: [
      {
        audio: AUDIOS[5],
        isTrue: false
      },
      {
        audio: AUDIOS[4],
        isTrue: false
      },
      {
        audio: AUDIOS[2],
        isTrue: true
      },
      {
        audio: AUDIOS[1],
        isTrue: false
      }
    ]
  },
  {
    title: `Выберите поп треки`,
    type: `genre`,
    audios: [
      {
        audio: AUDIOS[5],
        isTrue: false
      },
      {
        audio: AUDIOS[4],
        isTrue: false
      },
      {
        audio: AUDIOS[2],
        isTrue: true
      },
      {
        audio: AUDIOS[1],
        isTrue: false
      }
    ]
  },
  {
    title: `Выберите инди-рок треки`,
    type: `genre`,
    audios: [
      {
        audio: AUDIOS[5],
        isTrue: false
      },
      {
        audio: AUDIOS[4],
        isTrue: false
      },
      {
        audio: AUDIOS[2],
        isTrue: true
      },
      {
        audio: AUDIOS[1],
        isTrue: false
      }
    ],
  }
];
