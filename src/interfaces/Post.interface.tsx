export type Post = {
  id: number;
  title: string;
  content: string;
  author: {
    name: string;
    surname: string;
    nickname: string;
    email: string;
    password: string;
    role: string;
    avatar?: string;
  };
  type: string;
  direction: string;
  likes: number;
  isLikedByUser: boolean;
  previewImage?: string;
};
