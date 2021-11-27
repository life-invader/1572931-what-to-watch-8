import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import AddToMyListButton from './add-to-my-list-button';
import { createMockMovie } from '../../mocks/movies-data';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../../store/type';
import userEvent from '@testing-library/user-event';

const mockMovie = createMockMovie();

const mockStore = configureMockStore<State>();
const store = mockStore({});
store.dispatch = jest.fn();

describe('Component: AddToMyListButton', () => {
  it('renders AddToMyListButton component', () => {
    render(
      <Provider store={store}>
        <AddToMyListButton movie={mockMovie} />
      </Provider>);

    expect(screen.getByText('My list')).toBeInTheDocument();
  });

  it('should add or remove movie from favourites', () => {
    render(
      <Provider store={store}>
        <AddToMyListButton movie={mockMovie} />
      </Provider>);

    userEvent.click(screen.getByTestId('favourite-button'));
    expect(store.dispatch).toBeCalledTimes(1);
  });
});
