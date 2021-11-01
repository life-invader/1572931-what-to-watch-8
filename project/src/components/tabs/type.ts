import type { MoviesType, UserCommentType } from '../../types/movies';

export type TabContainerType = {
  children: JSX.Element[],
}

export type TabTitleType = {
  title: string,
  selectedTab: number,
  setSelectedTab: (index: number) => void,
  index: number,
}

export type OverviewTabType = {
  currentMovie: MoviesType,
  currentMovieComments: UserCommentType[]
}

export type DetailsTabType = {
  currentMovie: MoviesType,
}

export type ReviewsTabType = {
  currentMovieComments: UserCommentType[],
}

