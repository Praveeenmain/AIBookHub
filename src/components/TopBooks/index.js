
import './index.css'
import {Link} from 'react-router-dom'

const TopBooks =(props)=>{
      const{bookdetails}=props
      const{authorName,coverPic,title,id}=bookdetails
      return(
       <Link className="Link" to={`books/${id}`}>    
        <li className='BookItemContainer'>
           <img className='inw' src={coverPic} alt="cover pic"/>
           <h1 className='BookName'> {title}</h1>
           < p className='BookContent'> {authorName}</p>

        </li>
        </Link>   
      )


}
export default TopBooks