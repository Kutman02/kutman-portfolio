/**
 * @fileoverview Redux slice для управления резюме
 */

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../utils/api';
import type { Resume, ResumeFormData } from '../../types/models';
import type { ResumeState } from '../../types/redux';

export const fetchResume = createAsyncThunk<Resume, void, { rejectValue: string }>(
  'resume/fetchResume',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<Resume>('/resume');
      return response.data;
    } catch (error: any) {
      return {
        _id: '',
        file: '',
        fileUrl: '',
        externalLink: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    }
  }
);

export const updateResume = createAsyncThunk<Resume, ResumeFormData, { rejectValue: string }>(
  'resume/updateResume',
  async (resumeData, { rejectWithValue }) => {
    try {
      const response = await api.put<Resume>('/resume', resumeData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || error.message || 'Ошибка обновления резюме'
      );
    }
  }
);

const resumeSlice = createSlice({
  name: 'resume',
  initialState: {
    file: '',
    fileUrl: '',
    externalLink: '',
    loading: false,
    error: null,
  } as ResumeState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchResume.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchResume.fulfilled, (state, action: PayloadAction<Resume>) => {
        state.loading = false;
        state.file = action.payload.file || '';
        state.fileUrl = action.payload.fileUrl || '';
        state.externalLink = action.payload.externalLink || '';
      })
      .addCase(fetchResume.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateResume.fulfilled, (state, action: PayloadAction<Resume>) => {
        state.file = action.payload.file || state.file;
        state.fileUrl = action.payload.fileUrl || state.fileUrl;
        state.externalLink = action.payload.externalLink || state.externalLink;
      });
  },
});

export const { clearError } = resumeSlice.actions;
export default resumeSlice.reducer;
