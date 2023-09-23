import { Component } from "react";
import NavBar from "../NavBar";
import './index.css'
import {Link} from 'react-router-dom'


class AiChatBot extends Component{
    
    render(){
        return(
            <>
            <NavBar/>
            <div className="chat">
                    <div>
                        <p className="ask-summary"> Type Book name for summary</p>
                    </div>
            
                    <div className="chat-bot-container">
                
                    
                    <iframe className="chat-bot-container-iframe"  title="AIchatbot" src="https://praveen312-book.hf.space"></iframe>
                
                    </div>
                <Link to="/"><button className="back-button"> Back</button> </Link>  
            </div>

            </>
      
        )
    }
}
export default AiChatBot