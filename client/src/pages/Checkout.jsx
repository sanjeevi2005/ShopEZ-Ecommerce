/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { placeOrder } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Checkout = () => {
  const { cart, clearCart } = useCart(); 
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  // Add loading state
  const [isProcessing, setIsProcessing] = useState(false);

  const [formData, setFormData] = useState({
    mobile: '',
    address: '',
    pincode: '',
    paymentMethod: 'Cash on Delivery'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleConfirmOrder = async (e) => {
    e.preventDefault();
    setIsProcessing(true); // Disable button

    const actualUserId = user?._id || user?.id;

    if (!actualUserId) {
      toast.error("Session expired. Please login again.");
      setIsProcessing(false);
      return;
    }

    try {
      for (const item of cart) {
        const orderData = {
          userId: actualUserId,
          name: user.username || "Guest",
          email: user.email || "No Email",
          mobile: formData.mobile,
          address: formData.address,
          pincode: formData.pincode,
          paymentMethod: formData.paymentMethod,
          title: item.title,
          description: item.description || "No description",
          mainImg: item.mainImg || item.image || "", 
          quantity: Number(item.quantity),
          price: Number(item.price),
          discount: 0, 
          orderDate: new Date().toLocaleDateString(),
          deliveryDate: "Pending",
          orderStatus: 'order placed'
        };
        await placeOrder(orderData);
      }

      toast.success("🎉 Order placed successfully!");
      clearCart(); 
      navigate('/orders'); 

    } catch (err) {
      console.error(err);
      toast.error("Checkout failed. Please try again.");
    } finally {
      setIsProcessing(false); // Re-enable button
    }
  };

  if (cart.length === 0) return null; // Prevent showing form if empty

  return (
    <div style={{ maxWidth: '500px', margin: '2rem auto', padding: '2rem', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#fff', color: '#333' }}>
      <h2 style={{ textAlign: 'center' }}>Shipping Information</h2>
      <form onSubmit={handleConfirmOrder} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
        <input name="mobile" placeholder="Mobile Number" onChange={handleChange} required style={{ padding: '0.8rem', borderRadius: '4px', border: '1px solid #ccc' }} />
        <textarea name="address" placeholder="Shipping Address" onChange={handleChange} required style={{ padding: '0.8rem', minHeight: '80px', borderRadius: '4px', border: '1px solid #ccc' }} />
        <input name="pincode" placeholder="Pincode" onChange={handleChange} required style={{ padding: '0.8rem', borderRadius: '4px', border: '1px solid #ccc' }} />
        
        <label style={{ fontWeight: 'bold' }}>Payment Method:</label>
        <select name="paymentMethod" onChange={handleChange} style={{ padding: '0.8rem', borderRadius: '4px', border: '1px solid #ccc' }}>
          <option>Cash on Delivery</option>
          <option>UPI / Net Banking</option>
        </select>

        {/* Change button style and text based on processing state */}
        <button 
          type="submit" 
          disabled={isProcessing}
          style={{ 
            padding: '1rem', 
            backgroundColor: isProcessing ? '#9ca3af' : '#4F46E5', 
            color: '#fff', border: 'none', borderRadius: '4px', 
            fontWeight: 'bold', cursor: isProcessing ? 'not-allowed' : 'pointer' 
          }}>
          {isProcessing ? 'Processing Order...' : 'Place Order'}
        </button>
      </form>
    </div>
  );
};

export default Checkout;