import {io} from 'socket.io-client';
import {REACT_APP_DEV_API_URL} from '@env';

const socket = io(REACT_APP_DEV_API_URL);
export default socket;
