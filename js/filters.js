import { sortElements, removeElements } from './utility.js';
import { createElements } from './picture-list.js';

const PICTURES_COUNT = 10;
const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const filters = document.querySelector('.img-filters');
const pictureList = document.querySelector('.pictures');

const sortRandomly = () => Math.random() - 0.5;

const sortByCommentsData = (itemA, itemB) => itemB.getAttribute('data-comments-number') - itemA.getAttribute('data-comments-number');

const sortByComments = (itemA, itemB) => itemB.comments.length - itemA.comments.length;

const sortById = (itemA, itemB) => itemA.getAttribute('data-id') - itemB.getAttribute('data-id');

const setActiveButton = () => {
  const active = filters.querySelector('.img-filters__button--active');
  active.classList.remove('img-filters__button--active');
  filters.querySelector(`.img-filters__button${location.hash}`).classList.add('img-filters__button--active');
};


/**
 * функция сортировки изображений
 * @param {Array} data - массив из которого берутся данные для сортировки.
 * @param {Function} inputFunction - функция отрисовки изображений.
 * @param {HTMLElement} element - элемент, в котором находятся изображения.
 */
const sortPictures = (data) => {
  const pictures = document.querySelectorAll('.picture');
  const picturesArray = Array.from(pictures);
  if (location.hash === `#${Filter.RANDOM}`) {
    picturesArray.sort(sortRandomly);
    sortElements(pictureList, picturesArray);
    removeElements(pictures, PICTURES_COUNT);
  }
  if (location.hash === `#${Filter.DISCUSSED}`) {
    picturesArray.sort(sortByCommentsData);
    if (pictures.length > PICTURES_COUNT) {
      return sortElements(pictureList, picturesArray);
    }
    const sortedData = [...data].sort(sortByComments);
    createElements(sortedData, pictureList);
  }
  if (location.hash === `#${Filter.DEFAULT}`) {
    picturesArray.sort(sortById);
    if (pictures.length > PICTURES_COUNT) {
      return sortElements(pictureList, picturesArray);
    }
    createElements(data, pictureList);
  }
};

/**
 * функция, устанавливающая обработчик событий для сортировки.
 * @param {Array} data - массив из которого берутся данные для сортировки.
 * @param {Function} inputFunction - функция отрисовки изображений.
 * @param {HTMLElement} element - элемент, в котором находятся изображения.
 */
const onFilterClick = (data, callback) => {
  filters.addEventListener('click', (evt) => {
    if (!evt.target.classList.contains('img-filters__button')) {
      return;
    }
    const target = evt.target;
    if (`#${target.id}` === location.hash || (target.id === Filter.DEFAULT && location.hash === '')) {
      return;
    }
    const active = filters.querySelector('.img-filters__button--active');
    target.classList.add('img-filters__button--active');
    active.classList.remove('img-filters__button--active');
    location.hash = target.id;
    callback(data);
  });
};

/**
 * функция, инициализирующая фильтры на странице.
 * @param {Array} data - массив из которого берутся данные для сортировки.
 * @param {Function} inputFunction - функция отрисовки изображений.
 * @param {HTMLElement} element - элемент, в котором находятся изображения.
 */
const setFilters = (data, callback) => {
  filters.classList.remove('img-filters--inactive');
  onFilterClick(data, callback);
};

export { setFilters, sortPictures, setActiveButton };
