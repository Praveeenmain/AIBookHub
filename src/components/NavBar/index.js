
import {GiHamburgerMenu} from 'react-icons/gi'
import Cookies from 'js-cookie'
import {withRouter,Link} from 'react-router-dom'

import './index.css'
import { Component } from "react";
import Popup from 'reactjs-popup'

import 'reactjs-popup/dist/index.css'

class NavBar extends Component {
  
    render(){
        const {home,shufle} = this.props
        const onClickLogout = () => {
            Cookies.remove('jwt_token')
            const {history} = this.props
            history.replace('/login')
        }
   const activeHome = home ? 'Option-blue' : ''
   const activeShelves = shufle ? 'Option-blue' : ''
   
   
    return(
          <div>
                <div className="NavBarLargeContainer">
                <div className="Websitelogo">
                        
                    <img className="Websitelogoimg"  src="https://res.cloudinary.com/dgviahrbs/image/upload/v1694865968/Group_7731_uadmer.png" alt="website logo"/>
                </div>
                   <ul className="OptionContainer">
                            <Link className="link" to="/"> <li className={`Option ${activeHome}`}>Home</li> </Link>  
                            <Link className="link" to="/shelf"><li className={`Option ${activeShelves}`}>Bookshelves</li> </Link> 
                           
                    <button className="Logout" onClick={onClickLogout}>Logout</button>
                   
                    </ul>
                </div>
                
                 <div className='navbar-small'>
                       <div>
                        <img src="https://res.cloudinary.com/dgviahrbs/image/upload/v1695404264/Group_7732_josgka.png" alt="website logo"/>
                       </div>
                        <div>
                           
                        </div>
                        <div className="popup-container">
   <Popup
     modal
     trigger={
       <button type="button" className="Hamburger-button">
        <GiHamburgerMenu/>
       </button>
      
     }
  
   >
     {close => (
       <div className='pop-bar-sm-container'>
        
         
    <Link to="/" style={{ textDecoration: 'none' }}>     <li  onClick={() => close()} className='li'> Home</li>   </Link>  
     <Link  to="/shelf" style={{ textDecoration: 'none' }}>  <li  onClick={() => close()} className='li'>Bookshelves</li>   </Link>
         
         
         
         <button className="Logout" onClick={onClickLogout}>Logout</button>
         <button className='close-button' onClick={() => close()}> <img src="https://res.cloudinary.com/dgviahrbs/image/upload/v1695449789/Solid_kgyzsb.svg" alt="closeButton"/> </button>
         </div>
     )}
   </Popup>
 </div>
                 </div>
                

        
        </div>

    )
    }
}
export default withRouter(NavBar)