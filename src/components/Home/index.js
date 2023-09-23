import {Component} from "react";
import NavBar from '../NavBar'

import Slider from 'react-slick'
import Cookies from "js-cookie";
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import TopBooks from '../TopBooks'
import {TailSpin} from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import Footer from '../footer'
import './index.css'
 

  const apiStatusConstants = {
    initial: 'INITIAL',
    success: 'SUCCESS',
    failure: 'FAILURE',
    inProgress: 'IN_PROGRESS',
   }
  
  
class Home extends Component{
    state={
        topRatingBooks:[],
        apiStatus:apiStatusConstants.inProgress,
        home:true
    }
    componentDidMount(){
        this.getRatedBooks()
    }
    onClickRetry=()=>{
      this.getRatedBooks()
    }
    getRatedBooks=async()=>{
        this.setState({apiStatus: apiStatusConstants.inProgress})
        const jwtToken = Cookies.get('jwt_token')
        const apiUrl='https://apis.ccbp.in/book-hub/top-rated-books'
        const options = {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
            method: 'GET',
          }
       const response= await fetch(apiUrl,options)
       if(response.ok){
        const fetchedData=await response.json()
       
        const updatedfetchedData=fetchedData.books.map(eachbook=>({
            authorName:eachbook.author_name,
            coverPic:eachbook.cover_pic,
            id:eachbook.id,
            title:eachbook.title

        }))
           
      
      
        this.setState({
            topRatingBooks:updatedfetchedData,
            apiStatus:apiStatusConstants.success
        })
      
       }else{

        this.setState({
            apiStatus: apiStatusConstants.failure,
          })
       }


    }
    renderfailure=()=>{
         return(
           <div className="failure-image-container-home">
              <img src="https://res.cloudinary.com/dgviahrbs/image/upload/v1695461215/Group_7522_1_owgevl.svg" className="failure-image-home" alt="failure"/>
              <p className="failure-para"> Something went wrong, Please try again.</p>
              <button type="button" onClick={this.onClickRetry} className="retry-button-home"> Try Again</button>
           </div>

         )
       

    }
    renderLoader=()=>{
      return(
          <div className="Loader-container" testid="loader">
            <TailSpin type="TailSpin" color="#0284C7" height={50} width={50} />
          </div>
          )
    }
    renderSuccess=()=>{
        const settings = {
        
          dots: false,
          infinite: true,
          autoplay: true,
          slidesToScroll: 2,
          slidesToShow: 3,
          
        
          responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 786,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              },
            },
          ],
           

      }
      const {topRatingBooks}=this.state
      return(
       <ul className="Carousel">
        <Slider {...settings}>
              
                {
                  topRatingBooks.map(eachbook=>(
                    <TopBooks bookdetails={eachbook} key={eachbook.id}/>
                  ))
                }
              
        </Slider>
        </ul>
      )
    }
    renderViews=()=>{
      const {apiStatus}=this.state
    
      switch(apiStatus){
        case apiStatusConstants.success:
          return this.renderSuccess()
        case apiStatusConstants.inProgress:
          return this.renderLoader()
          case apiStatusConstants.failure:
            return this.renderfailure()
        default:
          return null

      }
    


    }
    render(){
      const{home}=this.state
        return(
          <div>
          <NavBar home={home}/>
          <div className="PageContainer">
             <h1 className="PageHeading"> Find Your Next Favorite Books?</h1>
             <p className="PageParagraph">You are in the right place. Tell us what titles or genres you have enjoyed in the past, and we will give you surprisingly insightful recommendations.</p>
             <Link className="Link" to="/shelf">   <button className="find-books-small"> FindBooks</button> </Link> 
             <div className="Carousel">
               <div className="FindHeading">
                  <h1 className="RatedBooks"> Top Rated Books</h1>
                 <Link to="/shelf">  <button className="find-books-button">FindBooks</button> </Link>   
               </div>
               
                {
                    this.renderViews()
                }
             </div>
            
                 
          </div>
          <Footer/>
          </div>

        )
    }
}
export default Home