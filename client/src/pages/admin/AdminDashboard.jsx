import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { 
  Chart as ChartJS, CategoryScale, LinearScale, BarElement, 
  Title, Tooltip, Legend, ArcElement 
} from 'chart.js';

// Chart.js components-ah register panrom
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const AdminDashboard = () => {
  const [stats, setStats] = useState({ users: 0, products: 0, orders: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Backend API-ah call panrom
        const response = await fetch('http://localhost:8000/api/admin/stats');
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (isLoading) return <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Loading Dashboard...</h2>;

  // 1. Bar Chart Data Setup
  const barChartData = {
    labels: ['Users', 'Products', 'Orders'],
    datasets: [
      {
        label: 'Total Count',
        data: [stats.users, stats.products, stats.orders],
        backgroundColor: ['#4F46E5', '#10B981', '#F59E0B'],
        borderRadius: 5,
      },
    ],
  };

  // 2. Pie Chart Data Setup
  const pieChartData = {
    labels: ['Users', 'Products', 'Orders'],
    datasets: [
      {
        data: [stats.users, stats.products, stats.orders],
        backgroundColor: ['#4F46E5', '#10B981', '#F59E0B'],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
      
      {/* Add Product Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
        <h2 style={{ color: '#333', margin: 0 }}>Admin Dashboard</h2>
        <Link to="/admin/add-product" style={{ padding: '8px 16px', backgroundColor: '#10B981', color: 'white', textDecoration: 'none', borderRadius: '4px', fontWeight: 'bold' }}>
          + Add New Product
        </Link>
      </div>

      {/* Number Cards */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '2rem', marginTop: '1.5rem' }}>
        <div style={{ flex: 1, padding: '20px', backgroundColor: '#EFF6FF', borderRadius: '8px', textAlign: 'center' }}>
          <h3>Total Users</h3>
          <h2 style={{ color: '#1D4ED8', fontSize: '2rem', margin: 0 }}>{stats.users}</h2>
        </div>
        <div style={{ flex: 1, padding: '20px', backgroundColor: '#ECFDF5', borderRadius: '8px', textAlign: 'center' }}>
          <h3>Total Products</h3>
          <h2 style={{ color: '#047857', fontSize: '2rem', margin: 0 }}>{stats.products}</h2>
        </div>
        <div style={{ flex: 1, padding: '20px', backgroundColor: '#FFFBEB', borderRadius: '8px', textAlign: 'center' }}>
          <h3>Total Orders</h3>
          <h2 style={{ color: '#B45309', fontSize: '2rem', margin: 0 }}>{stats.orders}</h2>
        </div>
      </div>

      {/* Charts Section */}
      <div style={{ display: 'flex', gap: '40px', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
        <div style={{ width: '500px', backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          <h4 style={{ textAlign: 'center', color: '#555' }}>Platform Overview (Bar)</h4>
          <Bar data={barChartData} />
        </div>

        <div style={{ width: '300px', backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          <h4 style={{ textAlign: 'center', color: '#555' }}>Distribution (Pie)</h4>
          <Pie data={pieChartData} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;