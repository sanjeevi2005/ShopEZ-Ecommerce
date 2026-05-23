import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddProduct = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  
  // Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: 'Electronics', // Default value
    sizes: '',
    gender: 'Unisex',
    image: null,
  });

  // Text inputs handle panna
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Image file select pannumbothu handle panna
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      // Image preview generate panrom
      setImagePreview(URL.createObjectURL(file)); 
    }
  };

  // Form Submit panna
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.image) {
      return toast.error("Please select an image for the product!");
    }

    setLoading(true);

    // Image file anuppa 'FormData' use pannanum (Normal JSON work aagathu)
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('category', formData.category);
    data.append('sizes', formData.sizes);
    data.append('gender', formData.gender);
    data.append('image', formData.image); // Ithu backend-la upload.single('image') nu edukkum

    try {
      const response = await fetch('http://localhost:8000/api/products/add', {
        method: 'POST',
        body: data, // JSON stringify panna koodathu
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message);
        navigate('/admin/dashboard'); // Success aana dashboard-ku poyidum
      } else {
        toast.error(result.message || "Failed to add product");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '2rem', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
      <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '1.5rem' }}>Add New Product</h2>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        
        {/* Title */}
        <div>
          <label style={{ fontWeight: 'bold' }}>Product Title</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required style={inputStyle} placeholder="e.g. Minimalist Watch" />
        </div>

        {/* Description */}
        <div>
          <label style={{ fontWeight: 'bold' }}>Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required style={{...inputStyle, height: '80px'}} placeholder="Product details..."></textarea>
        </div>

        {/* Price & Category */}
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontWeight: 'bold' }}>Price (₹)</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} required style={inputStyle} placeholder="2500" />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ fontWeight: 'bold' }}>Category</label>
            <select name="category" value={formData.category} onChange={handleChange} style={inputStyle}>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Accessories">Accessories</option>
              <option value="Footwear">Footwear</option>
            </select>
          </div>
        </div>

        {/* Sizes & Gender */}
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontWeight: 'bold' }}>Sizes (Comma separated)</label>
            <input type="text" name="sizes" value={formData.sizes} onChange={handleChange} style={inputStyle} placeholder="S,M,L,XL" />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ fontWeight: 'bold' }}>Gender</label>
            <select name="gender" value={formData.gender} onChange={handleChange} style={inputStyle}>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Unisex">Unisex</option>
            </select>
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label style={{ fontWeight: 'bold' }}>Product Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} required style={inputStyle} />
          
          {/* Image Preview Area */}
          {imagePreview && (
            <div style={{ marginTop: '10px', textAlign: 'center' }}>
              <p style={{ fontSize: '0.8rem', color: '#666', margin: '5px 0' }}>Preview:</p>
              <img src={imagePreview} alt="Preview" style={{ height: '150px', objectFit: 'contain', border: '1px solid #ddd', padding: '5px', borderRadius: '4px' }} />
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button type="submit" disabled={loading} style={{ padding: '0.8rem', backgroundColor: loading ? '#9ca3af' : '#4F46E5', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '1rem', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer', marginTop: '1rem' }}>
          {loading ? 'Adding Product...' : 'Add Product'}
        </button>

      </form>
    </div>
  );
};

// Common input styles avoid panna
const inputStyle = {
  width: '100%', padding: '0.6rem', marginTop: '5px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box'
};

export default AddProduct;