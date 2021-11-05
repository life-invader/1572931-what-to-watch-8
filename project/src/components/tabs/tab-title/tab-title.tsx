import React from 'react';
import type { TabTitleType } from '../type';

function TabTitle({ title, selectedTab, setSelectedTab, index }: TabTitleType): JSX.Element {
  const tabClickHandler = (evt: React.MouseEvent) => {
    evt.preventDefault();
    setSelectedTab(index);
  };

  return (
    <li className={`film-nav__item ${selectedTab === index ? 'film-nav__item--active' : ''}`}>
      <a href="#" className="film-nav__link" onClick={tabClickHandler}>{title}</a>
    </li>
  );
}

export default TabTitle;
