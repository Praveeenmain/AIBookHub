import {BsFillStarFill} from 'react-icons/bs'
import './index.css'
import {Link} from 'react-router-dom'

const BookItem=(props)=>{
     const{bookDetails}=props
     const{Authorname,Coverpic,rating,readStatus,title,id}=bookDetails
     return(
  <li className="Book-item-container">
         <Link className="Link-item"  to={`books/${id}`}>
            <div>
                <img src={Coverpic} alt="Book" className="book-image"/>
            </div>
            <div>
               <h1 className="book-title">{title}</h1>
               <p className="Author-name"> {Authorname}</p>
               <p> Avg Rating <span> <BsFillStarFill className='star-icon'/> </span> {rating}</p>
               <p> status:<span className='status'> {readStatus}</span></p>
            </div>
            </Link>
            
        </li> 
        
     )

}
export default BookItem