import { render, screen } from '@testing-library/react';

import SpinnerPlayer from './spinner-player';

describe('Component: SpinnerPlayer', () => {
  test('renders SpinnerPlayer component', () => {
    render(<SpinnerPlayer />);

    expect(screen.queryByTestId('loader')).toBeInTheDocument();
  });
});
