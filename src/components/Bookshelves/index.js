import NavBar from '../NavBar'

import {Component} from 'react'

import {BiSearch} from 'react-icons/bi'
import Cookies from 'js-cookie'
import BookItem from '../BookItem'
import {TailSpin} from 'react-loader-spinner'
import './index.css'
import Footer from '../footer'
const apiStatusConstants = {
    initial: 'INITIAL',
    success: 'SUCCESS',
    failure: 'FAILURE',
    inProgress: 'IN_PROGRESS',
  }
const bookshelvesList = [
    {
      id: '22526c8e-680e-4419-a041-b05cc239ece4',
      value: 'ALL',
      label: 'All',
    },
    {
      id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
      value: 'READ',
      label: 'Read',
    },
    {
      id: '2ab42512-3d05-4fba-8191-5122175b154e',
      value: 'CURRENTLY_READING',
      label: 'Currently Reading',
    },
    {
      id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
      value: 'WANT_TO_READ',
      label: 'Want to Read',
    },
]
class Bookshelves extends Component{
    state={
         activeFilter: bookshelvesList[0].value,
         bookname:'',
         apiStatus: apiStatusConstants.initial,
         activeFilterLabel: bookshelvesList[0].label,
         BookDetails:[],
         shufle:true
       
    }
    componentDidMount(){
        this.getCatergoryBooks()
    }
    onChangeSearch=(event)=>{
        this.setState({
            bookname:event.target.value
        })
    }
    onKey = event => {
        if (event.key.toLowerCase() === 'enter') {
          this.getCatergoryBooks()
        }
    }
    onSearchBooks = () => {
        this.setState(
          prevState => ({search: prevState.searchInput}),
          this.getBooksApiData,
        )
    }
    onClickRetry=()=>{
      this.getCatergoryBooks()
    }
    
    getCatergoryBooks=async()=>{
        this.setState({
            apiStatus:apiStatusConstants.inProgress
        })
       const jwtToken = Cookies.get('jwt_token')
       const{bookname,activeFilter}=this.state
        
      
       const apiUrl = `https://apis.ccbp.in/book-hub/books?shelf=${activeFilter}&search=${bookname}`
       const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        method: 'GET',
      }
     const response=await fetch(apiUrl,options)
     
     if(response.ok){
        const data=await response.json()
        const{books}=data
         const UpdatedData=books.map(eachBook=>({
            Authorname:eachBook.author_name,
            Coverpic:eachBook.cover_pic,
            id:eachBook.id,
            rating:eachBook.rating,
            readStatus:eachBook.read_status,
            title:eachBook.title

         }))
        console.log(UpdatedData)
       this.setState({
        BookDetails:UpdatedData,
        apiStatus:apiStatusConstants.success
       })
     }else{
        this.setState({
            apiStatus:apiStatusConstants.failure
        })
     }
        

    }
    renderSuccessView=()=>{
        const{BookDetails,bookname}=this.state
       
        
             if(BookDetails.length!==0){
              return(
                <ul className='BooksShelvesContainer'>
                {
                  BookDetails.map(eachbook=>(
                     <BookItem  bookDetails={eachbook} key={eachbook.id}/>
                  ))
                }
                
              </ul>
              )
              

             
             }else{
              return(
                <div className='empty-search-view-container'>
                 <img src="https://res.cloudinary.com/dgviahrbs/image/upload/v1695292224/Asset_1_1_polum4.jpg" alt="no Search"/>
                 <p className='empty-pargraph'> Your search for {bookname} did not find any matches.</p>
                
                </div>
                 
               )
             }
            
        
    }
    renderLoaderView=()=>{
      return(
        <div className="Loader-container-shuff" testid="loader">
          <TailSpin type="TailSpin" color="#0284C7" height={50} width={50} />
        </div>
        )
    }
    renderfailure=()=>{
      return(
        <div className="failure-image-container-Book">
           <img src="https://res.cloudinary.com/dgviahrbs/image/upload/v1694944653/Group_7522_ljmtgo.jpg" className="failure-image-home" alt="failure"/>
           <p className="failure-para"> Something went wrong, Please try again.</p>
           <button type="button" onClick={this.onClickRetry} className="retry-button-book"> Try Again</button>
        </div>

      )
    

 }
    renderViews=()=>{
      const {apiStatus}=this.state
      console.log(apiStatus)
      switch(apiStatus){
        case apiStatusConstants.success:
          return this.renderSuccessView()
        case apiStatusConstants.inProgress:
          return this.renderLoaderView()
        case apiStatusConstants.failure:
          return this.renderfailure()
        default:
          return null

      }
       


    }
   
    render(){
        const{activeFilter,activeFilterLabel,shufle}=this.state
        
       
        return(
            <>
             <NavBar shufle={shufle}/>
             <div className='SearchContainer-small'>
                                <input className="SearchInput" placeholder='Search' onChange={this.onChangeSearch}  onKeyDown={this.onKey} type="search"/>
                                 <button className='SearchButton' onClick={this.getCatergoryBooks}> <BiSearch/> </button>
                                
                                 
             </div>
             <h1 className='Heading-small'> Bookshelves</h1>
            <div className='Booksbgcontainer'> 
       
                   <ul className='BookCatergoryContainer'>
                   <h1 className='Heading'> Bookshelves</h1>

                     
                      
                         {bookshelvesList.map(eachItem => {
                              const activeClass=activeFilter === eachItem.value ?'active-button':''
                            const onClickedFilter = () => {
                              this.setState(
                                {
                                  activeFilter: eachItem.value,
                                  activeFilterLabel: eachItem.label,
                                },
                                this.getCatergoryBooks,
                              )
                            }
                            return (
                              <li className='list-button' key={eachItem.label}>
                                <button
                                 className={`button ${activeClass}`}
                                  onClick={onClickedFilter}
                                  type="button"
                                
                                >
                                  {eachItem.label}
                                </button>
                              </li>
                            )
                          })}
                     

                   </ul>


                      <div className='CatergoryBooksContainer'>

                         <div className='CatergorySearchContainer'>
                                <div>
                                <h1 className='Cat'>{activeFilterLabel}</ h1>
                               </div>
                               <div className='SearchContainer'>
                                <input className="SearchInput" placeholder='Search' onChange={this.onChangeSearch}  onKeyDown={this.onKey} type="search"/>
                                 <button className='searchButton' onClick={this.getCatergoryBooks}> <BiSearch/> </button>
                                
                                 
                               </div>
                               

                               
                         </div>
                        
                        <div>
                            {
                                this.renderViews()
                            }
                            
                        </div>
                        <div className='footer-container'>
                 <Footer/>
                 </div>
                                
                             
                      
                         
                   </div>
                         
                               
                   
                   
                   
                  
            </div>
           
            
                    
           
            </>
           
        )
    }
}
export default Bookshelves

