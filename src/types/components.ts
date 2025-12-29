/**
 * @fileoverview Типы для пропсов компонентов
 */

import { Resume } from './models';
import { ReactElement } from 'react';

export interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  github?: string;
  link?: string;
}

export interface SkillBadgeProps {
  skill: string | { name: string };
}

export interface ResumeButtonsProps {
  resume?: Resume;
}

export interface ContactMethod {
  platform: string;
  icon: ReactElement;
  url: string;
}
