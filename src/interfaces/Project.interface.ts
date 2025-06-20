export type Project = {
  id: string;
  idAuthor: string;
  title: string;
  description?: string;
  links: (string | null)[];
  previewImage?: string;
};
