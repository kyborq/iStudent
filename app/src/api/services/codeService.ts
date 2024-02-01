import {api} from '../api';
import {Buffer} from 'buffer';

export const getCode = async (client: string) => {
  try {
    const {data: image} = await api.get(`/code/${client}`, {
      responseType: 'arraybuffer',
    });

    const base64Image = Buffer.from(image, 'binary').toString('base64');
    const uri = `data:image/png;base64,${base64Image}`;

    return uri;
  } catch (e) {
    console.error(e);
  }
};
