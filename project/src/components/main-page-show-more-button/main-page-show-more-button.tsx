import type { MainPageShowMoreButtonType } from './type';

function MainPageShowMoreButton({ showMoreButtonClickHandler }: MainPageShowMoreButtonType): JSX.Element {
  return (
    <div className="catalog__more">
      <button className="catalog__button" type="button" onClick={showMoreButtonClickHandler}>Show more</button>
    </div>
  );
}

export default MainPageShowMoreButton;
