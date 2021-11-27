import VideoPlayer from './video-player';
import { render, screen } from '@testing-library/react';

const fakePreviewVideoLink = 'https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm';
const fakePreviewImage = 'https://8.react.pages.academy/static/film/preview/bohemian_rhapsody.jpg';

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
