/**
 * @fileoverview Redux slice для управления переводами
 */

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../utils/api';
import type { Translation } from '../../types/models';
import type { TranslationsState } from '../../types/redux';
import type { TranslationsApiResponse, TranslationApiResponse } from '../../types/api';

export const fetchTranslations = createAsyncThunk<Translation[], void, { rejectValue: string }>(
  'translations/fetchTranslations',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<TranslationsApiResponse>('/translations');
      return response.data.translations || [];
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || error.message || 'Ошибка загрузки переводов'
      );
    }
  }
);

export const fetchTranslationByLang = createAsyncThunk<
  Translation,
  string,
  { rejectValue: string }
>('translations/fetchTranslationByLang', async (language, { rejectWithValue }) => {
  try {
    const response = await api.get<TranslationApiResponse>(`/translations/${language}`);
    return {
      _id: '',
      language: language as 'en' | 'ru',
      data: response.data.data || {},
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.error || error.message || 'Ошибка загрузки перевода'
    );
  }
});

export const updateTranslation = createAsyncThunk<
  Translation,
  { language: string; data: Record<string, any> },
  { rejectValue: string }
>('translations/updateTranslation', async ({ language, data }, { rejectWithValue }) => {
  try {
    const response = await api.put<TranslationApiResponse>(`/translations/${language}`, { data });
    return {
      _id: '',
      language: language as 'en' | 'ru',
      data: response.data.data || {},
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.error || error.message || 'Ошибка обновления перевода'
    );
  }
});

export const importTranslation = createAsyncThunk<Translation, string, { rejectValue: string }>(
  'translations/importTranslation',
  async (language, { rejectWithValue }) => {
    try {
      const response = await api.post<TranslationApiResponse>(`/translations/import`, {
        language,
      });
      return {
        _id: '',
        language: language as 'en' | 'ru',
        data: response.data.data || {},
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || error.message || 'Ошибка импорта перевода'
      );
    }
  }
);

const translationsSlice = createSlice({
  name: 'translations',
  initialState: {
    items: [],
    currentTranslation: null,
    loading: false,
    error: null,
  } as TranslationsState,
  reducers: {
    setCurrentTranslation: (state, action: PayloadAction<Translation | null>) => {
      state.currentTranslation = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTranslations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTranslations.fulfilled, (state, action: PayloadAction<Translation[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTranslations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Ошибка загрузки переводов';
      })
      .addCase(fetchTranslationByLang.fulfilled, (state, action: PayloadAction<Translation>) => {
        state.currentTranslation = action.payload;
      })
      .addCase(updateTranslation.fulfilled, (state, action: PayloadAction<Translation>) => {
        const index = state.items.findIndex(
          (t) => t.language === action.payload.language
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        if (state.currentTranslation?.language === action.payload.language) {
          state.currentTranslation = action.payload;
        }
      });
  },
});

export const { setCurrentTranslation, clearError } = translationsSlice.actions;
export default translationsSlice.reducer;
