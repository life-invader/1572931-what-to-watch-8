import { useDispatch } from 'react-redux';
import { changeFavouriteKeyStatus } from '../../store/api-action';
import { AddToMyListButtonType } from './type';

enum isFavouriteStatus {
  isFavourite = 1,
  notFavourite = 0,
}

const notInListButton = (
  <svg viewBox="0 0 19 20" width="19" height="20">
    <use xlinkHref="#add"></use>
  </svg>
);

const inListButton = (
  <svg viewBox="0 0 18 14" width="18" height="14">
    <use xlinkHref="#in-list"></use>
  </svg>
);

function AddToMyListButton({ movie }: AddToMyListButtonType): JSX.Element {
  const dispatch = useDispatch();

  const { 'is_favorite': isFavourite, id } = movie;
  const status = isFavourite ? isFavouriteStatus.notFavourite : isFavouriteStatus.isFavourite;

  const changeStatus = () => {
    dispatch(changeFavouriteKeyStatus(id, status));
  };

  return (
    <button className="btn btn--list film-card__button" data-testid='favourite-button' type="button" onClick={changeStatus}>
      {!isFavourite ? notInListButton : inListButton}
      <span>My list</span>
    </button>
  );
}

export default AddToMyListButton;
