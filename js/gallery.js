import { openPhoto } from './picture-modal.js';
import { createElements } from './picture-list.js';
import { showAlert, debounce } from './utility.js';
import { getData } from './api.js';
import { setFilters, sortPictures } from './filters.js';

/**
 * функция отображения крупного изображения при нажатии на миниатюру.
 * @param {Array} pictures - массив с данными для фотографии.
 */
const renderPhoto = (evt, pictures) => {
  const element = evt.target.closest('.picture');
  if (!element) {
    return;
  }
  const picture = pictures.find((item) => item.id === Number(element.dataset.id));
  openPhoto(picture);
};

/**
 * функция создания миниатюр.
 * @param {Array} data - массив с данными фотографий.
 * @param {HTMLElement} element - html элемент, в который будут добавлены миниатюры.
 */
const createGallery = (data, element) => {
  createElements(data, element);
  element.addEventListener('click', (evt) => {
    renderPhoto(evt, data);
  });
};

/**
 * функция отображения миниатюр на странице.
 * @param {HTMLElement} element - html элемент, в который будут добавлены миниатюры.
 */
const renderGallery = async (element) => {
  try {
    const data = await getData();
    createGallery(data, element);
    setFilters(data, debounce(sortPictures));
  } catch (err) {
    showAlert(err.message);
  }
};

export { renderGallery };
