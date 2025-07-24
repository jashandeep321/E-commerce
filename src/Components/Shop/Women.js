
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { height } from '@fortawesome/free-solid-svg-icons/fa0';

// const Products = () => {
//   const [menuItems, setMenuItems] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:8082/api/men/products')
//       .then(response => {
//         setMenuItems(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error);
//       });
//   }, []);

//   const addToCart = (item) => {
//     // Implement your logic to add the item to the cart
//     console.log('Added to Cart:', item);
//   };

//   return (
//     <div style={styles.app}>
//       {/* <h1 style={styles.Title}>Menu</h1> */}
//       <div style={styles.menuContainer}>
//         {menuItems.map(item => (

//           <div key={item.productID} style={styles.menuItem}>
//             <img src={`http://localhost:8000/uploads/${item.productImage}`}  alt={item.productName +" img"} style={styles.productImage} />
//             <h3 style={styles.itemHeader}>{item.productName}</h3>
//             <p style={{ fontWeight: 'bold' }}>{item.productDetails}</p>
//             <p>Category: {item.productCatogory}</p>
//             <p>Price: {item.productPrice}</p>

//             <button onClick={() => addToCart(item)} style={styles.addToCartButton}>
//               Add to Cart
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>




//     // <div className="new-collections m-5 p-5 d-flex flex-column align-items-center">
//     //   <h1 className="mb-4">NEW COLLECTIONS</h1>
//     //   <hr className="mb-4" />
//     //   <div className="row justify-content-center row-cols-md-4">
//     //     {new_collection.map((item, i) => (
//     //       <div key={i} className="col-md-3 mb-3 justify-content-center">
//     //         <Item id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
//     //       </div>
//     //     ))}
//     //   </div>
//     // </div>
//   );
// };

// const styles = {
//   app: {
//     textAlign: 'center',
//     padding: '20px',
//   },
//   menuContainer: {
//     display: 'flex',
//     flexWrap: 'wrap',
//     justifyContent: 'space-around',
//   },
//   Title: {
//     textAlign: 'center',
//     fontFamily: 'Fredericka',
//     marginBottom: '2rem',
//     fontSize: '3.5rem',
//   },
//   menuItem: {
//     backgroundColor: '#fff',
//     border: '2px solid grey',
//     borderRadius: '8px',
//     padding: '10px',
//     margin: '10px',
//     width: '250px',
//   },
//   itemHeader: {
//     color: 'black',
//     fontFamily: 'Gabelisa',
//     margin:'1rem',
//     // fontWeight: 'bolder',
//   },
//   addToCartButton: {
//     backgroundColor: '#ffe001',
//     color: 'black',
//     border: 'none',
//     padding: '10px 20px',
//     fontSize: '16px',
//     cursor: 'pointer',
//     borderRadius: '8px',
//     marginTop: '10px',
//   },
//   productImage: {
//     // backgroundColor: '#fff',
//     // border: '2px solid grey',
//     // borderRadius: '8px',
//     // padding: '10px',
//     // margin: '10px',
//     height: '250px',
//     width:'210px',
//   },

// };

// export default Products;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';
import Carousel from 'react-bootstrap/Carousel';
import bannerwomen from '../../Images/banner-women.jpg';

const Products = ({ onAddToCart }) => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8082/api/women/products')
      .then(response => {
        setMenuItems(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleClick = (item) => {
    if (onAddToCart) {
      onAddToCart(item);
    }
  };


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
            src={bannerwomen}
            alt="First slide"
            style={{ height: '400px' }}
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
                    <div className='price' style={{ display: 'flex' }}>
                      <p className="card-text mb-auto"><FontAwesomeIcon icon={faIndianRupeeSign} /></p>
                      <h3 className="card-text m-1">{item.productPrice + " "}</h3>
                      <p className="card-text mt-2" style={{ color: '#000000b8' }} > MRP:</p>
                      <p className="card-text mt-2" style={{ color: '#000000b8', textDecoration: 'line-through' }}>  <FontAwesomeIcon icon={faIndianRupeeSign} style={{ fontWeight: 'lighter', fontSize: '0.8em', textDecoration: 'line-through' }} />{" " + item.productMRP}</p>
                    </div>
                    <button onClick={() => handleClick(item)} className="btn btn-warning mt-2">
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
