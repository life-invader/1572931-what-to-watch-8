import VideoPlayer from './video-player';
import { render, screen } from '@testing-library/react';

const fakePreviewVideoLink = 'dmfuijfmdghib';
const fakePreviewImage = 'fmweofjwejifgw';

describe('Component: VideoPlayer', () => {
  it('renders VideoPlayer component', () => {
    Object.defineProperty(HTMLMediaElement.prototype, 'muted', {
      get: () => false,
      set: jest.fn(),
    });

    render(<VideoPlayer previewVideoLink={fakePreviewVideoLink} previewImage={fakePreviewImage} />);

    expect(screen.getByTestId('video-player')).toBeInTheDocument();
  });
});
