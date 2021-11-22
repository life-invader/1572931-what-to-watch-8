import { render, screen } from '@testing-library/react';
import ReviewTab from './review-tab';
import { createMockComments } from '../../../mocks/movies-data';

const comments = createMockComments();

describe('Component: ReviewTab', () => {
  test('renders ReviewTab component', () => {
    render(<ReviewTab currentMovieComments={comments} />);

    expect(screen.queryAllByTestId('review')).toHaveLength(comments.length);
  });
});
