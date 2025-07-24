// import React, { useState, useEffect } from 'react';

// const Cart = () => {
//   const [cartItems, setCartItems] = useState(() => {
//     const stored = localStorage.getItem('cart');
//     return stored ? JSON.parse(stored) : [];
//   });

//   const [subtotal, setSubtotal] = useState(0);

//   useEffect(() => {
//     const total = cartItems.reduce(
//       (acc, item) => acc + item.price * item.quantity,
//       0
//     );
//     setSubtotal(total);
//   }, [cartItems]);

//   const incrementQty = (id) => {
//     const updated = cartItems.map(item =>
//       item.id === id ? { ...item, quantity: item.quantity + 1 } : item
//     );
//     setCartItems(updated);
//     localStorage.setItem('cart', JSON.stringify(updated));
//   };

//   const decrementQty = (id) => {
//     const updated = cartItems.map(item =>
//       item.id === id && item.quantity > 1
//         ? { ...item, quantity: item.quantity - 1 }
//         : item
//     );
//     setCartItems(updated);
//     localStorage.setItem('cart', JSON.stringify(updated));
//   };

//   const removeItem = (id) => {
//     const updated = cartItems.filter(item => item.id !== id);
//     setCartItems(updated);
//     localStorage.setItem('cart', JSON.stringify(updated));
//   };

//   const gst = subtotal * 0.18;
//   const total = subtotal + gst;

//   return (
//     <div className="container mt-5">
//       <h2 className="mb-4">Your Cart</h2>
//       {cartItems.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <>
//           <table className="table table-bordered table-hover align-middle">
//             <thead className="table-light">
//               <tr>
//                 <th>Product</th>
//                 <th>Name</th>
//                 <th>Price</th>
//                 <th>Qty</th>
//                 <th>Subtotal</th>
//                 <th>Remove</th>
//               </tr>
//             </thead>
//             <tbody>
//               {cartItems.map((item) => (
//                 <tr key={item.id}>
//                   <td>
//                     <img
//                       src={item.image}
//                       alt={item.name}
//                       style={{ width: '80px', height: '80px', objectFit: 'cover' }}
//                     />
//                   </td>
//                   <td>{item.name}</td>
//                   <td>₹{item.price}</td>
//                   <td>
//                     <div className="d-flex align-items-center gap-2">
//                       <button
//                         className="btn btn-sm btn-secondary"
//                         onClick={() => decrementQty(item.id)}
//                       >
//                         -
//                       </button>
//                       <span style={{ justifyContent: 'center' }}>{item.quantity}</span>
//                       <button
//                         className="btn btn-sm btn-secondary"
//                         onClick={() => incrementQty(item.id)}
//                       >
//                         +
//                       </button>
//                     </div>
//                   </td>
//                   <td>₹{item.price * item.quantity}</td>
//                   <td>
//                     <button
//                       className="btn btn-sm btn-danger"
//                       onClick={() => removeItem(item.id)}
//                     >
//                       Remove
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           <div className="text-end">
//             <p>Subtotal: ₹{subtotal.toFixed(2)}</p>
//             <p>GST (18%): ₹{gst.toFixed(2)}</p>
//             <h4>Total: ₹{total.toFixed(2)}</h4>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Cart;



import React, { useState, useEffect } from 'react';

const Cart = () => {
  // Initialize cart items with proper ID normalization
  const [cartItems, setCartItems] = useState(() => {
    try {
      const stored = localStorage.getItem('cart');
      if (stored) {
        const parsed = JSON.parse(stored);
        // Normalize IDs to strings and ensure both id and productID exist
        return parsed.map(item => ({
          ...item,
          id: String(item.id || item.productID), // Use productID as fallback
          productID: String(item.productID || item.id) // Ensure both fields exist
        }));
      }
      return [];
    } catch (error) {
      console.error('Error parsing cart data:', error);
      return [];
    }
  });

  const [subtotal, setSubtotal] = useState(0);

  // Calculate subtotal whenever cart items change
  useEffect(() => {
    const total = cartItems.reduce(
      (acc, item) => acc + (Number(item.price) || 0) * (Number(item.quantity) || 0),
      0
    );
    setSubtotal(total);
  }, [cartItems]);

  // In your Cart.js updateQuantity function
const updateQuantity = (id, change) => {
  setCartItems(prevItems => {
    const updated = prevItems.map(item => 
      String(item.id) === String(id) || 
      String(item.productID) === String(id)
        ? { 
            ...item, 
            quantity: Math.max(1, item.quantity + change) 
          }
        : item
    ).filter(item => item.quantity > 0);
    
    localStorage.setItem('cart', JSON.stringify(updated));
    
    // Calculate and update the total count
    const newCount = updated.reduce((sum, item) => sum + item.quantity, 0);
    localStorage.setItem('cartCount', newCount);
    window.dispatchEvent(new Event("storage")); // Trigger storage event
    
    return updated;
  });
};

  const incrementQty = (id) => updateQuantity(id, 1);
  const decrementQty = (id) => updateQuantity(id, -1);

  // Remove item with proper ID comparison
  const removeItem = (id) => {
    setCartItems(prevItems => {
      const updated = prevItems.filter(item => 
        String(item.id) !== String(id) && 
        String(item.productID) !== String(id)
      );
      localStorage.setItem('cart', JSON.stringify(updated));
      return updated;
    });
  };

  // Calculate taxes and total
  const gst = subtotal * 0.18;
  const total = subtotal + gst;

  return (
    <div className="container mt-5 mb-5">
      <h2 className="mb-4">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>Product</th>
                <th>Name</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Subtotal</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={`${item.id}-${item.name}`}> {/* More unique key */}
                  <td>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                      onError={(e) => { 
                        e.target.src = 'https://via.placeholder.com/80'; 
                        e.target.alt = 'Product image not available';
                      }}
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>₹{Number(item.price).toFixed(2)}</td>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <button
                        className="btn btn-sm btn-secondary"
                        onClick={() => decrementQty(item.id)}
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span style={{ minWidth: '20px', textAlign: 'center' }}>
                        {item.quantity}
                      </span>
                      <button
                        className="btn btn-sm btn-secondary"
                        onClick={() => incrementQty(item.id)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>₹{(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => removeItem(item.id)}
                      aria-label="Remove item"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="text-end mt-4">
            <p className="h5">Subtotal: ₹{subtotal.toFixed(2)}</p>
            <p className="h6">GST (18%): ₹{gst.toFixed(2)}</p>
            <h4 className="mt-3">Total: ₹{total.toFixed(2)}</h4>
            
            {/* Add checkout button */}
            <button 
              className="btn btn-primary mt-3"
              onClick={() => alert('Proceeding to checkout')}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;