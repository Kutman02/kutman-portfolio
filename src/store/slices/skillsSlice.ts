/**
 * @fileoverview Redux slice для управления навыками
 */

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../utils/api';
import type { Skill, SkillFormData } from '../../types/models';
import type { SkillsState } from '../../types/redux';
import type { SkillsApiResponse } from '../../types/api';

export const fetchSkills = createAsyncThunk<Skill[], void, { rejectValue: string }>(
  'skills/fetchSkills',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<SkillsApiResponse>('/skills');
      return response.data.skills || [];
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || error.message || 'Ошибка загрузки навыков'
      );
    }
  }
);

export const createSkill = createAsyncThunk<Skill, SkillFormData, { rejectValue: string }>(
  'skills/createSkill',
  async (skillData, { rejectWithValue }) => {
    try {
      const response = await api.post<Skill>('/skills', skillData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || error.message || 'Ошибка создания навыка'
      );
    }
  }
);

export const updateSkill = createAsyncThunk<
  Skill,
  { id: string; skillData: SkillFormData },
  { rejectValue: string }
>('skills/updateSkill', async ({ id, skillData }, { rejectWithValue }) => {
  try {
    const response = await api.put<Skill>(`/skills/${id}`, skillData);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.error || error.message || 'Ошибка обновления навыка'
    );
  }
});

export const deleteSkill = createAsyncThunk<string, string, { rejectValue: string }>(
  'skills/deleteSkill',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/skills/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || error.message || 'Ошибка удаления навыка'
      );
    }
  }
);

const skillsSlice = createSlice({
  name: 'skills',
  initialState: {
    items: [],
    loading: false,
    error: null,
  } as SkillsState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSkills.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSkills.fulfilled, (state, action: PayloadAction<Skill[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchSkills.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Ошибка загрузки навыков';
      })
      .addCase(createSkill.fulfilled, (state, action: PayloadAction<Skill>) => {
        state.items.push(action.payload);
      })
      .addCase(updateSkill.fulfilled, (state, action: PayloadAction<Skill>) => {
        const index = state.items.findIndex((s) => s._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteSkill.fulfilled, (state, action: PayloadAction<string>) => {
        state.items = state.items.filter((s) => s._id !== action.payload);
      });
  },
});

export const { clearError } = skillsSlice.actions;
export default skillsSlice.reducer;
