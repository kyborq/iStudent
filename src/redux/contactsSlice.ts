import { createSlice } from '@reduxjs/toolkit';

export type TContact = {
  id: string;
  name: string;
  phone?: string;
  link?: string;
  mail?: string;
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
  reducers: {},
});

export const {} = contactsSlice.actions;

export default contactsSlice.reducer;
