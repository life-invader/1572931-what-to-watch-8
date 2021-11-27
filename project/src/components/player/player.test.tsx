import { fireEvent, render, screen } from '@testing-library/react';
import { Router as BrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import browserHistory from '../../browser-history';
import Player from './player';
import { State } from '../../store/type';
import { createMockMovie } from '../../mocks/movies-data';
// import { AuthStatus } from '../../const';
import userEvent from '@testing-library/user-event';

const mockMovie = createMockMovie();
// const mockMovies = createMockMovies();
const fakeMovieDuration = 150;

const mockStore = configureMockStore<State>();
const store = mockStore({
  Data: {
    currentMovie: mockMovie,
  },
});

store.dispatch = jest.fn(); // Для useDispatch()

describe('Component: Player', () => {
  beforeAll(() => {
    window.HTMLMediaElement.prototype.play = jest.fn();
    window.HTMLMediaElement.prototype.pause = jest.fn();
    window.HTMLMediaElement.prototype.requestFullscreen = jest.fn();

    Object.defineProperty(window.HTMLMediaElement.prototype, 'duration', { value: fakeMovieDuration });
  });

  it('renders Player component', () => {
    render(
      <Provider store={store}>
        <BrowserRouter history={browserHistory}>
          <Player />
        </BrowserRouter>
      </Provider>);

    expect(screen.getByText('Full screen')).toBeInTheDocument();
  });

  it('should start playing video', () => {
    render(
      <Provider store={store}>
        <BrowserRouter history={browserHistory}>
          <Player />
        </BrowserRouter>
      </Provider>);

    fireEvent.loadedData(screen.getByTestId('video-player') as HTMLMediaElement);
    userEvent.click(screen.getByText('Play'));
    expect(window.HTMLMediaElement.prototype.play).toBeCalled();
  });

  it('should stop playing video', () => {
    render(
      <Provider store={store}>
        <BrowserRouter history={browserHistory}>
          <Player />
        </BrowserRouter>
      </Provider>);

    fireEvent.loadedData(screen.getByTestId('video-player') as HTMLMediaElement);
    userEvent.click(screen.getByText('Play'));
    userEvent.click(screen.getByText('Pause'));
    expect(window.HTMLMediaElement.prototype.pause).toBeCalled();
  });

  it('should enter fullscreen mode', () => {
    render(
      <Provider store={store}>
        <BrowserRouter history={browserHistory}>
          <Player />
        </BrowserRouter>
      </Provider>);

    fireEvent.loadedData(screen.getByTestId('video-player') as HTMLMediaElement);
    userEvent.click(screen.getByText('Full screen'));
    expect(window.HTMLMediaElement.prototype.requestFullscreen).toBeCalled();
  });
});
