import { Project } from "../../interfaces/Project.interface";

export type UserProfile = {
  id: string;
  avatar?: string;
  firstName: string;
  lastName: string;
  nickname: string;
  role: string;
  description?: string;
  workplace?: string;
  portfolio: Project[];
};
