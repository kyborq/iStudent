import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TContact = {
  id: string;
  name: string;
  phone?: string;
  link?: string;
  mail?: string;
  color?: string;
};

interface IContactsSlice {
  contacts: TContact[];
}

const initialState: IContactsSlice = {
  contacts: [],
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact(state, action: PayloadAction<TContact>) {
      const contact: TContact = action.payload;
      state.contacts = [...state.contacts, contact];
    },
  },
});

export const { addContact } = contactsSlice.actions;

export default contactsSlice.reducer;
