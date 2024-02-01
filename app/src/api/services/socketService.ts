import io from 'socket.io-client';
import {BASE_URL} from '../api';

export type SocketResponse = {
  codeId: string;
  message: string;
  status: string;
};

const socket = io(BASE_URL, {
  transports: ['websocket'],
});

export const initializeSocketConnection = (
  onConnected?: (id: string) => void,
  onMessage?: (message: SocketResponse) => void,
  onError?: () => void,
) => {
  socket.on('connect', () => {
    // console.log('Connected to WebSocket server');
    // console.log('My id is...', socket.id);
    onConnected && onConnected(socket.id);
  });

  socket.on('connect_error', err => {
    // console.log(`connect_error due to ${err.message}`);
    onError && onError();
  });

  socket.on('codeSaved', (message: SocketResponse) => {
    // console.log(message);
    onMessage && onMessage(message);
  });
};

export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
  }
};

export default socket;
