import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Component load aagumbothu API-ah call panna useEffect use panrom
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/products");
        const data = await response.json();
        // API-la irunthu vandha data-va state-la set panrom
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "50px" }}>
        Loading Amazing Products...
      </h2>
    );
  }

  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("search")?.toLowerCase() || "";

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchQuery) ||
      product.category.toLowerCase().includes(searchQuery),
  );

  return (
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center", color: "#333", marginBottom: "2rem" }}>
        {searchQuery
          ? `Search Results for "${searchQuery}"`
          : "Our Latest Collection"}
      </h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
        }}
      >
        {/* Inga 'products.map'-ku bathila 'filteredProducts.map' use panrom */}
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <h3 style={{ color: "#666" }}>
            No products found matching your search.
          </h3>
        )}
      </div>
    </div>
  );
};

export default Home;
