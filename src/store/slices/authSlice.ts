/**
 * @fileoverview Redux slice для аутентификации
 */

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../utils/api';
import type { LoginCredentials, AuthResponse } from '../../types/models';
import type { AuthState } from '../../types/redux';

/**
 * Async thunk для входа в систему
 */
export const login = createAsyncThunk<AuthResponse, LoginCredentials, { rejectValue: string }>(
  'auth/login',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await api.post<AuthResponse>('/auth/login', { username, password });
      if (response.data.token) {
        localStorage.setItem('adminToken', response.data.token);
        return response.data;
      }
      return rejectWithValue('Токен не получен от сервера');
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || error.message || 'Ошибка входа'
      );
    }
  }
);

/**
 * Async thunk для выхода из системы
 */
export const logout = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('adminToken');
});

/**
 * Redux slice для аутентификации
 */
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('adminToken') || null,
    username: null,
    email: null,
    isAuthenticated: !!localStorage.getItem('adminToken'),
    loading: false,
    error: null,
  } as AuthState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.loading = false;
        state.token = action.payload.token;
        state.username = action.payload.username;
        state.email = action.payload.email;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Ошибка входа';
        state.isAuthenticated = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.token = null;
        state.username = null;
        state.email = null;
        state.isAuthenticated = false;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
