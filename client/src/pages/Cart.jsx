import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();

  // Price Calculations
  const totalMRP = cart.reduce((total, item) => total + ((item.originalPrice || item.price * 1.2) * item.quantity), 0);
  const finalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const totalDiscount = totalMRP - finalPrice;

  return (
    // Fragment use panni wrap panniyachu
    <>
      {cart.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h3>Your cart is empty!</h3>
          <button 
            onClick={() => navigate('/')} 
            style={{ padding: '10px 20px', backgroundColor: '#4F46E5', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '10px' }}
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div style={{ maxWidth: '1200px', margin: '2rem auto', padding: '0 1rem', display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          
          {/* LEFT SIDE: Cart Items */}
          <div style={{ flex: '2', minWidth: '60%', backgroundColor: '#fff', padding: '1rem', border: '1px solid #ddd', borderRadius: '8px' }}>
            {cart.map((item) => (
              <div key={item._id} style={{ display: 'flex', gap: '1.5rem', borderBottom: '1px solid #eee', padding: '1rem 0' }}>
                <img src={item.mainImg || "https://placehold.co/150"} alt={item.title} style={{ width: '120px', height: '120px', objectFit: 'contain' }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <h3 style={{ margin: 0, color: '#333' }}>{item.title}</h3>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>{item.description?.substring(0, 80)}...</p>
                  <div style={{ display: 'flex', gap: '1rem', fontSize: '0.9rem' }}>
                    <span>Size: <strong>{item.size || 'M'}</strong></span>
                    <span>Quantity: <strong>{item.quantity}</strong></span>
                  </div>
                  <p style={{ margin: 0, fontWeight: 'bold', fontSize: '1.1rem' }}>Price: ₹{item.price}</p>
                  <button 
                    onClick={() => removeFromCart(item._id)} 
                    style={{ alignSelf: 'flex-start', background: 'none', border: 'none', color: '#d9534f', cursor: 'pointer', padding: 0, marginTop: '0.5rem' }}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT SIDE: Price Details */}
          <div style={{ flex: '1', minWidth: '300px', height: 'fit-content', backgroundColor: '#fdfdfd', padding: '1.5rem', border: '1px solid #ddd', borderRadius: '8px' }}>
            <h3 style={{ color: '#555', borderBottom: '1px solid #eee', paddingBottom: '10px', marginTop: 0 }}>Price Details</h3>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '1rem 0', color: '#555' }}>
              <span>Total MRP:</span>
              <span>₹ {Math.round(totalMRP)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '1rem 0', color: '#28a745' }}>
              <span>Discount on MRP:</span>
              <span>- ₹ {Math.round(totalDiscount)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '1rem 0', color: '#555' }}>
              <span>Delivery Charges:</span>
              <span style={{ color: '#28a745' }}>FREE</span>
            </div>
            
            <hr style={{ borderTop: '1px dashed #ccc', margin: '1.5rem 0' }} />
            
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '1.5rem' }}>
              <span>Final Price:</span>
              <span>₹ {Math.round(finalPrice)}</span>
            </div>

            <button 
              onClick={() => navigate('/checkout')}
              style={{ width: '100%', padding: '1rem', backgroundColor: '#4F46E5', color: 'white', border: 'none', borderRadius: '4px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer' }}>
              Place order
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Cart;