import { render, screen } from '@testing-library/react';
import OverviewTab from './overview-tab';
import { createMockMovie } from '../../../mocks/movies-data';

const mockMovie = createMockMovie();

describe('Component: OverviewTab', () => {
  test('renders OverviewTab component', () => {
    render(<OverviewTab currentMovie={mockMovie} />);

    expect(screen.getByText(/Director/)).toBeInTheDocument();
    expect(screen.queryByTestId('director')).toHaveTextContent(mockMovie.director);
  });
});
