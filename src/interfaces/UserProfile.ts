import { Project } from "./Project.interface";

export type UserProfile = {
  id: string;
  firstName: string;
  lastName: string;
  nickname: string;
  role: string;
  description?: string;
  workplace?: string;
  portfolio: Project[];
};
