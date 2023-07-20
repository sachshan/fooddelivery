import { io } from 'socket.io-client';



const URL = 'http://localhost:3001';
export const socket = io(URL+"/"+window.location.search,{ transports : ['websocket'] });
    

   

