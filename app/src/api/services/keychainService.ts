import * as Keychain from 'react-native-keychain';

import { Tokens } from '../models/authModel';

export const saveTokens = async (tokens: Tokens) => {
  await Keychain.setGenericPassword('tokens', JSON.stringify(tokens));
};

export const getTokens = async () => {
  const result = await Keychain.getGenericPassword();

  if (result) {
    const tokens: Tokens = JSON.parse(result.password);
    return tokens;
  }

  return null;
};
