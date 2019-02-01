import React, { Component } from 'react';
import './ProductDetail.css';

class ProductDetail extends Component {
  constructor(props){
    super(props);
  }

  render() {
    const {data, setQuantity, quantities, addToCart} = this.props;
    const productId = this.props.match.params.id;
    const product = data && data.find((n)=>{
      return n.id === productId;
    });
    const id = this.props.match.params.id;
    return (
      <div className="productListContainer">
        {
          product && 
          <div>
            <h1 className="productName">{product.title}</h1>
            <div className="priceTxt">
                      ${product.price}
            </div>
            <div className="imagesContainer">
              {
                product.images && product.images.map((n,i)=>{
                  return <img key={i} src={n} className="productImgs"/>
                })
              }
            </div>
            <p>
              <b>DESCRIPTION: </b>{product.description}
            </p>
            <p>
              <b>{product.inStock ? 'In Stock' : 'Out of Stock'}</b>
            </p>
            {product.reviews && product.reviews.length >1 &&
              <div>
                <p><b>REVIEWS: </b></p>
                {
                  product.reviews.map((n, i)=>{
                    return <div className="reviews" key={i}>
                      <div><b>{n.author}</b></div>
                      <b>Rating: </b>{n.rating}
                      <div><b>{n.title}</b></div>
                      <div>{n.body}</div>
                      
                    </div>
                  })
                }
              </div>
            }
            <div className="priceContainer detailPage">
                    <input type="number" className="quantity" onInput={(e)=>setQuantity(e.target.value, product.id)} value={quantities[product.id] || 1}/>
                    <button className="addCartBtn" onClick={(e)=>addToCart(e,product.id)}>Add To cart</button>
              </div>
          </div>
        }
      </div>
    );
  }
}

export default ProductDetail;
