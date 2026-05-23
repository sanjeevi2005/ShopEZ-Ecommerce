import { useCart } from '../context/CartContext';
import PropTypes from 'prop-types';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart(); // Use the global function

  return (
    <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '1rem', textAlign: 'center', backgroundColor: '#fff' }}>
      <img src={product.mainImg} onError={(e) => { e.target.src = "https://placehold.co/150?text=Error+Loading"; }} alt={product.title} style={{ width: '100%', height: '150px', objectFit: 'contain' }} />
      <h3>{product.title}</h3>
      <p>${product.price}</p>
      <button 
        onClick={() => {
          addToCart(product);
          alert("Added to cart!"); // Temporary feedback
        }}
        style={{ width: '100%', padding: '0.5rem', backgroundColor: '#ff9900', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
      >
        Add to Cart
      </button>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    mainImg: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.number
  }).isRequired
};

export default ProductCard;