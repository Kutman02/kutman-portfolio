/**
 * @fileoverview Redux slice для управления проектами
 */

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../utils/api';
import type { Project, ProjectFormData } from '../../types/models';
import type { ProjectsState } from '../../types/redux';
import type { ProjectsApiResponse } from '../../types/api';

/**
 * Async thunk для загрузки всех проектов
 */
export const fetchProjects = createAsyncThunk<Project[], void, { rejectValue: string }>(
  'projects/fetchProjects',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<ProjectsApiResponse>('/projects');
      return response.data.projects || [];
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || error.message || 'Ошибка загрузки проектов'
      );
    }
  }
);

/**
 * Async thunk для загрузки проекта по ID
 */
export const fetchProjectById = createAsyncThunk<Project, string, { rejectValue: string }>(
  'projects/fetchProjectById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get<Project>(`/projects/${id}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || error.message || 'Ошибка загрузки проекта'
      );
    }
  }
);

/**
 * Async thunk для создания проекта
 */
export const createProject = createAsyncThunk<Project, ProjectFormData, { rejectValue: string }>(
  'projects/createProject',
  async (projectData, { rejectWithValue }) => {
    try {
      const response = await api.post<Project>('/projects', projectData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || error.message || 'Ошибка создания проекта'
      );
    }
  }
);

/**
 * Async thunk для обновления проекта
 */
export const updateProject = createAsyncThunk<
  Project,
  { id: string; projectData: ProjectFormData },
  { rejectValue: string }
>('projects/updateProject', async ({ id, projectData }, { rejectWithValue }) => {
  try {
    const response = await api.put<Project>(`/projects/${id}`, projectData);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.error || error.message || 'Ошибка обновления проекта'
    );
  }
});

/**
 * Async thunk для удаления проекта
 */
export const deleteProject = createAsyncThunk<string, string, { rejectValue: string }>(
  'projects/deleteProject',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/projects/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || error.message || 'Ошибка удаления проекта'
      );
    }
  }
);

/**
 * Redux slice для проектов
 */
const projectsSlice = createSlice({
  name: 'projects',
  initialState: {
    items: [],
    currentProject: null,
    loading: false,
    error: null,
  } as ProjectsState,
  reducers: {
    clearCurrentProject: (state) => {
      state.currentProject = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch projects
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action: PayloadAction<Project[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Ошибка загрузки проектов';
      })
      // Fetch project by ID
      .addCase(fetchProjectById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjectById.fulfilled, (state, action: PayloadAction<Project>) => {
        state.loading = false;
        state.currentProject = action.payload;
      })
      .addCase(fetchProjectById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Ошибка загрузки проекта';
      })
      // Create project
      .addCase(createProject.fulfilled, (state, action: PayloadAction<Project>) => {
        state.items.push(action.payload);
      })
      // Update project
      .addCase(updateProject.fulfilled, (state, action: PayloadAction<Project>) => {
        const index = state.items.findIndex((p) => p._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        if (state.currentProject?._id === action.payload._id) {
          state.currentProject = action.payload;
        }
      })
      // Delete project
      .addCase(deleteProject.fulfilled, (state, action: PayloadAction<string>) => {
        state.items = state.items.filter((p) => p._id !== action.payload);
        if (state.currentProject?._id === action.payload) {
          state.currentProject = null;
        }
      });
  },
});

export const { clearCurrentProject, clearError } = projectsSlice.actions;
export default projectsSlice.reducer;
