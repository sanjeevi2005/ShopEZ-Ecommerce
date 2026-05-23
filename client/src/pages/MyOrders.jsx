import { useEffect, useState } from "react";
import { getUserOrders } from "../services/api";
import { toast } from "react-toastify";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

// Function to ensure date is consistently in DD/MM/YYYY format
const formatConsistentDate = (dateStr) => {
  if (!dateStr) return "N/A";
  const parts = dateStr.split('/');
  
  if (parts.length === 3) {
    // If the first part is greater than 12, we assume it's in MM/DD/YYYY format and rearrange it
    if (parseInt(parts[1]) > 12) {
      return `${parts[1]}/${parts[0]}/${parts[2]}`; // Rearrange to DD/MM/YYYY
    }
    // Assuming it's already in DD/MM/YYYY format
    return `${parts[0]}/${parts[1]}/${parts[2]}`;
  }
  return dateStr;
};

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [orderSearch, setOrderSearch] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

// PDF Invoice Generator 
  const generateInvoice = (order) => {
    const doc = new jsPDF();

    // 1. Header Section
    doc.setFontSize(22);
    doc.setTextColor(79, 70, 229); // Brand Color (Indigo)
    doc.text("ShopEZ", 14, 22);
    
    doc.setFontSize(16);
    doc.setTextColor(51, 51, 51);
    doc.text("INVOICE", 170, 22);

    // 2. Order Details
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Order ID: ${order._id}`, 14, 35);
    doc.text(`Date: ${formatConsistentDate(order.orderDate)}`, 14, 42);
    doc.text(`Status: ${order.orderStatus}`, 14, 49);

    // 3. Billing Details
    doc.setFontSize(12);
    doc.setTextColor(51, 51, 51);
    doc.text("Billed To:", 14, 65);
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Name: ${user?.username || 'Customer'}`, 14, 72);
    doc.text(`Address: ${order.address}`, 14, 79);
    doc.text(`Pincode: ${order.pincode}`, 14, 86);

    // 4. Product Table (Autotable)
    autoTable(doc, {
      startY: 100,
      head: [['Product Description', 'Quantity', 'Unit Price', 'Total']],
      body: [
        [
          order.title, 
          order.quantity, 
          `Rs. ${Number(order.price).toFixed(2)}`, 
          `Rs. ${(order.price * order.quantity).toFixed(2)}`
        ],
      ],
      headStyles: { fillColor: [79, 70, 229] }, 
      theme: 'grid',
    });

    // 5. Total Amount Calculation
    const finalY = doc.lastAutoTable.finalY || 120;
    doc.setFontSize(12);
    doc.setTextColor(51, 51, 51);
    doc.text(`Grand Total: Rs. ${(order.price * order.quantity).toFixed(2)}`, 14, finalY + 15);

    // 6. Footer
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.text("Thank you for shopping with ShopEZ!", 14, finalY + 35);

    // Save PDF file
    doc.save(`ShopEZ_Invoice_${order._id}.pdf`);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      const actualUserId = user?._id || user?.id;

      if (!actualUserId) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await getUserOrders(actualUserId);
        
        // Sort orders in descending order (newest first) using the MongoDB _id
        const sortedOrders = [...response.data].sort((a, b) => 
          b._id.localeCompare(a._id)
        );
        
        setOrders(sortedOrders);
      } catch (err) {
        toast.error("Failed to load your orders");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  // If data is still fetching, show the loading UI
  if (isLoading) {
    return (
      <div style={{ textAlign: "center", marginTop: "5rem", color: "#666" }}>
        <h2>Loading your orders...</h2>
        <p>Please wait a moment.</p>
      </div>
    );
  }

  // Filter orders dynamically based on the search input
  const filteredOrders = orders.filter(order => 
    order.title?.toLowerCase().includes(orderSearch.toLowerCase())
  );

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h2 style={{ color: "#333" }}>Your Order History</h2>

      {/* Render the Search Bar only if the user has placed at least one order */}
      {orders.length > 0 && (
        <input 
          type="text" 
          placeholder="Search your orders (e.g., Camera, Shoes)..." 
          value={orderSearch}
          onChange={(e) => setOrderSearch(e.target.value)}
          style={{
            width: "100%", 
            padding: "12px", 
            marginBottom: "20px", 
            borderRadius: "6px", 
            border: "1px solid #ccc", 
            outline: "none",
            boxSizing: "border-box"
          }}
        />
      )}

      {orders.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "3rem",
            backgroundColor: "#f9fafb",
            borderRadius: "8px",
            border: "1px dashed #ccc",
          }}
        >
          <p style={{ fontSize: "1.2rem", color: "#666" }}>
            You haven&apos;t placed any orders yet.
          </p>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div style={{ textAlign: "center", padding: "2rem", color: "#666" }}>
          {/* Show this message if the search term yields no results */}
          <h4>No orders match your search &quot{orderSearch}&quot.</h4>
        </div>
      ) : (
        <div style={{ marginTop: "1rem" }}>
          
          {/* Map through the filteredOrders array instead of the main orders array */}
          {filteredOrders.map((order) => (
            <div
              key={order._id}
              style={{
                border: "1px solid #ddd",
                padding: "1.5rem",
                marginBottom: "1rem",
                borderRadius: "8px",
                backgroundColor: "#fff",
                color: "#333",
                boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  borderBottom: "1px solid #eee",
                  paddingBottom: "10px",
                }}
              >
                <span style={{ fontWeight: "bold" }}>
                  Order Date: {formatConsistentDate(order.orderDate)}
                </span>
                <span
                  style={{
                    color: "#fff",
                    fontWeight: "bold",
                    textTransform: "capitalize",
                    backgroundColor: (order.orderStatus === 'Delivered') ? '#065f46' :    // Green
                     (order.orderStatus === 'Shipped') ? '#1d4ed8' :      // Blue
                     (order.orderStatus === 'Processing') ? '#a16207' :  // Yellow
                     (order.orderStatus === 'Cancelled') ? '#b91c1c' :   // Red
                     '#9a3412',                                         // Default Orange for 'order placed'
                    padding: "4px 10px",
                    borderRadius: "12px",
                    fontSize: "0.85rem",
                  }}
                >
                  {order.orderStatus}
                </span>
              </div>
              <div
                style={{ display: "flex", gap: "1.5rem", marginTop: "1rem" }}
              >
                <img
                  src={
                    order.mainImg || "https://placehold.co/90x90?text=No+Image"
                  }
                  alt={order.title}
                  style={{
                    width: "90px",
                    height: "90px",
                    objectFit: "contain",
                    border: "1px solid #eee",
                    borderRadius: "4px",
                    padding: "5px",
                  }}
                />
                <div>
                  <h4 style={{ margin: 0, fontSize: "1.1rem" }}>
                    {order.title}
                  </h4>
                  <p style={{ margin: "8px 0", color: "#4b5563" }}>
                    Price: <strong>₹{order.price}</strong> | Qty:{" "}
                    {order.quantity}
                  </p>
                  <p
                    style={{ fontSize: "0.85rem", color: "#6b7280", margin: 0 }}
                  >
                    Delivering to: {order.address}, {order.pincode}
                  </p>
                  {/* Download Invoice Button 💥 */}
                  <button
                    onClick={() => generateInvoice(order)}
                    style={{
                      marginTop: "12px",
                      padding: "8px 16px",
                      backgroundColor: "#4F46E5",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "0.85rem",
                      fontWeight: "bold",
                      display: "flex",
                      alignItems: "center",
                      gap: "5px"
                    }}
                  >
                    📄 Download Invoice
                  </button> 
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;