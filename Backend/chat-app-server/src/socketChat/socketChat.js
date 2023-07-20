import { Server } from "socket.io";
import generateMessage from '../utils/message.js'
import locationMessage from '../utils/locationMessage.js';
import {addUser, removeUser, getUser, getUsersInRoom} from '../utils/users.js';

// socket.emit: message to only to the client
// socket.broadcast: to all clients in the current namespace except the sender
// io.emit : to everyone
// socket.broadcast.to

const socketChat = (server)=>{


    const io = new Server(server);

    io.on('connection', (socket)=>{
        console.log('New Web Socket Connection');
    
        
        // This socket on accepts the new user. Then emits a message back to the user to welcome.
        // In addition, the server broadcasts a message to all other user in the room to inform of the
        // new member
        socket.on('join', ({username, room}, callback)=>{
            
            const {error, user} = addUser({id: socket.id, username, room });
    
            if(error)
            {
                callback(error);
            }
            
            // This socket will only send messages belonging the room.
            console.log(room)
            socket.join(user.room);
    
            socket.emit('sMessage', generateMessage(`Welcome ${username}`));
            socket.broadcast.to(user.room).emit('sMessage', generateMessage(`${user.username} has joined`));
    
            callback();
    
        });
        
        // Listener for client message
        socket.on('newMessage', (message)=>{
            console.log(message);
            io.to(getUser(socket.id).room).emit('sMessage',generateMessage(getUser(socket.id).username, message));
            
        })
        
        // Listener for client position request
        socket.on('clientPosition', (position)=>{
            io.to(getUser(socket.id).room).emit('sLocation', locationMessage(getUser(socket.id).username, "http://google.com/maps?q="+position.latitude+ ","+position.longitude ));
        });
        
        // Listener for disconnecting user
        socket.on('disconnect', ()=>{
            const user = removeUser(socket.id);
    
            if(user)
            {
                io.to(user.room).emit('sMessage', `${user.username} has left`);
            }
            
        })
    })

}


export default socketChat;
