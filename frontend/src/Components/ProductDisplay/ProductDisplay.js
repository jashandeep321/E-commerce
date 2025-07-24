import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';

const ProductDisplay = () => {
  const { productID } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8082/api/products/${productID}`)
      .then(response => {
        const data = response.data;
        setProduct(data);
        const imgs = parseImages(data.productImages);
        setSelectedImage(imgs[0]);
      })
      .catch(error => {
        console.error('Error fetching product details:', error);
      });
  }, [productID]);

  const parseImages = (imgField) => {
    if (!imgField) return [];
    if (Array.isArray(imgField)) return imgField;
    try {
      return JSON.parse(imgField);
    } catch (e) {
      console.warn("Image parsing failed", imgField);
      return [];
    }
  };

  const addToCart = (product) => {
    try {
      const existingCart = JSON.parse(localStorage.getItem('cart')) || [];

      // Use the productID from URL params as the definitive ID
      const productId = String(productID); // This comes from the URL (/ProductDisplay/10)

      if (!productId) {
        throw new Error('Product has no valid identifier');
      }

      const existingItemIndex = existingCart.findIndex(item =>
        String(item.id) === productId
      );

      if (existingItemIndex !== -1) {
        existingCart[existingItemIndex].quantity += 1;
      } else {
        const firstImage = parseImages(product.productImages)[0] || '';
        existingCart.push({
          id: productId,
          name: product.productName,
          price: product.productPrice,
          quantity: 1,
          image: `http://localhost:8000/uploads/${firstImage}`,
          productID: product.productID // Include original ID for reference
        });
      }

      localStorage.setItem('cart', JSON.stringify(existingCart));
      localStorage.setItem('cartCount', existingCart.reduce((sum, item) => sum + item.quantity, 0));
      window.dispatchEvent(new Event("storage"));


    } catch (error) {
      console.error('Error adding to cart:', error);
      alert("Failed to add to cart. Please try again.");
    }
  };

  if (!product) return <div>Loading...</div>;

  const images = parseImages(product.productImages);
  const discountPercent = Math.round(((product.productMRP - product.productPrice) / product.productMRP) * 100);


  return (
    <div className='productdisplay container mt-5 mb-5'>
      <style>{`
        .thumbnail-scroll {
          max-height: 455px;
          overflow-y: auto;
          overflow-x: hidden;
           display: flex;
           flex-direction: column; 
           padding-right: 5px;
           min-width: 90px;
           flex-shrink: 0; 
        }
        .thumbnail-scroll img {
          height: 100px;
          width: 80px;
          object-fit: cover;
          border: 1px solid #ccc;
          margin-bottom: 10px;
          cursor: pointer;
          transition: border 0.3s;
        }
        .thumbnail-scroll img.active {
          border: 2px solid #007bff;
        }
        .main-image {
          max-height: 455px;
          object-fit: contain;
        }
        .size {
          padding: 5px 15px;
          border: 1px solid #ccc;
          background-color: white;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        .size:hover {
          background-color: #f0f0f0;
        }
      `}</style>

      <div className="row">
        {/* Left Side */}
        <div className="col-md-6">
          <div className="productdisplay-img d-flex" style={{ gap: '20px' }}>
            <div className="thumbnail-scroll">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={`http://localhost:8000/uploads/${img}`}
                  alt={`thumb-${index}`}
                  className={img === selectedImage ? 'active' : ''}
                  onClick={() => setSelectedImage(img)}
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              ))}
            </div>

            {selectedImage && (
              <img
                src={`http://localhost:8000/uploads/${selectedImage}`}
                alt="selected"
                className="main-image"
              />
            )}
          </div>
        </div>

        {/* Right Side */}
        <div className="col-md-6 text-start">
          <h4>{product.productBrand}</h4>
          <h3>{product.productName}</h3>

          <div className="productdisplay-right-prices d-flex gap-2">
            <div className="productdisplay-right-price-discount fs-2" style={{ color: '#CC0C39', fontWeight: 'lighter' }}>
              -{discountPercent}%
            </div>
            <div className="mt-1"><FontAwesomeIcon icon={faIndianRupeeSign} /></div>
            <div className="productdisplay-right-price-new fs-2" style={{ marginLeft: '-10px' }}>
              {product.productPrice}
            </div>
          </div>

          <div style={{ display: 'flex', color: '#565959' }}>
            <div className="productdisplay-right-price-old">M.R.P:</div>
            <div className="productdisplay-right-price-old text-decoration-line-through ms-1">
              <FontAwesomeIcon icon={faIndianRupeeSign} />{product.productMRP}
            </div>
          </div>

          <div className="productdisplay-right-size">
            <h6 className="fw-bold mt-3">Select Size</h6>
            <div className="productdisplay-right-sizes d-flex gap-2">
              <button className="size">S</button>
              <button className="size">M</button>
              <button className="size">L</button>
              <button className="size">XL</button>
              <button className="size">XXL</button>
            </div>
          </div>

          <button onClick={() => addToCart(product)} className="btn btn-primary mb-3 mt-3">
            ADD TO CART
          </button>

          <p className='productdisplay-right-category'><strong>Category:</strong> {product.productCatogory}</p>
          <p className='productdisplay-right-category'>
            <strong>More Info:</strong><br />
            <span dangerouslySetInnerHTML={{ __html: product.productDetails.replace(/\n/g, '<br/>') }} />
          </p>

        </div>
      </div>
    </div>
  );
};

export default ProductDisplay;
