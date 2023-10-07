import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';
import AiChatBot from './components/AIChatbot';
import Home from './components/Home';
import Bookshelves from './components/Bookshelves';
import Item from './components/BookDetails';
import NotFound from './components/PageNotFound';
import Cart from './components/Cart';
import CartContext from './context/CartContext';
import CheckOut from './components/checkout';

class App extends Component {
  state = {
    cartList: [],
  }

  
  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(each => {
        if (id === each.id) {
          const updatedQuantity = each.quantity + 1
          return {...each, quantity: updatedQuantity}
        }
        return each
      }),
    }))
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const productObject = cartList.find(each => each.id === id)
    if (productObject.quantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(each => {
          if (id === each.id) {
            const updatedQuantity = each.quantity - 1
            return {...each, quantity: updatedQuantity}
          }
          return each
        }),
      }))
    } else {
      this.removeCartItem(id)
    }
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const updatedList = cartList.filter(each => each.id !== id)
    this.setState({cartList: updatedList})
  }

  addCartItem = product => {
    const {cartList} = this.state

    const productObject = cartList.find(
      eachCardItem => eachCardItem.id === product.id,
    )
    if (productObject) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachObject => {
          if (productObject.id === eachObject.id) {
            const updatedQuantity = eachObject.quantity + product.quantity
            return {...eachObject, quantity: updatedQuantity}
          }
          return eachObject
        }),
      }))
    } else {
      const updatedCartList = [...cartList, product]
      this.setState({cartList: updatedCartList})
    }
  }
  render() {
    const {cartList} = this.state
    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <div className="App">
          <Switch>
            <Route exact path="/login" component={Login} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/chatbot" component={AiChatBot} />
            <ProtectedRoute exact path="/shelf" component={Bookshelves} />
            <ProtectedRoute exact path="/books/:id" component={Item} />
            <ProtectedRoute exact path="/cart" component={Cart} />
            <ProtectedRoute exact path="/checkout" component={CheckOut} />
            <NotFound />
          </Switch>
        </div>
      </CartContext.Provider>
    );
  }
}

export default App;
