import { render, screen } from '@testing-library/react';
import DetailsTab from './details-tab';
import { createMockMovie } from '../../../mocks/movies-data';

const mockMovie = createMockMovie();

describe('Component: DetailsTab', () => {
  test('renders DetailsTab component', () => {
    render(<DetailsTab currentMovie={mockMovie} />);

    expect(screen.getByText(/Director/)).toBeInTheDocument();
    expect(screen.queryByTestId('director')).toHaveTextContent(mockMovie.director);
  });
});
