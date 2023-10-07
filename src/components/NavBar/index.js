
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
                        
                    <img className="Websitelogoimg"  src="https://res.cloudinary.com/dgviahrbs/image/upload/v1695566650/gpt-bookshelf-low-resolution-logo-black-on-transparent-background_f5zfuu.png" alt="website logo"/>
                </div>
                   <ul className="OptionContainer">
                            <Link className="link" to="/"> <li className={`Option ${activeHome}`}>Home</li> </Link>  
                            <Link className="link" to="/shelf"><li className={`Option ${activeShelves}`}>Bookshelves</li> </Link> 
                            <Link className="link" to="/cart" > <li className={`Option`}> Cart </li></Link>       
                   
                    <Popup
                 
                    modal
                    trigger={
                      <button className="Logout" >Logout</button>
                    }
                  >
                    {(close) => (
                      <div>
                        <div>
                          <p>Are you sure, you want to logout</p>
                        </div>
                        <button
                          type="button"
                          className="trigger-button"
                          onClick={() => close()}
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={onClickLogout}
                          className='Logout-pop-button'
                        >
                          Confirm
                        </button>
                      </div>
                    )}
                  </Popup>
                   
                   
                    </ul>
                </div>
                
                 <div className='navbar-small'>
                       <div>
                        <img className='website-logo-sm' src="https://res.cloudinary.com/dgviahrbs/image/upload/v1695566650/gpt-bookshelf-low-resolution-logo-black-on-transparent-background_f5zfuu.png" alt="website logo"/>
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
     <Link  to="/cart" style={{ textDecoration: 'none' }}>  <li  onClick={() => close()} className='li'>Cart</li>   </Link>
         
         <br/>
         
      

                <Popup
                 
                 modal
                 trigger={
                   <button className="Logout" >Logout</button>
                 }
               >
                 {(close) => (
                   <div>
                     <div>
                       <p>Are you sure, you want to logout</p>
                     </div>
                     <button
                       type="button"
                       className="trigger-button"
                       onClick={() => close()}
                     >
                       Cancel
                     </button>
                     <button
                       type="button"
                       onClick={onClickLogout}
                       className='Logout-pop-button'
                     >
                       Confirm
                     </button>
                   </div>
                 )}
               </Popup>


















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