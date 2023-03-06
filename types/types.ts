export interface UserTypes {
  id: string;
  name: string;
  email: string;
  emailVerified?: any;
  image: string;
}

export interface CommentType {
  id: string;
  message: string;
  createdAt: string;
  postId: string;
  userId: string;
}

export interface PostType {
  id: string;
  title: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
  user: UserTypes;
  comment: CommentType;
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

export interface AuthPostsType {
  id: string;
  email: string;
  image: string;
  name: string;
  post: {
    id: string;
    title: string;
    createdAt: string;
    comment?: CommentType[];
  }[];
}
