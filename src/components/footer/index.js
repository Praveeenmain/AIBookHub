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
    <p className='contact-us'>Contact us</p>
    </div>
  )


}

export default Footer