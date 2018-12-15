export class UserModel {
  id: number;
  name: string;
  password?: string;
  email?: string;
  roles?: string[];
}

export const user: UserModel = {
  id: 343,
  name: 'piotr',
  email: 'aaa@aa.com',
}
