/**
 * @fileoverview Redux slice для управления контактами
 */

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../utils/api';
import type { Contact, ContactFormData } from '../../types/models';
import type { ContactsState } from '../../types/redux';
import type { ContactsApiResponse } from '../../types/api';

export const fetchContacts = createAsyncThunk<Contact[], void, { rejectValue: string }>(
  'contacts/fetchContacts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<ContactsApiResponse>('/contacts');
      return response.data.contacts || [];
    } catch (error: any) {
      // Возвращаем дефолтные контакты при ошибке
      return [
        { _id: '1', platform: 'Email', url: 'mailto:kutmank9@gmail.com', icon: 'FaEnvelope', createdAt: new Date(), updatedAt: new Date(), order: 0 },
        { _id: '2', platform: 'LinkedIn', url: 'https://www.linkedin.com/in/kutmanbek-kubanychbek-uulu-623660303/', icon: 'FaLinkedin', createdAt: new Date(), updatedAt: new Date(), order: 1 },
        { _id: '3', platform: 'GitHub', url: 'https://github.com/Kutman02', icon: 'FaGithub', createdAt: new Date(), updatedAt: new Date(), order: 2 },
        { _id: '4', platform: 'Telegram', url: 'https://t.me/Kutmanbek_kg', icon: 'FaTelegram', createdAt: new Date(), updatedAt: new Date(), order: 3 },
      ];
    }
  }
);

export const createContact = createAsyncThunk<Contact, ContactFormData, { rejectValue: string }>(
  'contacts/createContact',
  async (contactData, { rejectWithValue }) => {
    try {
      const response = await api.post<Contact>('/contacts', contactData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || error.message || 'Ошибка создания контакта'
      );
    }
  }
);

export const updateContact = createAsyncThunk<
  Contact,
  { id: string; contactData: ContactFormData },
  { rejectValue: string }
>('contacts/updateContact', async ({ id, contactData }, { rejectWithValue }) => {
  try {
    const response = await api.put<Contact>(`/contacts/${id}`, contactData);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.error || error.message || 'Ошибка обновления контакта'
    );
  }
});

export const deleteContact = createAsyncThunk<string, string, { rejectValue: string }>(
  'contacts/deleteContact',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/contacts/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || error.message || 'Ошибка удаления контакта'
      );
    }
  }
);

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    loading: false,
    error: null,
  } as ContactsState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action: PayloadAction<Contact[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state) => {
        state.loading = false;
      })
      .addCase(createContact.fulfilled, (state, action: PayloadAction<Contact>) => {
        state.items.push(action.payload);
      })
      .addCase(updateContact.fulfilled, (state, action: PayloadAction<Contact>) => {
        const index = state.items.findIndex((c) => c._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteContact.fulfilled, (state, action: PayloadAction<string>) => {
        state.items = state.items.filter((c) => c._id !== action.payload);
      });
  },
});

export const { clearError } = contactsSlice.actions;
export default contactsSlice.reducer;
