import './mform.scss';
import { useState } from "react";

// MForm: This component contains the input form to accept the new message.
const MForm = (props)=>{

    const [message, setMessage] = useState([]);


    const handleSendMessage = (event)=>{
        
        event.preventDefault();
        if(message!=="")
        {
            props.sendMessage(message);
            setMessage("");
        }
        
        
    }

    const handleSendLocation = (event)=>{

        event.preventDefault();

        if(!navigator.geolocation)
        {
            console.log("Geolocation not supported");
        }

        navigator.geolocation.getCurrentPosition((position=>{

            const location = {latitude: position.coords.latitude, longitude: position.coords.longitude};
            
            props.sendLocation(location);
        }))

        
    }

    const updateMessage = (event)=>{

        setMessage(event.target.value);

    }



    return (
        <div className="cform">
            <form id="cForm">
                
                <input type="text" placeholder="Type new message" onChange={updateMessage} value={message}></input>
                <button className="fButton" type="submit" onClick={handleSendMessage} disabled={props.loadingM}>Send</button>
                <button className="fButton" id="send-location" onClick={handleSendLocation} disabled={props.loadingL}>Share Location</button>
            
            </form>
        </div>
    );
}

export default MForm;