export type Project = {
  id: string;
  title: string;
  description?: string;
  links: (string | null)[];
  previewImage?: string;
};
