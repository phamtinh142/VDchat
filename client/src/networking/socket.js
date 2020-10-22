import io from 'socket.io-client';

import { URL_BASE } from './urls';
import { isAuthenticated } from './axios';
import getStore from '../redux/store';
import { connectSocket } from '../redux/actions';

let socket = null;

const onConnected = () => {
  console.log('------- socket: connected ------- onConnected');
  console.log('socket: connected');
  console.log('------- socket: connected ------- onConnected');
};

const onDisconnect = () => {
  console.log('------- socket: disconnect ------- onDisconnect');
  console.log('socket: disconnect');
  console.log('------- socket: disconnect ------- onDisconnect');
};

export const configSocket = () => {
  if (socket && socket.disconnected) {
    socket.connect();
  }

  if (socket) {
    return;
  }

  socket = io.connect(URL_BASE, {
    secure: true,
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    transports: ['websocket'],
    path: '/socket.io',
    query: `token=${isAuthenticated()}`,
  });

  socket.on('connect', onConnected);
  socket.on('disconnect', onDisconnect);
  getStore().dispatch(connectSocket());
};

export const socketDisconnect = () => {
  socket.disconnect();
};

export default function getSocket() {
  return socket;
}