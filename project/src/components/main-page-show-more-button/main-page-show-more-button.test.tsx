import { render, screen } from '@testing-library/react';
import MainPageShowMoreButton from './main-page-show-more-button';

const showMoreButtonClickHandlerMock = jest.fn();

describe('Component: MainPageShowMoreButton', () => {
  it('renders MainPageShowMoreButton component', () => {
    render(<MainPageShowMoreButton showMoreButtonClickHandler={showMoreButtonClickHandlerMock} />);

    expect(screen.getByText('Show more')).toBeInTheDocument();
  });
});
