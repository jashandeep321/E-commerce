import React, { useContext } from 'react'
import './ProductDisplay.css'
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from '../../Context/ShopContext';

 const ProductDisply = (props) => {
    const {product } =props;
    const {addToCart} = useContext(ShopContext);
  return (
    <div className='productdisplay container'>
        <div className="row">
            <div className="col-md-6">
                <div className="productdisplay-img-list d-flex flex-column gap-2">
                    <img src={product.image} alt=""/>
                    <img src={product.image} alt=""/>
                    <img src={product.image} alt=""/>
                    <img src={product.image} alt=""/>
                </div>
                <div className="productdisplay-img">
                    <img className='productdisplay-main-img img-fluid' src={product.image} alt="" />
                </div>
            </div>
            <div className="col-md-6">
                <h1>{product.name}</h1>
                <div className="productdisplay-right-star d-flex align-items-center gap-1">
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_dull_icon} alt="" />
                    <p>(122)</p>
                </div>
                <div className="productdisplay-right-prices d-flex gap-2">
                    <div className="productdisplay-right-price-old">${product.old_price}</div>
                    <div className="productdisplay-right-price-new">${product.new_price}</div>
                </div>
                <div className="productdisplay-right-description">
                    A lightweight, usually knittes, pullover shirt, close-fitting and with a round neckline and short sleeves worn as an undershirt or ouuter garment.
                </div>
                <div className="productdisplay-right-size">
                    <h1>Select Size</h1>
                    <div className="productdisplay-right-sizes d-flex gap-2">
                        <div>S</div>
                        <div>M</div>
                        <div>L</div>
                        <div>XL</div>
                        <div>XXL</div>
                    </div>
                </div>
                <button onClick={()=>{addToCart(product.id)}} className="btn btn-primary">ADD TO CART</button>
                <p className='productdisplay-right-category'><span>Category: </span> Women, T-shirt , Crop Top</p>
                <p className='productdisplay-right-category'><span>Tags: </span> Modern, Latest</p>
            </div>
        </div>
    </div>
  )
}
export default ProductDisply;
 