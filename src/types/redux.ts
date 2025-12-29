/**
 * @fileoverview Типы для Redux Store и State
 */

import { Project, Skill, Contact, Translation } from './models';

export interface AuthState {
  token: string | null;
  username: string | null;
  email: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface ProjectsState {
  items: Project[];
  currentProject: Project | null;
  loading: boolean;
  error: string | null;
}

export interface SkillsState {
  items: Skill[];
  loading: boolean;
  error: string | null;
}

export interface ContactsState {
  items: Contact[];
  loading: boolean;
  error: string | null;
}

export interface ProfileState {
  profilePhoto: string;
  profilePhotoAlt: string;
  loading: boolean;
  error: string | null;
}

export interface ResumeState {
  file: string;
  fileUrl: string;
  externalLink: string;
  loading: boolean;
  error: string | null;
}

export interface TranslationsState {
  items: Translation[];
  currentTranslation: Translation | null;
  loading: boolean;
  error: string | null;
}

export interface RootState {
  auth: AuthState;
  projects: ProjectsState;
  skills: SkillsState;
  contacts: ContactsState;
  profile: ProfileState;
  resume: ResumeState;
  translations: TranslationsState;
}
