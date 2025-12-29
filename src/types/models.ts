/**
 * @fileoverview Типы для моделей данных (соответствуют MongoDB схемам)
 */

export interface BaseModel {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Project extends BaseModel {
  title: string;
  description: string;
  technologies: string[];
  image: string;
  images: string[];
  youtubeVideo: string;
  github: string;
  demo: string;
  features: string[];
}

export interface ProjectFormData {
  title: string;
  description: string;
  technologies: string;
  image: string;
  images: string[];
  youtubeVideo: string;
  github: string;
  demo: string;
  features: string;
}

export interface Skill extends BaseModel {
  category: string;
  title: string;
  items: string[];
  order: number;
}

export interface SkillFormData {
  category: string;
  title: string;
  items: string;
  order: number;
}

export interface Contact extends BaseModel {
  platform: string;
  url: string;
  icon: string;
  order: number;
}

export interface ContactFormData {
  platform: string;
  url: string;
  icon: string;
  order: number;
}

export interface Profile extends BaseModel {
  profilePhoto: string;
  profilePhotoAlt: string;
}

export interface ProfileFormData {
  profilePhoto: string;
  profilePhotoAlt: string;
}

export interface Resume extends BaseModel {
  file: string;
  fileUrl: string;
  externalLink: string;
}

export interface ResumeFormData {
  file: string;
  fileUrl: string;
  externalLink: string;
}

export interface Translation extends BaseModel {
  language: 'en' | 'ru';
  data: Record<string, any>;
}

export interface Admin extends BaseModel {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  username: string;
  email: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}
