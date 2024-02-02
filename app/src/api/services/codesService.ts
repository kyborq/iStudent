import { api } from '../api';
import { QrCode } from '../models/qrCodeModel';

export const getQrCode = async (client: string) => {
  try {
    const { data: image } = await api.get<QrCode>(`/codes/${client}`);
    return image;
  } catch (e) {
    console.error(e);
  }
};

export const saveQrCode = async (client: string) => {
  try {
    await api.post(`/codes/${client}`);
  } catch (e) {
    console.error(e);
  }
};
