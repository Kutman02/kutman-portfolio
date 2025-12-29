/**
 * @fileoverview Redux Store конфигурация
 */

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import projectsReducer from './slices/projectsSlice';
import translationsReducer from './slices/translationsSlice';
import skillsReducer from './slices/skillsSlice';
import contactsReducer from './slices/contactsSlice';
import profileReducer from './slices/profileSlice';
import resumeReducer from './slices/resumeSlice';
import type { RootState } from '../types/redux';

/**
 * Redux Store
 */
export const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectsReducer,
    translations: translationsReducer,
    skills: skillsReducer,
    contacts: contactsReducer,
    profile: profileReducer,
    resume: resumeReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
