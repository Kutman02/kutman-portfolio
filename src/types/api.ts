/**
 * @fileoverview Типы для API запросов и ответов
 */

import { Project, Skill, Contact, Translation } from './models';

export interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, any>;
}

export interface ErrorResponse {
  error: string;
  message?: string;
  statusCode?: number;
}

export interface UploadResponse {
  url: string;
  fullUrl?: string;
  filename: string;
  size: number;
}

export interface ProjectsApiResponse {
  projects: Project[];
}

export interface SkillsApiResponse {
  skills: Skill[];
}

export interface ContactsApiResponse {
  contacts: Contact[];
}

export interface TranslationsApiResponse {
  translations: Translation[];
}

export interface TranslationApiResponse {
  language: string;
  data: Record<string, any>;
}
