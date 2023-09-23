import './index.css'
import {AiOutlineGoogle,AiOutlineInstagram,AiFillLinkedin} from 'react-icons/ai'
import {BiLogoTwitter} from 'react-icons/bi'
const Footer=()=>{
  return(
    <div className='footer'>
    <div className='icons-container'>
                  <AiOutlineGoogle className="icon"/>
                  <BiLogoTwitter className="icon"/>
                  <AiOutlineInstagram className="icon"/>
                  <AiFillLinkedin className="icon"/>
    </div>
   
    <a className='contact-us' href="https://linktr.ee/praveen4567" target="_blank" rel="noopener noreferrer">
             <button className='contact-us-button'>Contact Me</button> 
            </a>
    </div>
  )


}

export default Footer