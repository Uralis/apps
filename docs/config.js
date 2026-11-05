/* ЕДИНАЯ КОНФИГУРАЦИЯ ДЛЯ ВСЕХ ПРИЛОЖЕНИЙ UralPro

   Название игры должно в точности совпадать с тем,
   что идёт в ссылке из Play Console: terms.html?app=Название Игры
   (пробелы браузер заменит на %20 сам). */

var APP_NAMES = {
  'uralpro.getword': {
    ru: '«Найди слово - 5 букв»',
    en: '"Find the word - 5 letters"'
  },
  'uralpro.hungrnubik3d': {
    ru: '«Голодный нубик 3D: Кушать!»',
    en: '"Hungry Noob 3D: Eat!"'
  },
  'uralpro.CountriesOfTheWorld': {
    ru: '«Страны мира по флагам»',
    en: '"Countries of the world"'
  },
  'uralpro.sudokulogicgame': {
    ru: '«Судоку - игра на логику»',
    en: '"Sudoku - logic game"'
  },
  'uralpro.magiccrossword': {
    ru: '«Магический кроссворд»',
    en: '"Magic Crossword"'
  },
  'uralpro.magiccrossword': {
    ru: '«Магический кроссворд»',
    en: '"Magic Crossword"'
  },
  'uralpro.createyourparkour': {
    ru: '«Обби: Создай паркур»',
    en: '"Obby: Create parkour"'
  },
  'uralpro.hungrygranny': {
    ru: '«Голодная бабка Гренни»',
    en: '"Hungry Granny"'
  },
  'uralpro.pixelassembly': {
    ru: '«Pixel Assembly: Рисование»',
    en: '"Pixel Assembly: Painting"'
  },
  'uralpro.hungrynubik': {
    ru: '«Голодный нубик: Кушать!»',
    en: '"Hungry Noob: Eat!"'
  },
  'uralpro.fillingblocks': {
    ru: '«Заполнение блоков»',
    en: '"Filling blocks"'
  },
  'uralpro.savinglizochka': {
    ru: '«Спасение Лизочки»',
    en: '"Saving Lizochka"'
  },
  'uralpro.NameCompatibility': {
    ru: '«Совместимость имен»',
    en: '"Name compatibility"'
  }




   

   
  /* добавляйте игры по образцу:
  'Вторая Игра': { ru: '«Вторая Игра»', en: '"Second Game"' }
  */
};

/* Базовый адрес политики конфиденциальности.
   Параметр ?app= подставляется автоматически,
   отдельные адреса для каждой игры не нужны. */
var PRIVACY_BASE = 'privacy.html';

/* Необязательно: своя политика для конкретной игры.
   Ключи — те же, что в APP_NAMES. Обычно оставляйте пустым. */
var PRIVACY_URLS = {};
