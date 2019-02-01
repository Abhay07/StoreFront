import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './ProductList.css';

class ProductList extends Component {
	constructor(props){
		super(props);
    this.stopClick = this.stopClick.bind(this);
	}
  stopClick(e){
    e.preventDefault();
  }
  render() {
  	const { data, addToCart, setQuantity, quantities } = this.props;

    return (
      <div className="productListContainer">
   		{
   			data && 
   			data.map((n)=>{
  				return <Link key={n.id} className="product" to={`/product/${n.id}`}>
            <div>
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
                    <input type="number" className="quantity" onClick={(e)=>this.stopClick(e)} onChange={(e)=>setQuantity(e.target.value, n.id)} value={quantities[n.id] || 1}/>
                    <button className="addCartBtn" onClick={(e)=>addToCart(e,n.id)}>Add To cart</button>
              </div>
              </div>
          </Link>
  			})
   		}
      {
        !data && 
        <p className="emptyCartTxt">Loading Products</p>
      }
      </div>
    );
  }
}

export default ProductList;
