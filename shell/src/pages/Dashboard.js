import React, { useEffect } from 'react';

const Dashboard = () => {
  useEffect(() => {
    const token = localStorage.getItem('token'); // 🔑 Token le lo

    fetch('http://localhost:8000/api/me/screens', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, // ✅ Important
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Unauthorized');
        }
        return res.json();
      })
      .then((data) => {
        console.log("✅ Screens fetched:", data);
        // Yahan pe tum apna setState use kar sakte ho agar screen list UI pe dikhani ho
      })
      .catch((err) => {
        console.error("❌ Error:", err.message);
      });
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Screens will be shown in console.log() for now.</p>
    </div>
  );
};

export default Dashboard;
