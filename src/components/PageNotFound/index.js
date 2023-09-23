import { Component } from "react";
import "./index.css"
import { Link } from "react-router-dom"
class NotFound extends Component{

    
    render(){
       
        
        return(
          <div className="not-page-container">
            <img src="https://res.cloudinary.com/dgviahrbs/image/upload/v1695195321/Group_7484_tdje4t.jpg" alt="not-found" className="small-not-logo"/>
             <h1 className="page-heading"> Page Not Found</h1>
             <p className="page-paragraph"> we are sorry, the page you requested could not be found,Please go back to the homepage.</p>
           <Link to="/"> <button  className="gobackbutton" > Go Back Button</button> </Link>   
          </div>
        )
    }
}
export default NotFound