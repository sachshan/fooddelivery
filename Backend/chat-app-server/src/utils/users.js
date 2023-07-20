const users = []

// Add new user
export const addUser = ({id, username="Anonymous", room})=>{

    username = username.trim();
    room = room.trim().toLowerCase();  

    if(!username || !room)
    {
        return {
            error: 'Username and room are required!!'
        }
    }

    // Check for existing users
    const existingUser = users.find((user)=>{
        return user.room === room && user.username === username;
    })

    // Validate Username 
    if(existingUser)
    {
        return {
            error: 'Unique Username is required!!'
        } 
    }


    // Store Username 
    const user = {id, username, room};
    users.push(user);
    return {user};

}

// Remove user from users list
export const removeUser = (id)=>{

    const index = users.findIndex((user)=>{
        return user.id === id;
    })

    if(index !== -1)
    {
        return users.splice(index,1)[0];
    }

}

// Get User using ID
export const getUser = (id)=>{

    const index = users.findIndex((user)=>{
        return user.id === id;
    })

    if(index === -1)
    {
        return {error: 'User not found'};
    }

    return users[index];


}

// Get users in current room
export const getUsersInRoom = (room)=>{

    return users.filter((user)=>user.room ===room);

}



