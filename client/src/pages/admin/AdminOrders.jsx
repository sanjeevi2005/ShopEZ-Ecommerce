import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch Orders from Backend
  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/admin/orders");
      const data = await response.json();
      const sortedOrders = [...data].sort((a, b) => 
        b._id.localeCompare(a._id)
      );
      setOrders(sortedOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // 2. Handle Status Change
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/admin/orders/${orderId}/status`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        },
      );

      if (response.ok) {
        toast.success("Order status updated successfully!");
        fetchOrders(); // UI-ah refresh panna thirumba fetch panrom
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      console.error("Status update error:", error);
      toast.error("Server error");
    }
  };

  if (loading)
    return (
      <h3 style={{ color: "#cbd5e1", textAlign: "center", marginTop: "50px" }}>
        Loading Orders...
      </h3>
    );

  return (
    <div
      style={{
        padding: "2rem",
        maxWidth: "1200px",
        margin: "0 auto",
        color: "#f8fafc",
      }}
    >
      <h2
        style={{
          borderBottom: "1px solid #334155",
          paddingBottom: "10px",
          marginBottom: "20px",
        }}
      >
        Manage Orders
      </h2>

      {orders.length === 0 ? (
        <div
          style={{
            backgroundColor: "#1e293b",
            padding: "20px",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          No orders found in the database.
        </div>
      ) : (
        <div
          style={{
            overflowX: "auto",
            backgroundColor: "#1e293b",
            borderRadius: "8px",
            padding: "1rem",
          }}
        >
          <table
            style={{
              width: "100%",
              textAlign: "left",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr
                style={{ borderBottom: "1px solid #334155", color: "#94a3b8" }}
              >
                <th style={{ padding: "12px" }}>Order ID</th>
                <th style={{ padding: "12px" }}>Date</th>
                <th style={{ padding: "12px" }}>Total Amount</th>
                <th style={{ padding: "12px" }}>Current Status</th>
                <th style={{ padding: "12px" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  style={{ borderBottom: "1px solid #334155" }}
                >
                  <td style={{ padding: "12px", fontSize: "0.9rem" }}>
                    {order._id}
                  </td>
                  {/* Date-ah readable format-la mathurom */}
                  <td style={{ padding: "12px" }}>
                    {order.orderDate
                      ? new Date(order.orderDate).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      fontWeight: "bold",
                      color: "#10b981",
                    }}
                  >
                    ₹{order.price || "N/A"}
                  </td>
                  <td style={{ padding: "12px" }}>
                    <span
                      style={{
                        padding: "4px 8px",
                        borderRadius: "4px",
                        fontSize: "0.85rem",
                        backgroundColor:
                          order.orderStatus === "Delivered"
                            ? "#065f46" // Green
                            : order.orderStatus === "Shipped"
                              ? "#1d4ed8" // Blue
                              : order.orderStatus === "Processing"
                                ? "#a16207" // Yellow
                                : order.orderStatus === "Cancelled"
                                  ? "#b91c1c" // Red
                                  : "#9a3412", // Default Orange (order placed)
                      }}
                    >
                      {order.orderStatus || "order placed"}
                    </span>
                  </td>
                  <td style={{ padding: "12px" }}>
                    {/* Status Update Dropdown */}
                    <select
                      value={order.orderStatus || "order placed"}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                      style={{
                        padding: "6px",
                        borderRadius: "4px",
                        backgroundColor: "#334155",
                        color: "#fff",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      <option value="order placed">Order Placed</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
