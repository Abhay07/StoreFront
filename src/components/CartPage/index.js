import React, { Component } from 'react';
import './CartPage.css';
import axios from 'axios';

class CartPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      checkedOut: false
    }
    this.checkout = this.checkout.bind(this);
  }

  checkout(){
    const {cartItems, clearCart, quantities} = this.props;
    if(cartItems && cartItems.length > 0){
    const items = cartItems.map(n=>{
        return {
           id:n,
           quantity:quantities[n]
        }
    });
    const reqBody = {
        "items": items
    }
      axios.post('http://localhost:3001/checkout',reqBody)
      .then(()=>{
        this.setState({
          checkedOut:true
        });
        clearCart();
      })
      .catch(()=>{
        console.log('error');
      })
    }
  }
  render() {
    const {cartItems, data, setQuantity, quantities, removeFromCart} = this.props;
    const { checkedOut } = this.state;
    let products = cartItems && cartItems.map(n=>{
      return data.find(product=>product.id === n)
    })
    console.log(products);
    return (
      <div>
      { products && products.length > 0 &&
        <div className="cartHeader">
          <div className="cartLabel">Items in your cart</div>
          <button className="addCartBtn" onClick={this.checkout}>Checkout</button>
        </div>
      }
      <div className="productListContainer">
      {
        !checkedOut && products && 
        products.map((n,i)=>{
          return <div className="product" key={i}>
                <div className="imgContainer">
                    <img src={n.thumbnail} className="productImg"/>
                </div>
                <div className="detailContainer">
                    <div className="productTitle">
                      {n.title}
                    </div>
                    <div className="productDescription">
                      {n.description}
                    </div>
                </div>
                <div className="priceContainer">
                      <div className="priceTxt">
                        ${n.price}
                      </div>
                      <input type="number" className="quantity" onInput={(e)=>setQuantity(e.target.value, n.id)} value={quantities[n.id] || 1}/>
                      <button className="addCartBtn" onClick={(e)=>removeFromCart(n.id)}>Remove</button>
                </div>
              </div>
        })
      }
      {
        !checkedOut && (!products || products.length == 0)&& 
        <p className="emptyCartTxt">Your cart is empty</p>
      }
      {
        checkedOut && 
        <p className="emptyCartTxt">Your order is submitted</p>
      }
      </div>
      </div>
    );
  }
}

export default CartPage;
