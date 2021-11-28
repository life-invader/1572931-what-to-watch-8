import {
  datatype,
  name,
  image,
  internet,
  lorem,
  date
} from 'faker';
import {
  MoviesType,
  UserCommentType
} from '../types/movies';

export const mockGenre = datatype.string();

export const createMockMovie = (): MoviesType => {
  const actorsAmount = datatype.number({
    min: 1,
    max: 5,
  });

  const actors = new Array(actorsAmount).fill(null).map(() => `${name.firstName()} ${name.lastName()}`);

  return {
    'id': datatype.number(),
    'name': lorem.words(),
    'poster_image': image.imageUrl(),
    'preview_image': image.imageUrl(),
    'background_image': image.imageUrl(),
    'background_color': internet.color(),
    'video_link': internet.url(),
    'preview_video_link': internet.url(),
    'description': lorem.paragraph(),
    'rating': datatype.number(),
    'scores_count': datatype.number(),
    'director': `${name.firstName()} ${name.lastName()}`,
    'starring': actors,
    'run_time': datatype.number(),
    'genre': lorem.word(),
    'released': datatype.number(),
    'is_favorite': datatype.boolean(),
  };
};

export const createMockMovies = (): MoviesType[] => {
  const moviesMock = new Array(25).fill(null).map(() => createMockMovie());
  return moviesMock;
};

const createMockComment = (): UserCommentType => ({
  'id': datatype.number(),
  'rating': datatype.number(),
  'comment': lorem.sentences(),
  'date': date.recent(),
  'user': {
    'id': datatype.number(),
    'name': `${name.firstName()} ${name.lastName()}`,
  },
});

export const createMockComments = (): UserCommentType[] => {
  const commentsAmount = datatype.number({
    min: 1,
    max: 5,
  });

  const comments = new Array(commentsAmount).fill(null).map(() => createMockComment());

  return comments;
};
