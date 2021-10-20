/* eslint-disable no-console */
/* eslint-disable quotes */

export const setGenre = (evt: any): any => {
  evt.preventDefault();
  return { type: 'change-genre', payload: evt.target.dataset.genre };
};

export const setDefaultGenre = (evt: any): any => {
  evt.preventDefault();
  return { type: 'all-genres', payload: evt.target.dataset.genre };
};
