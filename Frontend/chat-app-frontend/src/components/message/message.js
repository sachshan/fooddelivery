import moment from 'react-moment';
import './message.scss'

// Message Component: This is the individual message to be displayed in message list.
const Message = ({message})=>{    

    let isLocation = message.lUrl;
    
    if(isLocation)
    {
        return(
            <div className="messageTemp">
                <p>
                    <span className="mdate">{message.createdAt}</span> <span className="username">{message.username}</span>  
                     <span className="mtext"><a href={message.text} target="_blank">My current Location</a></span>    
                </p>
            </div>
        );
    }
    else
    {
        return(
            <div className="messageTemp">
                <p>
                    <span className="mdate">{message.createdAt}</span> <span className="username">{message.username}</span>  
                     <span className="mtext">{message.text}</span>           
                </p>
            </div>
        );
    }
    

}

export default Message;