import io from 'socket.io-client';
import { BASE_URL } from '../api';

const socket = io(`${BASE_URL}/codes`, {
  transports: ['websocket'],
});

export const initializeSocketConnection = (
  onConnected?: (id: string) => void,
  onMessage?: (message: any) => void,
  onError?: () => void,
) => {
  socket.on('connect', () => {
    onConnected && onConnected(socket.id);
  });

  socket.on('connect_error', err => {
    onError && onError();
  });

  socket.on('codeSaved', (message: any) => {
    onMessage && onMessage(message);
  });
};

export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
  }
};

export default socket;
