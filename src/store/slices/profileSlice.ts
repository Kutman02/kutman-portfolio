/**
 * @fileoverview Redux slice для управления профилем
 */

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../utils/api';
import type { Profile, ProfileFormData } from '../../types/models';
import type { ProfileState } from '../../types/redux';

export const fetchProfile = createAsyncThunk<Profile, void, { rejectValue: string }>(
  'profile/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<Profile>('/profile');
      return response.data;
    } catch (error: any) {
      // Возвращаем дефолтные значения при ошибке
      return {
        _id: '',
        profilePhoto: 'https://keephere.ru/get/HNAULXgZxfX/o/photo.jpg',
        profilePhotoAlt: 'Profile photo',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    }
  }
);

export const updateProfile = createAsyncThunk<Profile, ProfileFormData, { rejectValue: string }>(
  'profile/updateProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await api.put<Profile>('/profile', profileData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || error.message || 'Ошибка обновления профиля'
      );
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    profilePhoto: 'https://keephere.ru/get/HNAULXgZxfX/o/photo.jpg',
    profilePhotoAlt: 'Profile photo',
    loading: false,
    error: null,
  } as ProfileState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProfile.fulfilled, (state, action: PayloadAction<Profile>) => {
        state.loading = false;
        state.profilePhoto = action.payload.profilePhoto || state.profilePhoto;
        state.profilePhotoAlt = action.payload.profilePhotoAlt || state.profilePhotoAlt;
      })
      .addCase(fetchProfile.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateProfile.fulfilled, (state, action: PayloadAction<Profile>) => {
        state.profilePhoto = action.payload.profilePhoto || state.profilePhoto;
        state.profilePhotoAlt = action.payload.profilePhotoAlt || state.profilePhotoAlt;
      });
  },
});

export const { clearError } = profileSlice.actions;
export default profileSlice.reducer;
