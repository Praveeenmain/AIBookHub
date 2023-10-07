import {Component} from 'react'
import Cookies from 'js-cookie'
import NavBar from '../NavBar'
import {BsFillStarFill,BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import {TailSpin} from 'react-loader-spinner'

import CartContext from '../../context/CartContext'

import {Link} from 'react-router-dom'
import Footer from '../footer'

import './index.css'
const apiStatusConstants = {
    initial: 'INITIAL',
    success: 'SUCCESS',
    failure: 'FAILURE',
    inProgress: 'IN_PROGRESS',
   }

class Item extends Component{
    state={
       BookDetails:{},
       apistatus:apiStatusConstants.inProgress,
       quantity:1
    }
    componentDidMount(){
        this.bookDetails()
    }
    onClickRetry=()=>[
         this.bookDetails()
    ]
    bookDetails=async()=>{
        this.setState({
            apistatus:apiStatusConstants.inProgress
        })
        const{match}=this.props
        const{params}=match
        const {id}=params

        const jwtToken = Cookies.get('jwt_token')
        const apiUrl=`https://apis.ccbp.in/book-hub/books/${id}`
        const options = {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
            method: 'GET',
          }
        const response=await fetch(apiUrl,options)
        const fetchedData= await response.json()
        if(response.ok){
             const{book_details}=fetchedData
            
             const updatedData={
                Aboutauthor:book_details.about_author,
                AboutBook:book_details.about_book,
                Authorname:book_details.author_name,
                CoverPic:book_details.cover_pic,
                Id:book_details.id,
                Rating:book_details.rating,
                readStatus:book_details.read_status,
                title:book_details.title
             }
           
            this.setState({
               BookDetails:updatedData,
               apistatus:apiStatusConstants.success

            })
            
        }else{
            this.setState({
                apistatus:apiStatusConstants.failure
            })
        }

    }
    onDecrementQuantity = () => {
        const {quantity} = this.state
        if (quantity > 1) {
          this.setState(prevState => ({quantity: prevState.quantity - 1}))
        }
      }
    
      onIncrementQuantity = () => {
        this.setState(prevState => ({quantity: prevState.quantity + 1}))
      }
    renderSuccessView=()=>(
        <CartContext.Consumer>
      {
        value=>{
            const{BookDetails,quantity}=this.state
            
            const {addCartItem} = value
            const onClickAddToCart = () => {
               
                const itemToAdd = {
                  id: BookDetails.Id, 
                  title: BookDetails.title,
                  Authorname: BookDetails.Authorname,
                  CoverPic: BookDetails.CoverPic,
                  Rating: BookDetails.Rating,
                  quantity: quantity, 
                };
              
                
                addCartItem(itemToAdd);
              };
         return(
            <div>
            <div className='ItemcardContainer'>
                <div className='BookPicStatusContainer'>
                    <div>
                        <img className='BookPic' src={BookDetails.CoverPic} alt="cover-pic"/>
                    </div>
                    <div>
                        <h1 className='BookTitle'> {BookDetails.title}</h1>
                        <p className='AuthorName'>{BookDetails.Authorname}</p>
                        <div className='avg-rating-container'>
                            <h1 className='AverageRating'> Avg Rating</h1>
                            <BsFillStarFill className='star'/>
                            <p className='AvgRating'> {BookDetails.Rating}</p>
                            
                        </div>
                         <button className='add-cart-button' onClick={onClickAddToCart}> Add Cart</button>
                         <div className="quantity-container">
        <button
          type="button"
          className="quantity-controller-button"
          onClick={this.onDecrementQuantity}
          data-testid="minus"
        >
          <BsDashSquare className="quantity-controller-icon" />
        </button>
          <p>{quantity}</p>
        <button
          type="button"
          className="quantity-controller-button"
          onClick={this.onIncrementQuantity}
          data-testid="plus"
        >
          <BsPlusSquare className="quantity-controller-icon" />
        </button>
      </div>
                         <h1 className='amount'> Price:₹{(BookDetails.Rating *100)/2 }</h1>
                      
                         <div>
      
     
          </div>
    



                    </div>
                </div>
                <hr className='line'/>
                <div className='AboutAuthorContainer'>
                    <h1 className='AboutHeading'> About Author</h1>
                    <p className='AboutPara'> {BookDetails.Aboutauthor} </p>
                </div>
                < div className='AboutAuthorContainer'>
                    < h1 className='AboutHeading'> About Book </h1>
                    <p className='AboutPara'>{BookDetails.AboutBook} </p>
                    <Link to="/chatbot"> <button type="button" className=' summary glow-on-hover'> Ask Ai for more</button> </Link> 
                    
                </div>
                
                
            </div>
            <div>
            <Footer/>
            </div>
            </div>

         
        )
        }
      }
       
      
       
        </CartContext.Consumer>
       

    )
    renderFailure=()=>{
        return(
            <div className="failure-image-container">
               <img src="https://res.cloudinary.com/dgviahrbs/image/upload/v1694944653/Group_7522_ljmtgo.jpg" className="failure-image" alt="failure"/>
               <p className="failure-para"> Something went wrong, Please try again.</p>
               <button type="button" onClick={this.onClickRetry} className="retry-button"> Try Again</button>
            </div>
 
          )
    }
    renderLoader=()=>{
        return(
            <div className="Loader-Home-container" testid="loader">
              <TailSpin type="TailSpin" color="#0284C7" height={50} width={50} />
            </div>
            )
    }
    
    renderViews=()=>{
    const {apistatus}=this.state
   
    switch(apistatus){
     
        case apiStatusConstants.inProgress:
        return this.renderLoader()
        case apiStatusConstants.success:
        return this.renderSuccessView()
        case apiStatusConstants.failure:
        return this.renderFailure()
        default:
        return null

    }
    }

    render(){
        return(
            <>
             <NavBar/>
              <div>
                  {
                    this.renderViews()
                  }
            
                 
              </div>
             
            </>
        )
    }
   
}
export default Item