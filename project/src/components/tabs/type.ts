export type TabContainerType = {
  children: JSX.Element[],
}

export type TabTitleType = {
  title: string,
  selectedTab: number,
  setSelectedTab: (index: number) => void,
  index: number,
}
