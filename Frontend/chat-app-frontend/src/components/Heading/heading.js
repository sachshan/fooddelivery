import './heading.scss';
import {useNavigate} from 'react-router-dom';


// Heading Component: Contains the heading and go back to NUEats 
const Heading = ()=>{

    
const navigate = useNavigate();
    return (
    <div className='heading'>
        <h1>NU<span style={{color: 'black'}}>CHATS</span></h1>
        <button class="back" onClick={() => navigate(-1)}>Go back</button>
    </div>
    );
}

export default Heading;