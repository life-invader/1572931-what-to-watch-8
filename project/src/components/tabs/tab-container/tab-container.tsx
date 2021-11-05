import { useState } from 'react';
import TabTitle from '../tab-title/tab-title';
import type { TabContainerType } from '../type';

function TabContainer({ children }: TabContainerType): JSX.Element {
  const [selectedTab, setSelectedTab] = useState<number>(0);

  return (
    <>
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          {children.map((tab: JSX.Element, index: number) => <TabTitle key={`index ${index + 1}`} index={index} title={tab.props.title} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />)}
        </ul>
      </nav>
      {children[selectedTab]}
    </>
  );
}

export default TabContainer;
