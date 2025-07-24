import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndianRupeeSign} from '@fortawesome/free-solid-svg-icons';
import Carousel from 'react-bootstrap/Carousel';
import bannerkids from '../../Images/bannerkids.jpg';

const Products = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8082/api/kids/products')
      .then(response => {
        setMenuItems(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const addToCart = (item) => {
    // Implement your logic to add the item to the cart
    console.log('Added to Cart:', item);
  };

  // Function to truncate text to a certain number of words
  const truncateText = (text, limit) => {
    const words = text.split(' ');
    if (words.length > limit) {
      return words.slice(0, limit).join(' ') + '...';
    } else {
      return text;
    }
  };

   // 🔧 Helper to safely get first image
  const getFirstImage = (images) => {
    if (!images) return '';
    if (Array.isArray(images)) {
      return images[0];
    }
    try {
      const parsed = JSON.parse(images);
      return parsed[0];
    } catch (e) {
      console.warn('Error parsing images:', images);
      return '';
    }
  };


  return (
    <div>
    <Carousel>
      <Carousel.Item>
      <img
            className="d-block w-100"
            src={bannerkids}
            alt="First slide"
            style={{height:'400px'}}
          />
      </Carousel.Item>
    </Carousel>
    <div className="container mt-5">
      <div className="row row-cols-2 row-cols-md-3 row-cols-lg-5">
        {menuItems.map(item => (
          <div key={item.productID} className="col mb-4">
            <Link to={`/ProductDisplay/${item.productID}`} className="text-decoration-none">
              <div className="card h-100">
                <img
                    src={`http://localhost:8000/uploads/${getFirstImage(item.productImages)}`}
                    alt={item.productName + " img"}
                    className="card-img-top img-fluid"
                    style={{ height: '280px' }}
                  />
                <div className="card-body">
                  <p className="card-title font-weight-bold">{item.productBrand}</p>
                  <p className="card-text font-weight-bold">{truncateText(item.productDetails, 8)}</p>
                  <div className='price'style={{display:'flex'}}>
                <p className="card-text mb-auto"><FontAwesomeIcon icon={faIndianRupeeSign} /></p>
                <h3 className="card-text m-1">{item.productPrice +" "}</h3>
                <p className="card-text mt-2" style={{color: '#000000b8'}} > MRP:</p>
                <p className="card-text mt-2" style={{color: '#000000b8', textDecoration: 'line-through'}}>  <FontAwesomeIcon icon={faIndianRupeeSign} style={{ fontWeight: 'lighter',fontSize: '0.8em',textDecoration: 'line-through' }}/>{" "+ item.productMRP}</p>
                </div>
                  <button onClick={() => addToCart(item)} className="btn btn-warning mt-2">
                    Add to Cart
                  </button>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Products;
