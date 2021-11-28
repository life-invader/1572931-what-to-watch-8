import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MainPageShowMoreButton from './main-page-show-more-button';

const showMoreButtonClickHandlerMock = jest.fn();

describe('Component: MainPageShowMoreButton', () => {
  it('renders MainPageShowMoreButton component', () => {
    render(<MainPageShowMoreButton showMoreButtonClickHandler={showMoreButtonClickHandlerMock} />);

    expect(screen.getByText('Show more')).toBeInTheDocument();
  });

  it('should handle click correctly and do not remove button', () => {
    render(<MainPageShowMoreButton showMoreButtonClickHandler={showMoreButtonClickHandlerMock} />);

    userEvent.click(screen.getByText('Show more'));
    expect(screen.getByText('Show more')).toBeInTheDocument();
    expect(showMoreButtonClickHandlerMock).toBeCalledTimes(1);
  });
});
