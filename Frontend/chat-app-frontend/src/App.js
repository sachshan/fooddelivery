import './App.scss';
import MList from './components/messageList/MList';
import Heading from './components/Heading/heading.js'
import MForm from './components/MForm/mform.js';
import { useEffect, useState } from 'react';
import { socket } from './socket';
import queryString from 'query-string';

function App() {

    
  const [messages, setMessages] = useState([]);
  const [loadingM, setLoadingM] = useState(false);
  const [loadingL, setLoadingL] = useState(false);

  // This hook is run when for the first time to establish connection to the server
  useEffect(()=>{
    const parsed = queryString.parse(window.location.search);
  

    socket.emit('join', {username:parsed.username, room:parsed.room}, (error)=>{
      if(error)
      {
          alert(error);
      }
  
    });

    console.log("Sent request to Join"); 

  },[]);

  // This hook contains the listeners
  useEffect(()=>{

    socket.on('sMessage', (message)=>{
      
      message.lUrl = false;
      setLoadingM(false);
      console.log("Recieving Message: " +loadingM)
      setMessages([...messages, message]);      
    })

    socket.on('sLocation', (url)=>{

      url.lUrl = true;
      setLoadingL(false);
      console.log("Recieving Message: " +loadingL)
      setMessages([...messages, url]);      
  })

  })

  // Send message emitter
  const sendMessage = (value)=>{

    setLoadingM(true);
    socket.emit('newMessage', value );
    console.log("Sending Message: "+loadingM);
    
    
  }

  // Send Location Emitter
  const sendLocation = (value)=>{

    setLoadingL(true);
    socket.emit('clientPosition', value );
    console.log("Sending Location: "+loadingL);
    
  }


  return (
    <div className='content'>
      <Heading></Heading>
        <div className="chatBody">
        <MList messages={messages}></MList>
        <MForm  sendMessage={sendMessage} sendLocation={sendLocation} loadingM={loadingM} loadingL={loadingL}></MForm>
      </div>
    </div>
  );
}

export default App;
