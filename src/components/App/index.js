import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import axios from 'axios';
import './App.css';
import Header from '../Header';
import ProductList from '../ProductList';
import ProductDetail from '../ProductDetail';
import CartPage from '../CartPage';

class App extends Component {
  constructor(props){
  	super(props);
  	this.state = {
  		productList:null,
  		errorOccured:false,
  		productSelected:null,
  		cartItems:null,
      quantities:{}
  	};
  	this.addToCart = this.addToCart.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
    this.clearCart = this.clearCart.bind(this);
    this.setQuantity = this.setQuantity.bind(this);
  }

  addToCart(e,product){
    e.preventDefault();
    let { cartItems } = this.state;
    cartItems = cartItems || [];
    if(cartItems.indexOf(product) == -1){
    	cartItems.push(product);
    	this.setState({
    		cartItems
    	})
    }
  }

  removeFromCart(product){
    const {cartItems} = this.state;
    const ind = cartItems.indexOf(product);
    cartItems.splice(ind,1);
    this.setState({
      cartItems
    })
  }

  clearCart(){
    this.setState({
      cartItems:null
    })
  }

  setQuantity(val, prodId){
    const {quantities} = this.state;
    quantities[prodId] = val;
      this.setState({
        quantities
      })
  }

  componentDidMount(){
  	axios.get('http://localhost:3001/get-items')
  	.then((resp)=>{
  		if(resp.data){
	  		this.setState({
	  			productList:resp.data
	  		});
  		}
  	})
  	.catch((err)=>{
  		this.setState({
  			errorOccured:true
  		});
  	})
  }

  render() {
  	const {productList, cartItems, quantities} = this.state;
    return (
      <Router>
	      <div className="container">
	      	<Header />
	      	<Route exact 
	      	path="/" 
	      	render={(props) => <ProductList {...props} 
		      	data={productList} 
		      	addToCart={this.addToCart}
            setQuantity={this.setQuantity}
            quantities={quantities}
		      	/>}
	      	/>
	      	<Route 
	      	path='/product/:id'
	      	render={(props) => <ProductDetail {...props} 
	      		data={productList}
            quantities={quantities}
            setQuantity={this.setQuantity}
            addToCart={this.addToCart}
	      		/>}
	      	/>
	      	<Route 
	      	path='/cart'
	      	render={(props) => <CartPage {...props} 
	      		data={productList}
	      		cartItems={cartItems}
            clearCart={this.clearCart}
            quantities={quantities}
            setQuantity={this.setQuantity}
            removeFromCart={this.removeFromCart}
	      	/>}
	      	/>
	      </div>
      </Router>
    );
  }
}

export default App;
