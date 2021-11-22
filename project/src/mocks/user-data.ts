import { datatype, name, image, internet } from 'faker';
import { UserInfo } from '../store/type';

export const createMockUserinfo = (): UserInfo => ({
  id: datatype.number(),
  email: internet.email(),
  name: `${name.firstName()} ${name.lastName()}`,
  'avatar_url': image.imageUrl(),
  token: datatype.string(),
});
