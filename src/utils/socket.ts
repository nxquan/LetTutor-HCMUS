import {io, Socket} from 'socket.io-client';
import Config from 'react-native-config';

const apiUrl = Config.REACT_APP_API_URL || 'https://sandbox.api.lettutor.com'; // Ensure apiUrl is defined and has a value
const socket: Socket = io(apiUrl);
export default socket;
