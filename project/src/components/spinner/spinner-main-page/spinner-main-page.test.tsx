import { render, screen } from '@testing-library/react';

import SpinnerMainPage from './spinner-main-page';

describe('Component: SpinnerMainPage', () => {
  test('renders SpinnerMainPage component', () => {
    render(<SpinnerMainPage />);

    expect(screen.queryByTestId('spinner')).toBeInTheDocument();
  });
});
