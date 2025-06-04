export interface UserItem {
  id: number;
  name: string;
  user: string;
  email: string;
  role: string;
  permissions: string[];
  password: string;
  status: boolean;
}

export type UserCreate = Omit<UserItem, 'id' | 'status'>;
export type UserEdit = Pick<UserItem, 'id' | 'status'> & UserCreate;
