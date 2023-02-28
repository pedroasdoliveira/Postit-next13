export interface UserTypes {
  id: string;
  name: string;
  email: string;
  emailVerified?: any;
  image: string;
}

export interface PostType {
  id: string;
  title: string;
  published: boolean;
  user: UserTypes;
}

export interface DataPostType {
  id: string;
  title: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  user: UserTypes;
  userId: string;
}