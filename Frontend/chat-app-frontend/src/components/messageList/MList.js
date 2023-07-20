import {useState, useEffect} from 'react';
import Message from '../message/message.js';
import { io } from 'socket.io-client';
import './MList.scss';

// MList: This component is the message list, and renders the individual messages
const MList = ({messages})=>{
   
    const renderMessages = messages.map((messsage, index)=>{
        return <Message key={index} message={messsage}></Message>
    })

    return(
    <div className="messages">
        {renderMessages}
    </div>)

}

export default MList;

