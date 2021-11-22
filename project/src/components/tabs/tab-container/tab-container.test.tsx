import { render, screen } from '@testing-library/react';
import TabContainer from './tab-container';
import { createMockComments, createMockMovie } from '../../../mocks/movies-data';
import ReviewTab from '../reviews-tab/review-tab';
import OverviewTab from '../overview-tab/overview-tab';
import DetailsTab from '../details-tab/details-tab';
import { Tabs } from '../../../const';

const mockComments = createMockComments();
const mockMovie = createMockMovie();

describe('Component: TabContainer', () => {
  test('renders TabContainer component', () => {
    render(
      <TabContainer>
        <OverviewTab title={Tabs.Overview} currentMovie={mockMovie} />
        <DetailsTab title={Tabs.Details} currentMovie={mockMovie} />
        <ReviewTab title={Tabs.Reviews} currentMovieComments={mockComments} />
      </TabContainer>);

    expect(screen.queryByTestId('overview-tab')).toBeInTheDocument();

    expect(screen.getByText(Tabs.Overview)).toBeInTheDocument();
    expect(screen.getByText(Tabs.Details)).toBeInTheDocument();
    expect(screen.getByText(Tabs.Reviews)).toBeInTheDocument();
  });
});
