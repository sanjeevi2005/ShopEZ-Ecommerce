import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";

const Navbar = () => {
  const { cart, clearCart } = useCart(); // Bring in clearCart
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.usertype === "Admin";

  // Search state
  const [searchTerm, setSearchTerm] = useState("");

  // URL-la search query irundha athai input-la set panna
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchParam = params.get("search");
    if (searchParam) {
      setSearchTerm(searchParam);
    } else {
      setSearchTerm("");
    }
  }, [location.search]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    // User type pannumbothu URL-ah mathurom (e.g., /?search=nike)
    if (value.trim()) {
      navigate(`/?search=${value}`);
    } else {
      navigate("/");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user"); // 1. Clear user data
    clearCart(); // 2. Empty the cart
    toast.info("Logged out successfully"); // 3. Show professional notification
    navigate("/login"); // 4. Send to login
  };

  // ADMIN NAVBAR
  if (isAdmin) {
    return (
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem 2rem",
          backgroundColor: "#1e293b",
          color: "#fff",
        }}
      >
        <h2 style={{ margin: 0 }}>
          <Link
            to="/admin/dashboard"
            style={{ color: "#fff", textDecoration: "none" }}
          >
            ShopEZ (admin)
          </Link>
        </h2>
        <div
          style={{
            display: "flex",
            gap: "1.5rem",
            alignItems: "center",
            fontSize: "0.9rem",
          }}
        >
          <Link
            to="/admin/dashboard"
            style={{ color: "#cbd5e1", textDecoration: "none" }}
          >
            Home
          </Link>
          <Link
            to="/admin/orders"
            style={{ color: "#cbd5e1", textDecoration: "none" }}
          >
            Orders
          </Link>
          <button
            onClick={handleLogout}
            style={{
              background: "none",
              border: "none",
              color: "#f87171",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Logout
          </button>
        </div>
      </nav>
    );
  }

  // CUSTOMER NAVBAR
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 2rem",
        backgroundColor: "#4F46E5",
        color: "#fff",
      }}
    >
      <h2 style={{ margin: 0 }}>
        <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
          ShopEZ
        </Link>
      </h2>

      <div style={{ flex: 1, maxWidth: "500px", margin: "0 2rem" }}>
        <input
          type="text"
          placeholder="Search Electronics, Fashion, mobiles, etc.,"
          value={searchTerm}
          onChange={handleSearch}
          style={{
            width: "100%",
            padding: "0.6rem",
            borderRadius: "4px",
            border: "none",
            outline: "none",
          }}
        />
      </div>

      <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
        {user ? (
          <>
            <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              👤 {user.username}
            </span>
            <Link
              to="/orders"
              style={{ color: "#fff", textDecoration: "none" }}
            >
              My Orders
            </Link>
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "#fff",
                fontWeight: "500",
              }}
            >
              Home
            </Link>
            <Link
              to="/cart"
              style={{
                color: "#fff",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
              }}
            >
              🛒{" "}
              <span
                style={{
                  background: "#f59e0b",
                  padding: "2px 6px",
                  borderRadius: "50%",
                  fontSize: "0.8rem",
                  marginLeft: "5px",
                }}
              >
                {cart.length}
              </span>
            </Link>
            <button
              onClick={handleLogout}
              style={{
                padding: "0.4rem 1rem",
                backgroundColor: "transparent",
                border: "1px solid #fff",
                color: "#fff",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            style={{
              padding: "0.5rem 1.5rem",
              backgroundColor: "transparent",
              border: "1px solid #fff",
              color: "#fff",
              borderRadius: "4px",
              textDecoration: "none",
            }}
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
