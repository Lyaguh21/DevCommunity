export type Post = {
  id: string;
  title: string;
  content: string;
  author: string;
  type: string;
  direction: string;
  likes: number;
  isLikedByUser: boolean;
  previewImage?: string;
};
