import { render, screen } from '@testing-library/react';
import TabTitle from './tab-title';

const fakeIndex = 0;
const fakeTitle = 'Overview';
const fakeSelectedTab = 0;
const fakeSetSelectedTab = jest.fn();

describe('Component: TabTitle', () => {
  it('renders TabTitle component', () => {
    render(<TabTitle key={`index ${fakeIndex + 1}`} index={fakeIndex} title={fakeTitle} selectedTab={fakeSelectedTab} setSelectedTab={fakeSetSelectedTab} />);

    expect(screen.getByRole('link')).toBeInTheDocument();
  });
});
